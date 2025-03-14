import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);
const QUEUE_KEY = 'lead:enrichment:queue';
const BATCH_SIZE = 10;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { leadIds } = body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      throw new ApiError(400, 'Lead IDs are required');
    }

    // Verify leads belong to user
    const leads = await prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        userId: user.id,
      },
      select: {
        id: true,
        company: true,
        companyData: {
          select: {
            lastEnriched: true,
          },
        },
      },
    });

    if (leads.length !== leadIds.length) {
      throw new ApiError(400, 'Some leads were not found or don\'t belong to you');
    }

    // Filter out recently enriched leads (within last 24 hours)
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const leadsToEnrich = leads.filter(
      (lead) =>
        !lead.companyData?.lastEnriched || lead.companyData.lastEnriched < twentyFourHoursAgo,
    );

    if (leadsToEnrich.length === 0) {
      return successResponse({
        message: 'All leads were enriched recently',
        queued: 0,
        skipped: leads.length,
      });
    }

    // Add leads to enrichment queue
    const queueItems = leadsToEnrich.map((lead) => ({
      leadId: lead.id,
      company: lead.company,
      userId: user.id,
      priority: 1,
      attempts: 0,
      addedAt: now.toISOString(),
    }));

    // Use Redis transaction to add items to queue
    const multi = redis.multi();
    for (const item of queueItems) {
      multi.rpush(QUEUE_KEY, JSON.stringify(item));
    }
    await multi.exec();

    // Start processing if queue was empty
    const queueLength = await redis.llen(QUEUE_KEY);
    if (queueLength === queueItems.length) {
      // Queue was empty, trigger processing
      processQueue().catch(console.error);
    }

    return successResponse({
      message: 'Leads added to enrichment queue',
      queued: queueItems.length,
      skipped: leads.length - queueItems.length,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Get queue status
    const queueLength = await redis.llen(QUEUE_KEY);
    const queueItems = await redis.lrange(QUEUE_KEY, 0, -1);

    // Filter items for this user
    const userItems = queueItems
      .map((item) => JSON.parse(item))
      .filter((item) => item.userId === user.id);

    return successResponse({
      totalItems: queueLength,
      userItems: userItems.length,
      items: userItems,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

async function processQueue() {
  while (true) {
    // Get batch of items from queue
    const items = await redis.lrange(QUEUE_KEY, 0, BATCH_SIZE - 1);
    if (items.length === 0) {
      break; // Queue is empty
    }

    // Process items in parallel
    await Promise.all(
      items.map(async (item) => {
        const { leadId, company, userId } = JSON.parse(item);

        try {
          // TODO: Implement actual enrichment logic using external APIs
          const enrichedData = {
            name: company,
            website: `https://${company.toLowerCase().replace(/\s+/g, '')}.com`,
            industry: 'Technology',
            size: '50-200',
            location: 'San Francisco, CA',
            funding: {
              round: 'Series A',
              amount: '5000000',
              date: new Date().toISOString(),
            },
            lastFundingDate: new Date().toISOString(),
            hiringSignals: {
              jobPostings: Math.floor(Math.random() * 20),
              lastUpdated: new Date().toISOString(),
            },
            lastEnriched: new Date(),
          };

          // Update company data
          await prisma.company.upsert({
            where: { leadId },
            create: {
              ...enrichedData,
              leadId,
            },
            update: enrichedData,
          });

          // Create activity record
          await prisma.activity.create({
            data: {
              type: 'NOTE',
              leadId,
              userId,
              content: 'Company data enriched automatically',
              metadata: {
                enrichment: enrichedData,
              },
            },
          });

          // Remove item from queue
          await redis.lrem(QUEUE_KEY, 1, item);
        } catch (error) {
          console.error(`Error enriching lead ${leadId}:`, error);
          // Could implement retry logic here
        }
      }),
    );
  }
}

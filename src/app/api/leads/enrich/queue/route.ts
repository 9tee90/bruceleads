import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const { leadIds } = await request.json();

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json(
        { error: 'Lead IDs array is required' },
        { status: 400 },
      );
    }

    // Get leads that need enrichment
    const leads = await prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        userId: user.id,
      },
      include: {
        companyData: true,
      },
    });

    if (!leads.length) {
      return NextResponse.json(
        { error: 'No leads found' },
        { status: 404 },
      );
    }

    // Queue enrichment tasks
    const enrichmentTasks = leads.map(async (lead) => {
      if (lead.companyData) {
        return NextResponse.json(
          { error: `Lead ${lead.id} already has company data` },
          { status: 400 },
        );
      }

      // Mock enrichment process
      const enrichedData = {
        name: lead.company || 'Unknown Company',
        industry: 'Technology',
        size: '1-50',
        location: 'United States',
        website: `https://www.${(lead.company || 'unknown').toLowerCase().replace(/\s+/g, '')}.com`,
      };

      await prisma.company.create({
        data: {
          ...enrichedData,
          leadId: lead.id,
        },
      });

      return lead.id;
    });

    const results = await Promise.allSettled(enrichmentTasks);
    const successful = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map((result) => result.value);

    return NextResponse.json(
      {
        message: 'Enrichment tasks queued successfully',
        enriched: successful,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error enriching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Get leads pending enrichment
    const pendingLeads = await prisma.lead.findMany({
      where: {
        userId: user.id,
        companyData: null
      },
      select: {
        id: true,
        name: true,
        company: true
      }
    });

    return NextResponse.json({
      pendingCount: pendingLeads.length,
      leads: pendingLeads
    });
  } catch (error) {
    console.error('Error getting enrichment status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

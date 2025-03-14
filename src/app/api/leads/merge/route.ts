import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { sourceLeadId, targetLeadId, mergeStrategy } = body;

    if (!sourceLeadId || !targetLeadId) {
      throw new ApiError(400, 'Source and target lead IDs are required');
    }

    // Get both leads
    const [sourceLead, targetLead] = await Promise.all([
      prisma.lead.findFirst({
        where: {
          id: sourceLeadId,
          userId: user.id,
        },
        include: {
          companyData: true,
          activities: true,
        },
      }),
      prisma.lead.findFirst({
        where: {
          id: targetLeadId,
          userId: user.id,
        },
        include: {
          companyData: true,
          activities: true,
        },
      }),
    ]);

    if (!sourceLead || !targetLead) {
      throw new ApiError(404, 'One or both leads not found');
    }

    // Merge data based on strategy
    const mergedData = {
      // Always keep target lead's ID and creation date
      id: targetLead.id,
      createdAt: targetLead.createdAt,
      updatedAt: new Date(),
      userId: user.id,

      // Merge basic information
      name: mergeStrategy?.name === 'source' ? sourceLead.name : targetLead.name,
      company: mergeStrategy?.company === 'source' ? sourceLead.company : targetLead.company,
      title: mergeStrategy?.title === 'source' ? sourceLead.title : targetLead.title,
      email: mergeStrategy?.email === 'source' ? sourceLead.email : targetLead.email,
      phone: mergeStrategy?.phone === 'source' ? sourceLead.phone : targetLead.phone,
      linkedinUrl:
        mergeStrategy?.linkedinUrl === 'source' ? sourceLead.linkedinUrl : targetLead.linkedinUrl,

      // Merge arrays and objects
      tags: [...new Set([...targetLead.tags, ...sourceLead.tags])],
      notes: [targetLead.notes, sourceLead.notes].filter(Boolean).join('\n\n'),

      // Use the highest score
      score: Math.max(sourceLead.score, targetLead.score),

      // Use the most recent status unless specified
      status: mergeStrategy?.status === 'source' ? sourceLead.status : targetLead.status,

      // Use the most recent contact date
      lastContactedAt:
        sourceLead.lastContactedAt > targetLead.lastContactedAt
          ? sourceLead.lastContactedAt
          : targetLead.lastContactedAt,
    };

    // Start transaction
    const mergedLead = await prisma.$transaction(async (tx) => {
      // Update target lead with merged data
      const updated = await tx.lead.update({
        where: { id: targetLead.id },
        data: mergedData,
      });

      // Merge company data if exists
      if (sourceLead.companyData || targetLead.companyData) {
        const mergedCompanyData = {
          ...targetLead.companyData,
          ...sourceLead.companyData,
          leadId: targetLead.id,
        };

        await tx.company.upsert({
          where: { leadId: targetLead.id },
          create: mergedCompanyData,
          update: mergedCompanyData,
        });
      }

      // Move activities from source to target
      if (sourceLead.activities.length > 0) {
        await tx.activity.updateMany({
          where: { leadId: sourceLead.id },
          data: { leadId: targetLead.id },
        });
      }

      // Create merge activity record
      await tx.activity.create({
        data: {
          type: 'NOTE',
          leadId: targetLead.id,
          userId: user.id,
          content: `Merged with lead "${sourceLead.name}" (${sourceLead.id})`,
          metadata: {
            mergeSource: sourceLead.id,
            mergeStrategy,
          },
        },
      });

      // Delete source lead
      await tx.lead.delete({
        where: { id: sourceLead.id },
      });

      return updated;
    });

    return successResponse({
      message: 'Leads merged successfully',
      lead: mergedLead,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

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
    const { operation, leadIds, data } = body;

    if (!operation || !leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      throw new ApiError(400, 'Invalid request parameters');
    }

    // Verify all leads belong to the user
    const leads = await prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        userId: user.id,
      },
    });

    if (leads.length !== leadIds.length) {
      throw new ApiError(400, 'Some leads were not found or don\'t belong to you');
    }

    let result;

    switch (operation) {
      case 'update_status': {
        if (!data?.status) {
          throw new ApiError(400, 'Status is required for this operation');
        }

        result = await prisma.lead.updateMany({
          where: {
            id: {
              in: leadIds,
            },
          },
          data: {
            status: data.status,
          },
        });
        break;
      }

      case 'add_tags': {
        if (!data?.tags || !Array.isArray(data.tags)) {
          throw new ApiError(400, 'Tags array is required for this operation');
        }

        // Get current tags for each lead
        const leadsWithTags = await prisma.lead.findMany({
          where: {
            id: {
              in: leadIds,
            },
          },
          select: {
            id: true,
            tags: true,
          },
        });

        // Update each lead with new tags
        const updates = leadsWithTags.map((lead) =>
          prisma.lead.update({
            where: { id: lead.id },
            data: {
              tags: [...new Set([...lead.tags, ...data.tags])],
            },
          }),
        );

        await Promise.all(updates);
        result = { count: leadsWithTags.length };
        break;
      }

      case 'remove_tags': {
        if (!data?.tags || !Array.isArray(data.tags)) {
          throw new ApiError(400, 'Tags array is required for this operation');
        }

        // Get current tags for each lead
        const leadsWithTags = await prisma.lead.findMany({
          where: {
            id: {
              in: leadIds,
            },
          },
          select: {
            id: true,
            tags: true,
          },
        });

        // Update each lead by removing specified tags
        const updates = leadsWithTags.map((lead) =>
          prisma.lead.update({
            where: { id: lead.id },
            data: {
              tags: lead.tags.filter((tag) => !data.tags.includes(tag)),
            },
          }),
        );

        await Promise.all(updates);
        result = { count: leadsWithTags.length };
        break;
      }

      case 'delete': {
        result = await prisma.lead.deleteMany({
          where: {
            id: {
              in: leadIds,
            },
          },
        });
        break;
      }

      default:
        throw new ApiError(400, 'Invalid operation');
    }

    return successResponse({
      message: `Bulk operation "${operation}" completed successfully`,
      result,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

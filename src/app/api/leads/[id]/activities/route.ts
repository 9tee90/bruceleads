import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    const activities = await prisma.activity.findMany({
      where: {
        leadId: params.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse(activities);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    const body = await req.json();
    const { type, content, metadata } = body;

    const activity = await prisma.activity.create({
      data: {
        type,
        content,
        metadata,
        leadId: params.id,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Update lead's last contacted date if activity type is not a note
    if (type !== 'NOTE') {
      await prisma.lead.update({
        where: {
          id: params.id,
        },
        data: {
          lastContactedAt: new Date(),
        },
      });
    }

    return successResponse(activity, 201);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

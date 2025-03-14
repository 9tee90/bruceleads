import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    return successResponse(campaign);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    const body = await req.json();
    const { name, description, template, schedule, status } = body;

    const updatedCampaign = await prisma.campaign.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        template,
        schedule,
        status,
      },
    });

    return successResponse(updatedCampaign);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    await prisma.campaign.delete({
      where: {
        id: params.id,
      },
    });

    return successResponse({ message: 'Campaign deleted successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

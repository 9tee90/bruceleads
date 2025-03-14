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
      include: {
        companyData: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    return successResponse(lead);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { name, company, title, email, phone, linkedinUrl, status, tags, notes } = body;

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    const updatedLead = await prisma.lead.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        company,
        title,
        email,
        phone,
        linkedinUrl,
        status,
        tags,
        notes,
      },
      include: {
        companyData: true,
      },
    });

    return successResponse(updatedLead);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    await prisma.lead.delete({
      where: {
        id: params.id,
      },
    });

    return successResponse({ message: 'Lead deleted successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

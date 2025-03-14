import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Get team members
    const team = await prisma.user.findMany({
      where: {
        id: {
          not: user.id, // Exclude current user
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
      },
    });

    return successResponse(team);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Only admins can add team members
    if (user.role !== 'ADMIN') {
      throw new ApiError(403, 'Only admins can add team members');
    }

    const body = await req.json();
    const { email, name, role } = body;

    if (!email || !name || !role) {
      throw new ApiError(400, 'Email, name, and role are required');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    // Create team member
    const teamMember = await prisma.user.create({
      data: {
        email,
        name,
        role,
        subscription: {
          plan: 'free',
          status: 'trial',
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14-day trial
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
      },
    });

    return successResponse(teamMember, 201);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Only admins can update team members
    if (user.role !== 'ADMIN') {
      throw new ApiError(403, 'Only admins can update team members');
    }

    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      throw new ApiError(400, 'User ID and role are required');
    }

    // Check if user exists and belongs to the same company
    const teamMember = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!teamMember) {
      throw new ApiError(404, 'Team member not found');
    }

    // Update team member role
    const updatedMember = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
      },
    });

    return successResponse(updatedMember);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Only admins can remove team members
    if (user.role !== 'ADMIN') {
      throw new ApiError(403, 'Only admins can remove team members');
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      throw new ApiError(400, 'User ID is required');
    }

    // Check if user exists and belongs to the same company
    const teamMember = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!teamMember) {
      throw new ApiError(404, 'Team member not found');
    }

    // Delete team member
    await prisma.user.delete({
      where: { id: userId },
    });

    return successResponse({ message: 'Team member removed successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

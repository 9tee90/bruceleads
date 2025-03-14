import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { name, currentPassword, newPassword } = body;

    // Validate input
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }

    // If password change is requested
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        throw new ApiError(400, 'Both current and new passwords are required');
      }

      // Get user with password
      const userWithPassword = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          password: true,
        },
      });

      if (!userWithPassword?.password) {
        throw new ApiError(400, 'Password change not supported for OAuth users');
      }

      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, userWithPassword.password);

      if (!isValid) {
        throw new ApiError(400, 'Current password is incorrect');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user with new password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          password: hashedPassword,
        },
      });
    } else {
      // Update user without password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
        },
      });
    }

    // Get updated profile
    const updatedProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
      },
    });

    return successResponse(updatedProfile);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { password } = body;

    if (!password) {
      throw new ApiError(400, 'Password is required to delete account');
    }

    // Get user with password
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        password: true,
      },
    });

    if (!userWithPassword?.password) {
      throw new ApiError(400, 'Account deletion not supported for OAuth users');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, userWithPassword.password);

    if (!isValid) {
      throw new ApiError(400, 'Password is incorrect');
    }

    // Delete user account
    await prisma.user.delete({
      where: { id: user.id },
    });

    return successResponse({ message: 'Account deleted successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

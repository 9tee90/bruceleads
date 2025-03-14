import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const read = searchParams.get('read');

    const where = {
      userId: user.id,
      ...(read !== null && { read: read === 'true' }),
    };

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ]);

    return successResponse({
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { notificationIds, read } = body;

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      throw new ApiError(400, 'Notification IDs are required');
    }

    if (typeof read !== 'boolean') {
      throw new ApiError(400, 'Read status is required');
    }

    // Update notifications
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
        userId: user.id,
      },
      data: {
        read,
      },
    });

    return successResponse({ message: 'Notifications updated successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const { notificationIds } = body;

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      throw new ApiError(400, 'Notification IDs are required');
    }

    // Delete notifications
    await prisma.notification.deleteMany({
      where: {
        id: {
          in: notificationIds,
        },
        userId: user.id,
      },
    });

    return successResponse({ message: 'Notifications deleted successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Only admins can create notifications
    if (user.role !== 'ADMIN') {
      throw new ApiError(403, 'Only admins can create notifications');
    }

    const body = await req.json();
    const { userIds, title, message, type, data } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !title || !message) {
      throw new ApiError(400, 'User IDs, title, and message are required');
    }

    // Create notifications for each user
    const notifications = await Promise.all(
      userIds.map((userId) =>
        prisma.notification.create({
          data: {
            userId,
            title,
            message,
            type,
            data,
          },
        }),
      ),
    );

    return successResponse(notifications, 201);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

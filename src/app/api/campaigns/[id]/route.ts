import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        lead: true,
      },
    });

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    return successResponse(task);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    const body = await req.json();
    const { title, dueDate, completed, leadId } = body;

    const updatedTask = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        dueDate,
        completed,
        leadId,
      },
      include: {
        lead: true,
      },
    });

    return successResponse(updatedTask);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    await prisma.task.delete({
      where: {
        id: params.id,
      },
    });

    return successResponse({ message: 'Task deleted successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

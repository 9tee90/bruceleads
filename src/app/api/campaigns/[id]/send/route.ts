import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Create an activity to record the task completion
    await prisma.activity.create({
      data: {
        type: 'NOTE',
        content: `Task "${task.title}" marked as complete`,
        leadId: task.leadId,
        userId: user.id,
      },
    });

    // Update task status
    const updatedTask = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: {
        completed: true,
      },
      include: {
        lead: true,
      },
    });

    return successResponse({
      message: 'Task completed successfully',
      task: updatedTask,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

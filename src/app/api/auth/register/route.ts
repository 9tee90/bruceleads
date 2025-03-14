import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, ApiError } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    if (!email || !password || !name) {
      throw new ApiError(400, 'Missing required fields');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
        settings: {
          notifications: {
            email: true,
            browser: true,
            slack: false,
          },
          preferences: {
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            theme: 'light',
          },
          integrations: {
            calendar: false,
            crm: false,
            email: false,
          },
          automation: {
            leadScoring: true,
            emailCampaigns: true,
            followUps: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        settings: true,
      },
    });

    return successResponse(user, 201);
  } catch (error) {
    return errorResponse(error as Error);
  }
} 
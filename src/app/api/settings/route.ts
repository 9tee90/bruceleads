import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

const MOCK_SETTINGS = {
  notifications: {
    email: true,
    push: false,
    slack: true,
  },
  preferences: {
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
  },
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return NextResponse.json(MOCK_SETTINGS);
}

export async function PUT() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return NextResponse.json(MOCK_SETTINGS);
}

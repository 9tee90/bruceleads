import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

const MOCK_TRIGGERS = [
  {
    id: '1',
    name: 'New Lead Follow-up',
    description: 'Automatically follow up with new leads',
    type: 'EMAIL',
    status: 'ACTIVE',
    conditions: {
      leadStatus: 'NEW',
      minScore: 70,
    },
    actions: {
      type: 'SEND_EMAIL',
      template: 'welcome',
    },
  },
  {
    id: '2',
    name: 'High Value Lead Alert',
    description: 'Alert team about high-value leads',
    type: 'NOTIFICATION',
    status: 'ACTIVE',
    conditions: {
      leadScore: 90,
      companySize: '>100',
    },
    actions: {
      type: 'SLACK_NOTIFICATION',
      channel: 'sales-team',
    },
  },
];

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return NextResponse.json(MOCK_TRIGGERS);
} 
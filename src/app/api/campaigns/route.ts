import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

const MOCK_CAMPAIGNS = [
  {
    id: '1',
    name: 'Welcome Campaign',
    description: 'Initial outreach to new leads',
    status: 'ACTIVE',
    type: 'EMAIL',
    metrics: {
      sent: 150,
      opened: 89,
      clicked: 45,
      replied: 23,
    },
  },
  {
    id: '2',
    name: 'Follow-up Campaign',
    description: 'Follow up with qualified leads',
    status: 'DRAFT',
    type: 'EMAIL',
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
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

  return NextResponse.json(MOCK_CAMPAIGNS);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { name, description, type } = body;

    const newCampaign = {
      id: String(MOCK_CAMPAIGNS.length + 1),
      name,
      description,
      status: 'DRAFT',
      type: type || 'EMAIL',
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
      },
    };

    MOCK_CAMPAIGNS.push(newCampaign);

    return NextResponse.json(newCampaign);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 },
    );
  }
}

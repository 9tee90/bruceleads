import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const mockCampaigns = [
  {
    id: '1',
    name: 'Enterprise Tech Decision Makers',
    description: 'Multi-channel outreach to CTOs and VPs of Engineering',
    status: 'active',
    type: 'multi',
    stats: {
      sent: 150,
      opened: 89,
      replied: 34,
      meetings: 12,
    },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Series B Founders',
    description: 'Personalized outreach to founders who recently raised Series B',
    status: 'active',
    type: 'linkedin',
    stats: {
      sent: 75,
      opened: 45,
      replied: 18,
      meetings: 8,
    },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cloud Migration Leaders',
    description: 'Target companies showing cloud adoption signals',
    status: 'paused',
    type: 'email',
    stats: {
      sent: 200,
      opened: 120,
      replied: 40,
      meetings: 15,
    },
    lastUpdated: new Date().toISOString(),
  },
];

const mockTemplates = [
  {
    id: '1',
    name: 'High Intent Trigger',
    type: 'email',
    subject: 'Re: {{company}} + Our Platform',
    content: 'Hi {{firstName}},\n\nI noticed {{company}} recently {{triggerEvent}}. Many companies at this stage are looking to...',
    variables: ['firstName', 'company', 'triggerEvent'],
    stats: {
      usage: 145,
      responseRate: 42,
    },
  },
  {
    id: '2',
    name: 'LinkedIn Connection',
    type: 'linkedin',
    content: "Hi {{firstName}}, I came across your profile and was impressed by your work at {{company}}. I'd love to connect and share how we're helping similar companies...",
    variables: ['firstName', 'company'],
    stats: {
      usage: 89,
      responseRate: 38,
    },
  },
  {
    id: '3',
    name: 'Discovery Call Script',
    type: 'call',
    content: '1. Intro: Hi {{firstName}}, thanks for taking the time today...\n2. Context: I understand {{company}} is currently...\n3. Pain Points: What challenges are you facing with...',
    variables: ['firstName', 'company'],
    stats: {
      usage: 65,
      responseRate: 55,
    },
  },
];

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  // Return data based on the requested type
  switch (type) {
    case 'campaigns':
      return NextResponse.json(mockCampaigns);
    case 'templates':
      return NextResponse.json(mockTemplates);
    default:
      return NextResponse.json({
        campaigns: mockCampaigns,
        templates: mockTemplates,
      });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type, id, status } = body;

    // For demo purposes, just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update outreach item' }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type } = body;

    // For demo purposes, just return success with a mock ID
    return NextResponse.json({
      success: true,
      id: Math.random().toString(36).substring(7),
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create outreach item' }),
      { status: 500 }
    );
  }
}

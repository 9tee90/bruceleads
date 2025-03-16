import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const mockTriggers = [
  {
    id: '1',
    company: 'TechCorp',
    type: 'Funding Round',
    source: 'Crunchbase',
    description: 'Series B funding round of $50M',
    score: 85,
    timestamp: new Date().toISOString(),
    signals: [
      { type: 'funding_amount', value: '$50M', score: 40 },
      { type: 'company_size', value: '100-500', score: 25 },
      { type: 'growth_rate', value: '150%', score: 20 }
    ],
    status: 'new'
  },
  {
    id: '2',
    company: 'DataFlow Inc',
    type: 'Technology Stack',
    source: 'BuiltWith',
    description: 'Added Kubernetes to tech stack',
    score: 75,
    timestamp: new Date().toISOString(),
    signals: [
      { type: 'tech_adoption', value: 'Kubernetes', score: 35 },
      { type: 'tech_stack_fit', value: 'High', score: 25 },
      { type: 'company_intent', value: 'Strong', score: 15 }
    ],
    status: 'new'
  },
  {
    id: '3',
    company: 'CloudScale',
    type: 'Leadership Change',
    source: 'LinkedIn',
    description: 'New CTO appointed',
    score: 90,
    timestamp: new Date().toISOString(),
    signals: [
      { type: 'role_seniority', value: 'C-Level', score: 40 },
      { type: 'department_match', value: 'Technology', score: 30 },
      { type: 'timing', value: 'Optimal', score: 20 }
    ],
    status: 'new'
  }
];

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  // For demo purposes, return mock data
  return NextResponse.json(mockTriggers);
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
    const { id, status } = body;

    // For demo purposes, just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update trigger event' }),
      { status: 500 }
    );
  }
} 
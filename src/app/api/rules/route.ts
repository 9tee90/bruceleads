import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface TriggerRule {
  id: string;
  name: string;
  description: string;
  type: 'funding' | 'tech_stack' | 'leadership' | 'growth' | 'custom';
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  score: number;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

interface ScoringWeight {
  id: string;
  category: string;
  description: string;
  weight: number;
  factors: {
    name: string;
    weight: number;
  }[];
}

interface RulesData {
  rules: TriggerRule[];
  weights: ScoringWeight[];
}

const mockRulesData: RulesData = {
  rules: [
    {
      id: '1',
      name: 'Series B Funding',
      description: 'Trigger when a company raises Series B funding',
      type: 'funding',
      conditions: [
        { field: 'funding_round', operator: 'equals', value: 'Series B' },
        { field: 'amount', operator: 'greater_than', value: '10000000' },
      ],
      score: 85,
      status: 'active',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Tech Stack Change',
      description: 'Monitor for significant technology adoption',
      type: 'tech_stack',
      conditions: [
        { field: 'technology', operator: 'includes', value: 'kubernetes,docker,aws' },
        { field: 'adoption_stage', operator: 'equals', value: 'new' },
      ],
      score: 75,
      status: 'active',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Leadership Change',
      description: 'Track C-level and VP appointments',
      type: 'leadership',
      conditions: [
        { field: 'position', operator: 'matches', value: '^(CTO|VP.*Engineering)$' },
        { field: 'timing', operator: 'within', value: '30d' },
      ],
      score: 90,
      status: 'active',
      lastUpdated: new Date().toISOString(),
    },
  ],
  weights: [
    {
      id: '1',
      category: 'Company Profile',
      description: 'Basic company information and demographics',
      weight: 30,
      factors: [
        { name: 'Company Size', weight: 10 },
        { name: 'Industry', weight: 10 },
        { name: 'Location', weight: 5 },
        { name: 'Growth Rate', weight: 5 },
      ],
    },
    {
      id: '2',
      category: 'Technology Stack',
      description: 'Current technology usage and recent changes',
      weight: 25,
      factors: [
        { name: 'Current Stack', weight: 10 },
        { name: 'Recent Adoptions', weight: 10 },
        { name: 'Tech Budget', weight: 5 },
      ],
    },
    {
      id: '3',
      category: 'Engagement Signals',
      description: 'Interaction and intent indicators',
      weight: 45,
      factors: [
        { name: 'Website Visits', weight: 15 },
        { name: 'Content Downloads', weight: 15 },
        { name: 'Email Opens', weight: 10 },
        { name: 'Social Engagement', weight: 5 },
      ],
    },
  ],
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // For demo users, return mock data
  if (session.user?.email === 'demo@bruceleads.com') {
    return NextResponse.json(mockRulesData);
  }

  // TODO: Implement actual rules and weights fetching for real users
  // For now, return mock data for all users
  return NextResponse.json(mockRulesData);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const updates = await request.json();
    const { type, data } = updates;

    // For demo users, just echo back the changes
    if (session.user?.email === 'demo@bruceleads.com') {
      return NextResponse.json({
        message: 'Changes saved (demo mode)',
        data: updates,
      });
    }

    // TODO: Implement actual rules and weights updating for real users
    // For now, just echo back the changes
    return NextResponse.json({
      message: 'Changes saved',
      data: updates,
    });
  } catch (error) {
    console.error('Error updating rules/weights:', error);
    return NextResponse.json(
      { error: 'Failed to update rules/weights' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const newItem = await request.json();
    const { type, data } = newItem;

    // For demo users, return a mock response with an ID
    if (session.user?.email === 'demo@bruceleads.com') {
      return NextResponse.json({
        message: 'Item created (demo mode)',
        data: {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          lastUpdated: new Date().toISOString(),
        },
      });
    }

    // TODO: Implement actual rule/weight creation for real users
    // For now, return a mock response
    return NextResponse.json({
      message: 'Item created',
      data: {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error creating rule/weight:', error);
    return NextResponse.json(
      { error: 'Failed to create rule/weight' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json(
        { error: 'Missing id or type parameter' },
        { status: 400 }
      );
    }

    // For demo users, return a success response
    if (session.user?.email === 'demo@bruceleads.com') {
      return NextResponse.json({
        message: 'Item deleted (demo mode)',
        id,
        type,
      });
    }

    // TODO: Implement actual rule/weight deletion for real users
    // For now, return a success response
    return NextResponse.json({
      message: 'Item deleted',
      id,
      type,
    });
  } catch (error) {
    console.error('Error deleting rule/weight:', error);
    return NextResponse.json(
      { error: 'Failed to delete rule/weight' },
      { status: 500 }
    );
  }
} 
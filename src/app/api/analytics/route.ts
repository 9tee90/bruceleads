import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const mockAnalytics = {
  leads: {
    byStatus: {
      NEW: 45,
      CONTACTED: 32,
      QUALIFIED: 18,
      UNQUALIFIED: 8,
      CUSTOMER: 12
    },
    bySource: {
      'LinkedIn': 38,
      'Website': 25,
      'Referral': 22,
      'Cold Outreach': 18,
      'Event': 12
    },
    byIndustry: {
      'Technology': 42,
      'Finance': 28,
      'Healthcare': 24,
      'Manufacturing': 15,
      'Retail': 6
    }
  },
  activities: {
    byType: {
      'Email': 156,
      'Call': 89,
      'Meeting': 34,
      'Note': 67
    },
    byDay: {
      'Mon': 45,
      'Tue': 52,
      'Wed': 58,
      'Thu': 62,
      'Fri': 48,
      'Sat': 15,
      'Sun': 8
    }
  },
  conversion: {
    rate: 28.5,
    stages: [
      { name: 'Lead', count: 115 },
      { name: 'Contacted', count: 85 },
      { name: 'Meeting', count: 45 },
      { name: 'Proposal', count: 28 },
      { name: 'Customer', count: 12 }
    ]
  }
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Return mock data for demo users
  if (session.user.email === 'demo@bruceleads.com') {
    return NextResponse.json({ data: mockAnalytics });
  }

  // For real users, implement actual analytics fetching here
  return NextResponse.json({ data: mockAnalytics }); // Temporarily return mock data for all users
}

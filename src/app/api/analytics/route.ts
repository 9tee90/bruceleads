import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse } from '@/lib/api';
import { prisma } from '@/lib/prisma';

const mockAnalytics = {
  leads: {
    byStatus: {
      NEW: 45,
      CONTACTED: 32,
      QUALIFIED: 28,
      UNQUALIFIED: 15,
      CUSTOMER: 12
    },
    bySource: {
      'AI Trigger': 65,
      'LinkedIn': 35,
      'Manual': 20,
      'Website': 12
    },
    byIndustry: {
      'Software': 42,
      'Data Analytics': 28,
      'Cloud Computing': 25,
      'Fintech': 20,
      'E-commerce': 17
    }
  },
  activities: {
    byType: {
      'Email': 156,
      'Call': 89,
      'Meeting': 45,
      'LinkedIn': 78
    },
    byDay: {
      'Mon': 45,
      'Tue': 52,
      'Wed': 48,
      'Thu': 56,
      'Fri': 42
    }
  },
  conversion: {
    rate: 18.5,
    stages: [
      { name: 'New Leads', count: 132 },
      { name: 'Contacted', count: 98 },
      { name: 'Meeting Set', count: 45 },
      { name: 'Qualified', count: 28 },
      { name: 'Closed', count: 12 }
    ]
  }
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Return mock data for demo users
    if (session?.user?.email === 'demo@bruceleads.com') {
      return successResponse(mockAnalytics);
    }

    // For real users, we would fetch from the database
    // This is just a placeholder for now
    return successResponse(mockAnalytics);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

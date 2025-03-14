import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse } from '@/lib/api';

const mockSettings = {
  notifications: {
    emailAlerts: true,
    leadNotifications: true,
    weeklyDigest: false,
    triggerAlerts: true
  },
  preferences: {
    minCompanySize: '51-200',
    targetIndustries: ['Software', 'Data Analytics', 'Cloud Computing'],
    minLeadScore: 75,
    autoEnrichment: true
  }
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Return mock data for demo users
    if (session?.user?.email === 'demo@bruceleads.com') {
      return successResponse(mockSettings);
    }

    // For real users, we would fetch from the database
    // This is just a placeholder for now
    return successResponse(mockSettings);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await req.json();

    // For demo users, just return success
    if (session?.user?.email === 'demo@bruceleads.com') {
      return successResponse({ ...mockSettings, ...body });
    }

    // For real users, we would update the database
    // This is just a placeholder for now
    return successResponse({ ...mockSettings, ...body });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

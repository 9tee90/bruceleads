import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { validateRequest } from '@/lib/api';

// Calculate engagement score based on activities
function calculateEngagementScore(activities: any[]): number {
  const activityWeights = {
    EMAIL: 2,
    CALL: 3,
    MEETING: 4,
    NOTE: 1,
  };

  return activities.reduce((score, activity) => {
    const weight = activityWeights[activity.type as keyof typeof activityWeights] || 1;
    return score + weight;
  }, 0);
}

// Calculate qualification score based on lead data
function calculateQualificationScore(lead: any): number {
  let score = 50; // Base score

  // Company data factors
  if (lead.companyData) {
    if (lead.companyData.size === '51-200') score += 10;
    if (lead.companyData.industry === 'Technology') score += 10;
  }

  // Activity factors
  if (lead.activities.length > 5) score += 15;
  if (lead.activities.length > 10) score += 15;

  return Math.min(score, 100);
}

// Generate next steps based on lead analysis
function generateNextSteps(lead: any): string[] {
  const steps = [];

  if (lead.activities.length === 0) {
    steps.push('Initial outreach needed');
  }

  if (lead.activities.length > 0 && !lead.activities.some((a: any) => a.type === 'MEETING')) {
    steps.push('Schedule first meeting');
  }

  if (!lead.companyData?.website) {
    steps.push('Research company website');
  }

  return steps.length > 0 ? steps : ['Review lead details and plan next action'];
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        userId: user.id,
      },
      include: {
        activities: true,
        companyData: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 },
      );
    }

    // Analyze lead data
    const analysis = {
      engagement: calculateEngagementScore(lead.activities),
      qualification: calculateQualificationScore(lead),
      nextSteps: generateNextSteps(lead),
    };

    // Update lead score
    await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: {
        score: analysis.qualification,
      },
    });

    return NextResponse.json(
      { analysis },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

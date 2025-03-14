import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        activities: true,
        companyData: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      );
    }

    let score = 0;

    // Company size factor
    if (lead.companyData?.size) {
      const sizeMap: { [key: string]: number } = {
        'Enterprise': 25,
        'Large': 20,
        'Medium': 15,
        'Small': 10,
      };
      score += sizeMap[lead.companyData.size] || 0;
    }

    // Funding signals
    if (lead.companyData?.funding) {
      const funding = lead.companyData.funding as any;
      if (funding.amount > 10000000) {
        score += 20;
      } else if (funding.amount > 5000000) {
        score += 15;
      } else if (funding.amount > 1000000) {
        score += 10;
      }
    }

    // Activity factors
    const activityCount = lead.activities.length;
    if (activityCount > 5) {
      score += 15;
    } else if (activityCount > 2) {
      score += 10;
    }

    // Recency of last contact
    if (lead.activities.length > 0) {
      const lastActivity = lead.activities[lead.activities.length - 1];
      const daysSinceLastContact = Math.floor(
        (Date.now() - new Date(lastActivity.createdAt).getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysSinceLastContact < 7) {
        score += 10;
      } else if (daysSinceLastContact < 30) {
        score += 5;
      }
    }

    let scoreLabel = '';

    if (score >= 90) {
      scoreLabel = 'Very High';
    } else if (score >= 70) {
      scoreLabel = 'High';
    } else if (score >= 50) {
      scoreLabel = 'Medium';
    } else if (score >= 30) {
      scoreLabel = 'Low';
    } else {
      scoreLabel = 'Very Low';
    }

    return NextResponse.json({ score: scoreLabel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate lead score' },
      { status: 500 },
    );
  }
}

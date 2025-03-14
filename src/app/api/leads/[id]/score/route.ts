import { getServerSession } from 'next-auth';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, errorResponse, ApiError } from '@/lib/api';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        companyData: true,
        activities: true,
      },
    });

    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    // Calculate lead score based on various factors
    let score = 0;

    // Company factors
    if (lead.companyData) {
      // Funding round impact
      if (lead.companyData.funding) {
        const funding = lead.companyData.funding as any;
        const fundingAmount = parseInt(funding.amount.replace(/[^0-9]/g, ''));
        if (fundingAmount > 10000000) {
          score += 30;  // >$10M
        } else if (fundingAmount > 5000000) {
          score += 20;  // >$5M
        } else if (fundingAmount > 1000000) {
          score += 10;  // >$1M
        }
      }

      // Hiring signals
      const hiringSignals = lead.companyData.hiringSignals as any;
      if (hiringSignals.jobPostings > 20) {
score += 20;
} else if (hiringSignals.jobPostings > 10) {
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
    if (lead.lastContactedAt) {
      const daysSinceLastContact = Math.floor(
        (new Date().getTime() - new Date(lead.lastContactedAt).getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysSinceLastContact < 7) {
score += 10;
} else if (daysSinceLastContact < 30) {
score += 5;
}
    }

    // Status impact
    switch (lead.status) {
      case 'CONVERTED':
        score += 40;
        break;
      case 'QUALIFIED':
        score += 30;
        break;
      case 'CONTACTED':
        score += 20;
        break;
      case 'NEW':
        score += 10;
        break;
    }

    // Cap the score at 100
    score = Math.min(score, 100);

    // Generate AI recommendations
    const recommendations = [];

    if (score < 30) {
      recommendations.push({
        type: 'engagement',
        message: 'Consider reaching out to establish initial contact',
        priority: 'high',
      });
    }

    if (
      !lead.lastContactedAt ||
      new Date().getTime() - new Date(lead.lastContactedAt).getTime() > 30 * 24 * 60 * 60 * 1000
    ) {
      recommendations.push({
        type: 'follow_up',
        message: 'Schedule a follow-up to maintain engagement',
        priority: 'medium',
      });
    }

    if (
      lead.companyData?.hiringSignals &&
      (lead.companyData.hiringSignals as any).jobPostings > 10
    ) {
      recommendations.push({
        type: 'opportunity',
        message: 'Company is actively hiring - consider highlighting relevant solutions',
        priority: 'high',
      });
    }

    // Update lead score
    await prisma.lead.update({
      where: {
        id: params.id,
      },
      data: {
        score,
      },
    });

    if (score > 80) {
      return 'Very High';
    } else if (score > 60) {
      return 'High';
    } else if (score > 40) {
      return 'Medium';
    } else if (score > 20) {
      return 'Low';
    } else {
      return 'Very Low';
    }
  } catch (error) {
    return errorResponse(error as Error);
  }
}

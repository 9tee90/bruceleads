import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse } from '@/lib/api';

const mockTriggers = [
  {
    id: '1',
    company: 'TechGrowth Inc',
    type: 'HIRING',
    title: 'Engineering Team Expansion',
    description: 'Posted 12 new engineering roles in the last 30 days',
    impact: 'HIGH',
    confidence: 92,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    signals: [
      'Multiple senior engineering positions posted',
      'LinkedIn job listings increased by 200%',
      'Recent series B funding of $40M'
    ],
    recommendedActions: [
      {
        type: 'EMAIL',
        template: "Congratulations on your recent funding and team expansion! I noticed you're scaling your engineering team - would you be interested in learning how other high-growth companies are using Bruce to streamline their sales operations?",
        subject: 'Re: Your Engineering Team Growth',
        priority: 'HIGH'
      },
      {
        type: 'LINKEDIN',
        message: "Hi Sarah, saw TechGrowth is rapidly expanding the engineering team. Would love to share how we're helping similar companies scale their sales operations efficiently.",
        priority: 'MEDIUM'
      }
    ]
  },
  {
    id: '2',
    company: 'DataFlow Systems',
    type: 'TECH_STACK',
    title: 'Infrastructure Migration',
    description: 'Moving from on-prem to cloud infrastructure',
    impact: 'HIGH',
    confidence: 88,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    signals: [
      'Cloud engineering job postings',
      'AWS partnership announcement',
      'Legacy system deprecation posts'
    ],
    recommendedActions: [
      {
        type: 'EMAIL',
        template: "Hi Michael, I noticed DataFlow is making the move to cloud infrastructure. Would you be interested in seeing how we're helping companies optimize their sales processes during cloud migrations?",
        subject: 'Supporting Your Cloud Migration',
        priority: 'HIGH'
      }
    ]
  },
  {
    id: '3',
    company: 'CloudScale Solutions',
    type: 'EXPANSION',
    title: 'Market Expansion',
    description: 'Opening new offices in EMEA region',
    impact: 'MEDIUM',
    confidence: 85,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    signals: [
      'New office location announcements',
      'EMEA leadership hiring',
      'European market research'
    ],
    recommendedActions: [
      {
        type: 'EMAIL',
        template: "Congratulations on your expansion into EMEA! As you scale your operations globally, I'd love to show you how Bruce can help maintain consistent sales processes across regions.",
        subject: 'Supporting Your Global Expansion',
        priority: 'MEDIUM'
      }
    ]
  }
];

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Return mock data for demo users
    if (session?.user?.email === 'demo@bruceleads.com') {
      return successResponse(mockTriggers);
    }

    // For real users, we would fetch from the database
    // This is just a placeholder for now
    return successResponse(mockTriggers);
  } catch (error) {
    return errorResponse(error as Error);
  }
} 
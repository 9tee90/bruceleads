import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse } from '@/lib/api';
import { Prisma, LeadStatus } from '@prisma/client';

// Mock data for demo users
const mockLeads = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechGrowth Inc",
    title: "VP of Engineering",
    email: "sarah.chen@techgrowth.com",
    phone: "+1 (555) 123-4567",
    status: "QUALIFIED",
    source: "AI Trigger",
    score: 85,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    companyData: {
      industry: "Software",
      size: "50-200",
      location: "San Francisco, CA",
    },
    triggerEvents: [
      {
        type: "HIRING",
        title: "Engineering Team Expansion",
        description: "Posted 12 new engineering roles in the last 30 days",
        impact: "HIGH",
        confidence: 92,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        signals: [
          "Multiple senior engineering positions posted",
          "LinkedIn job listings increased by 200%",
          "Recent series B funding of $40M"
        ]
      }
    ],
    recommendedActions: [
      {
        type: "EMAIL",
        template: "Congratulations on your recent funding and team expansion! I noticed you're scaling your engineering team - would you be interested in learning how other high-growth companies are using Bruce to streamline their sales operations?",
        subject: "Re: Your Engineering Team Growth",
        priority: "HIGH"
      },
      {
        type: "LINKEDIN",
        message: "Hi Sarah, saw TechGrowth is rapidly expanding the engineering team. Would love to share how we're helping similar companies scale their sales operations efficiently.",
        priority: "MEDIUM"
      }
    ]
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    company: "DataFlow Systems",
    title: "CTO",
    email: "mrodriguez@dataflow.io",
    phone: "+1 (555) 234-5678",
    status: "NEW",
    source: "LinkedIn",
    score: 92,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastContactedAt: null,
    companyData: {
      industry: "Data Analytics",
      size: "201-500",
      location: "Austin, TX",
    },
    triggerEvents: [
      {
        type: "TECH_STACK",
        title: "Infrastructure Migration",
        description: "Moving from on-prem to cloud infrastructure",
        impact: "HIGH",
        confidence: 88,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        signals: [
          "Cloud engineering job postings",
          "AWS partnership announcement",
          "Legacy system deprecation posts"
        ]
      }
    ],
    recommendedActions: [
      {
        type: "EMAIL",
        template: "Hi Michael, I noticed DataFlow is making the move to cloud infrastructure. Would you be interested in seeing how we're helping companies optimize their sales processes during cloud migrations?",
        subject: "Supporting Your Cloud Migration",
        priority: "HIGH"
      }
    ]
  },
  {
    id: "3",
    name: "Emily Watson",
    company: "CloudScale Solutions",
    title: "Head of Operations",
    email: "e.watson@cloudscale.com",
    phone: "+1 (555) 345-6789",
    status: "CONTACTED",
    source: "AI Trigger",
    score: 78,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    companyData: {
      industry: "Cloud Computing",
      size: "501-1000",
      location: "Seattle, WA",
    },
    triggerEvents: [
      {
        type: "EXPANSION",
        title: "Market Expansion",
        description: "Opening new offices in EMEA region",
        impact: "MEDIUM",
        confidence: 85,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        signals: [
          "New office location announcements",
          "EMEA leadership hiring",
          "European market research"
        ]
      }
    ],
    recommendedActions: [
      {
        type: "EMAIL",
        template: "Congratulations on your expansion into EMEA! As you scale your operations globally, I'd love to show you how Bruce can help maintain consistent sales processes across regions.",
        subject: "Supporting Your Global Expansion",
        priority: "MEDIUM"
      }
    ]
  }
];

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Check if this is a demo user
    const isDemoUser = session?.user?.email === "demo@bruceleads.com";

    if (isDemoUser) {
      return successResponse({
        leads: mockLeads,
        pagination: {
          total: mockLeads.length,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") as LeadStatus | null;
    const source = searchParams.get("source");
    const search = searchParams.get("search");

    const where: Prisma.LeadWhereInput = {
      userId: user.id,
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { company: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          companyData: true,
          activities: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return successResponse({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    // Return mock response for demo users
    if (session?.user?.email === "demo@bruceleads.com") {
      const body = await req.json();
      const newLead = {
        id: (mockLeads.length + 1).toString(),
        ...body,
        createdAt: new Date().toISOString(),
        lastContactedAt: null,
        status: "NEW" as LeadStatus,
        score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
        companyData: {
          industry: body.industry || "Technology",
          size: body.companySize || "1-50",
          location: body.location || "United States",
        }
      };
      return successResponse(newLead, 201);
    }

    const body = await req.json();
    const leadData: Prisma.LeadCreateInput = {
      name: body.name,
      company: body.company,
      title: body.title,
      email: body.email,
      status: "NEW",
      user: {
        connect: {
          id: user.id
        }
      }
    };

    const lead = await prisma.lead.create({
      data: leadData,
      include: {
        companyData: true,
      },
    });

    return successResponse(lead, 201);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

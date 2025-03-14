import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const _user = session?.user;

    const body = await req.json();
    const { companyName, website } = body;

    if (!companyName) {
      throw new ApiError(400, 'Company name is required');
    }

    // Check if company data already exists
    const existingCompany = await prisma.company.findFirst({
      where: {
        name: {
          contains: companyName,
          mode: 'insensitive',
        },
      },
    });

    if (existingCompany) {
      return successResponse(existingCompany);
    }

    // TODO: Implement company data enrichment using external APIs
    // For now, return mock data
    const enrichedData = {
      name: companyName,
      website: website || `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      industry: 'Technology',
      size: '50-200',
      location: 'San Francisco, CA',
      funding: {
        round: 'Series A',
        amount: '5000000',
        date: new Date().toISOString(),
      },
      lastFundingDate: new Date().toISOString(),
      hiringSignals: {
        jobPostings: Math.floor(Math.random() * 20),
        lastUpdated: new Date().toISOString(),
      },
    };

    // Create company record
    const company = await prisma.company.create({
      data: enrichedData,
    });

    return successResponse(company, 201);
  } catch (error) {
    return errorResponse('Failed to enrich company data', 500);
  }
}

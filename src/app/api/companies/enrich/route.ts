import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const { name, leadId } = await request.json();

    if (!name || !leadId) {
      return NextResponse.json(
        { error: 'Company name and lead ID are required' },
        { status: 400 },
      );
    }

    // Check if company data already exists
    const existingCompany = await prisma.company.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        lead: {
          userId: user.id,
        },
      },
    });

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company data already exists' },
        { status: 400 },
      );
    }

    // Enrich company data
    const enrichedData = {
      name,
      lead: {
        connect: {
          id: leadId,
        },
      },
      industry: 'Technology',
      size: '1-50',
      location: 'United States',
      website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
    };

    // Create company record
    const company = await prisma.company.create({
      data: enrichedData,
      include: {
        lead: true,
      },
    });

    return NextResponse.json(
      { company },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error enriching company:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

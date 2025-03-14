import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/api';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const leads = await prisma.lead.findMany({
      where: {
        userId: user.id,
      },
      include: {
        companyData: true,
        activities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!leads.length) {
      return NextResponse.json(
        { error: 'No leads found' },
        { status: 404 },
      );
    }

    // Transform leads for CSV export
    const csvData = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      status: lead.status,
      score: lead.score,
      createdAt: lead.createdAt,
      companyIndustry: lead.companyData?.industry || '',
      companySize: lead.companyData?.size || '',
      companyLocation: lead.companyData?.location || '',
      lastActivity: lead.activities[0]?.createdAt || '',
    }));

    return NextResponse.json(
      { data: csvData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export leads' },
      { status: 500 },
    );
  }
}

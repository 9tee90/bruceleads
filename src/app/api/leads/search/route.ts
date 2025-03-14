import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Prisma, LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const status = searchParams.get('status') as LeadStatus | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build where clause
    const where = {
      userId: user.id,
      ...(status && { status }),
      ...(query && {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
          { title: { contains: query, mode: 'insensitive' } }
        ]
      })
    } satisfies Prisma.LeadWhereInput;

    // Get total count
    const total = await prisma.lead.count({ where });

    // Get paginated results
    const leads = await prisma.lead.findMany({
      where,
      include: {
        companyData: true,
        activities: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

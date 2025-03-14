import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await request.json();
    const { leads } = body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: 'Leads array is required' }, { status: 400 });
    }

    const createdLeads = await prisma.lead.createMany({
      data: leads.map(lead => ({
        ...lead,
        userId: user.id,
        status: 'NEW'
      }))
    });

    return NextResponse.json({
      message: 'Leads created successfully',
      count: createdLeads.count
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await request.json();
    const { leadIds, action, data } = body;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json({ error: 'Lead IDs array is required' }, { status: 400 });
    }

    const leads = await prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        userId: user.id,
      },
      include: {
        companyData: true,
        activities: true,
      },
    });

    if (!leads.length) {
      return NextResponse.json(
        { error: 'No leads found' },
        { status: 404 },
      );
    }

    // Perform bulk action
    switch (action) {
      case 'delete':
        await prisma.lead.deleteMany({
          where: {
            id: {
              in: leadIds,
            },
            userId: user.id,
          },
        });
        break;

      case 'update':
        if (!data) {
          return NextResponse.json(
            { error: 'Update data is required' },
            { status: 400 },
          );
        }

        await prisma.lead.updateMany({
          where: {
            id: {
              in: leadIds,
            },
            userId: user.id,
          },
          data,
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 },
        );
    }

    return NextResponse.json(
      { message: `Bulk ${action} completed successfully` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

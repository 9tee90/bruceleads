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
    const { primaryLeadId, secondaryLeadId } = body;

    if (!primaryLeadId || !secondaryLeadId) {
      return NextResponse.json({ error: 'Both primary and secondary lead IDs are required' }, { status: 400 });
    }

    // Get both leads
    const [primaryLead, secondaryLead] = await Promise.all([
      prisma.lead.findFirst({
        where: {
          id: primaryLeadId,
          userId: user.id
        },
        include: {
          activities: true,
          tasks: true,
          companyData: true
        }
      }),
      prisma.lead.findFirst({
        where: {
          id: secondaryLeadId,
          userId: user.id
        },
        include: {
          activities: true,
          tasks: true,
          companyData: true
        }
      })
    ]);

    if (!primaryLead || !secondaryLead) {
      return NextResponse.json({ error: 'One or both leads not found' }, { status: 404 });
    }

    // Move activities and tasks to primary lead
    await prisma.$transaction([
      // Move activities
      ...secondaryLead.activities.map(activity =>
        prisma.activity.update({
          where: { id: activity.id },
          data: { leadId: primaryLeadId }
        })
      ),
      // Move tasks
      ...secondaryLead.tasks.map(task =>
        prisma.task.update({
          where: { id: task.id },
          data: { leadId: primaryLeadId }
        })
      ),
      // Delete secondary lead's company data if it exists
      ...(secondaryLead.companyData
        ? [prisma.company.delete({ where: { leadId: secondaryLeadId } })]
        : []),
      // Delete secondary lead
      prisma.lead.delete({
        where: { id: secondaryLeadId }
      })
    ]);

    // Get updated primary lead
    const mergedLead = await prisma.lead.findUnique({
      where: { id: primaryLeadId },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' }
        },
        tasks: {
          orderBy: { createdAt: 'desc' }
        },
        companyData: true
      }
    });

    return NextResponse.json({
      message: 'Leads merged successfully',
      lead: mergedLead
    });
  } catch (error) {
    console.error('Error merging leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

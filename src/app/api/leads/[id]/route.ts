import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id
      },
      include: {
        companyData: true,
        activities: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      }
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await request.json();
    const { name, email, company, title, status } = body;

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: {
        id: params.id
      },
      data: {
        name: name || lead.name,
        email: email || lead.email,
        company: company || lead.company,
        title: title || lead.title,
        status: status || lead.status
      }
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    await prisma.lead.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

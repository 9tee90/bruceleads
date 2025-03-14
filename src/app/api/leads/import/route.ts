import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { validateRequest } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { LeadStatus } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    
    const body = await request.json();
    const { leads } = body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: 'Leads array is required' }, { status: 400 });
    }

    // Validate lead data
    const validLeads = leads.map(lead => ({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      title: lead.title,
      status: LeadStatus.NEW,
      score: 0,
      userId: user.id
    })).filter(lead => lead.name && typeof lead.name === 'string');

    if (validLeads.length === 0) {
      return NextResponse.json({ error: 'No valid leads found in import data' }, { status: 400 });
    }

    // Import leads
    const importedLeads = await prisma.lead.createMany({
      data: validLeads,
      skipDuplicates: true
    });

    return NextResponse.json({
      message: 'Leads imported successfully',
      imported: importedLeads.count,
      total: leads.length
    });
  } catch (error) {
    console.error('Error importing leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

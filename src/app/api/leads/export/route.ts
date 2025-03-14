import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateRequest, errorResponse } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { stringify } from 'csv-stringify/sync';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const search = searchParams.get('search');

    // Build query
    const where = {
      userId: user.id,
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
          { title: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // Get leads with related data
    const leads = await prisma.lead.findMany({
      where,
      include: {
        companyData: true,
        activities: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Prepare CSV data
    const csvData = leads.map((lead) => ({
      name: lead.name,
      company: lead.company,
      title: lead.title,
      email: lead.email || '',
      phone: lead.phone || '',
      linkedinUrl: lead.linkedinUrl || '',
      source: lead.source,
      status: lead.status,
      score: lead.score,
      tags: lead.tags.join(','),
      notes: lead.notes || '',
      industry: lead.companyData?.industry || '',
      companySize: lead.companyData?.size || '',
      location: lead.companyData?.location || '',
      lastContactedAt: lead.lastContactedAt?.toISOString() || '',
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    }));

    // Generate CSV
    const csv = stringify(csvData, {
      header: true,
      columns: Object.keys(csvData[0] || {}),
    });

    // Set response headers
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set(
      'Content-Disposition',
      `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
    );

    return new Response(csv, {
      headers,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

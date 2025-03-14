import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const body = await req.json();
    const {
      search,
      filters,
      sort = { field: 'createdAt', direction: 'desc' },
      page = 1,
      limit = 10,
    } = body;

    // Build where clause
    const where: any = {
      userId: user.id,
    };

    // Add search conditions
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add filters
    if (filters) {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        where.status = { in: filters.status };
      }

      // Source filter
      if (filters.source && filters.source.length > 0) {
        where.source = { in: filters.source };
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        where.tags = { hasEvery: filters.tags };
      }

      // Score range filter
      if (filters.score) {
        if (filters.score.min !== undefined) {
          where.score = { ...where.score, gte: filters.score.min };
        }
        if (filters.score.max !== undefined) {
          where.score = { ...where.score, lte: filters.score.max };
        }
      }

      // Date range filter
      if (filters.dateRange) {
        const { field = 'createdAt', start, end } = filters.dateRange;
        if (start || end) {
          where[field] = {
            ...(start && { gte: new Date(start) }),
            ...(end && { lte: new Date(end) }),
          };
        }
      }

      // Company data filters
      if (filters.company) {
        where.companyData = {
          AND: [
            // Industry filter
            ...(filters.company.industry ? [{ industry: { in: filters.company.industry } }] : []),
            // Size filter
            ...(filters.company.size ? [{ size: { in: filters.company.size } }] : []),
            // Location filter
            ...(filters.company.location
              ? [{ location: { contains: filters.company.location, mode: 'insensitive' } }]
              : []),
            // Funding filter
            ...(filters.company.funding
              ? [{ funding: { path: ['amount'], gte: filters.company.funding } }]
              : []),
          ],
        };
      }
    }

    // Get total count for pagination
    const total = await prisma.lead.count({ where });

    // Get leads with sorting and pagination
    const leads = await prisma.lead.findMany({
      where,
      include: {
        companyData: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: {
        [sort.field]: sort.direction,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get aggregations
    const [statusAgg, sourceAgg, industryAgg] = await Promise.all([
      // Status aggregation
      prisma.lead.groupBy({
        by: ['status'],
        where: { userId: user.id },
        _count: true,
      }),
      // Source aggregation
      prisma.lead.groupBy({
        by: ['source'],
        where: { userId: user.id },
        _count: true,
      }),
      // Industry aggregation
      prisma.company.groupBy({
        by: ['industry'],
        where: {
          lead: { userId: user.id },
        },
        _count: true,
      }),
    ]);

    return successResponse({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      aggregations: {
        byStatus: statusAgg.reduce((acc, curr) => ({ ...acc, [curr.status]: curr._count }), {}),
        bySource: sourceAgg.reduce((acc, curr) => ({ ...acc, [curr.source]: curr._count }), {}),
        byIndustry: industryAgg.reduce(
          (acc, curr) => ({ ...acc, [curr.industry || 'Unknown']: curr._count }),
          {},
        ),
      },
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

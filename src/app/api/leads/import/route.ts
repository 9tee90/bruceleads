import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';
import { parse } from 'csv-parse/sync';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new ApiError(400, 'No file provided');
    }

    // Read file content
    const content = await file.text();

    // Parse CSV
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    // Validate required fields
    const requiredFields = ['name', 'company', 'title'];
    const missingFields = requiredFields.filter(
      (field) => !Object.keys(records[0] || {}).includes(field),
    );

    if (missingFields.length > 0) {
      throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
    }

    // Process records
    const results = {
      total: records.length,
      successful: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const record of records) {
      try {
        // Create lead
        await prisma.lead.create({
          data: {
            name: record.name,
            company: record.company,
            title: record.title,
            email: record.email,
            phone: record.phone,
            linkedinUrl: record.linkedinUrl,
            source: 'MANUAL',
            tags: record.tags ? record.tags.split(',').map((tag: string) => tag.trim()) : [],
            notes: record.notes,
            userId: user.id,
          },
        });

        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to import lead "${record.name}": ${error.message}`);
      }
    }

    return successResponse(results);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

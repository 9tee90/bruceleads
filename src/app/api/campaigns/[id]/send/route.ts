import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.status !== 'DRAFT') {
      throw new ApiError(400, 'Only draft campaigns can be sent');
    }

    const body = await req.json();
    const { leadIds } = body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      throw new ApiError(400, 'At least one lead is required');
    }

    // Get leads with their email addresses
    const leads = await prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
      },
    });

    const leadsWithoutEmail = leads.filter((lead) => !lead.email);
    if (leadsWithoutEmail.length > 0) {
      throw new ApiError(
        400,
        `The following leads don't have email addresses: ${leadsWithoutEmail
          .map((lead) => lead.name)
          .join(', ')}`,
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send emails to each lead
    const results = await Promise.allSettled(
      leads.map(async (lead) => {
        // Replace template variables
        let subject = campaign.template.subject;
        let body = campaign.template.body;

        // Replace variables in template
        const variables = {
          name: lead.name,
          company: lead.company,
        };

        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          subject = subject.replace(regex, value);
          body = body.replace(regex, value);
        });

        // Send email
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: lead.email,
          subject,
          html: body,
        });

        // Create activity record
        await prisma.activity.create({
          data: {
            type: 'EMAIL',
            leadId: lead.id,
            userId: user.id,
            content: `Sent email campaign "${campaign.name}"`,
            metadata: {
              campaignId: campaign.id,
              subject,
            },
          },
        });

        return {
          leadId: lead.id,
          status: 'success',
        };
      }),
    );

    // Update campaign status
    await prisma.campaign.update({
      where: {
        id: params.id,
      },
      data: {
        status: 'ACTIVE',
      },
    });

    // Process results
    const successful = results.filter((result) => result.status === 'fulfilled').length;
    const failed = results.filter((result) => result.status === 'rejected').length;

    return successResponse({
      message: 'Campaign sent successfully',
      stats: {
        total: leads.length,
        successful,
        failed,
      },
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

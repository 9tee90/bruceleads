import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const mockSettings = {
  notifications: {
    email: true,
    push: true,
    slack: false
  },
  preferences: {
    theme: 'system',
    language: 'en',
    timezone: 'UTC'
  },
  enrichment: {
    autoEnrich: true,
    enrichmentProvider: 'clearbit',
    enrichmentApiKey: 'demo-key'
  },
  integrations: {
    slack: {
      enabled: false,
      webhookUrl: ''
    },
    crm: {
      enabled: false,
      provider: 'hubspot',
      apiKey: ''
    }
  }
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Return mock data for demo users
  if (session.user.email === 'demo@bruceleads.com') {
    return NextResponse.json({ data: mockSettings });
  }

  // For real users, implement actual settings fetching here
  return NextResponse.json({ data: mockSettings }); // Temporarily return mock data for all users
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // For demo users, just return success without saving
    if (session.user.email === 'demo@bruceleads.com') {
      return NextResponse.json({ data: body });
    }

    // For real users, implement actual settings update here
    return NextResponse.json({ data: body }); // Temporarily just echo back the settings
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

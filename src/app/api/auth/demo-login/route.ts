import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  try {
    // Check if there's already a session
    const session = await getServerSession(authOptions);
    if (session) {
      return NextResponse.json({ error: 'Already authenticated' }, { status: 400 });
    }

    // Create a demo user session
    const demoUser = {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@bruceleads.ai',
      role: 'demo',
      createdAt: new Date().toISOString(),
    };

    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'next-auth.session-token',
      value: JSON.stringify(demoUser),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Demo login error:', error);
    return NextResponse.json({ error: 'Failed to create demo session' }, { status: 500 });
  }
}

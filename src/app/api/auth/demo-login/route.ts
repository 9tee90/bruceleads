import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function POST() {
  try {
    // Create a demo user with a unique ID
    const demoUser = {
      id: `demo-${Date.now()}`,
      email: 'demo@bruceleads.com',
      name: 'Demo User',
      role: 'DEMO',
    };

    // Create a demo user session token
    const token = sign(demoUser, JWT_SECRET, { expiresIn: '24h' });

    return NextResponse.json({
      success: true,
      token,
      email: demoUser.email,
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}

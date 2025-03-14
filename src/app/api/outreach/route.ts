import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { lead } = await req.json();
  const aiGeneratedMessage = `Hi ${lead.name}, I noticed your company recently ${lead.funding ? 'secured funding' : 'expanded your team'}. Let's discuss how Bruce Leads can help.`;

  return NextResponse.json({ message: 'Outreach Sent!', content: aiGeneratedMessage });
}

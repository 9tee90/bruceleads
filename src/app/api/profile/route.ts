import { NextResponse } from "next/server";

const users: Record<string, any> = {}; // Temporary in-memory storage

export async function POST(req: Request) {
  const { userId, company, industry, existingClients, targetClients } = await req.json();
  users[userId] = { company, industry, existingClients, targetClients };

  return NextResponse.json({ message: "Profile updated!", data: users[userId] });
}

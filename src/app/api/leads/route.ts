import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const industry = url.searchParams.get("industry") || "SaaS";

  // Simulating API calls to funding & hiring data sources
  const fundingData = [{ company: "Startup A", funding: "$5M", hiring: "10 roles" }];
  const hiringData = [{ company: "Startup B", funding: "N/A", hiring: "15 roles" }];

  const leads = [...fundingData, ...hiringData].map((lead) => ({
    ...lead,
    score: Math.random() * 100, // Placeholder AI scoring
  }));

  return NextResponse.json({ leads: leads.sort((a, b) => b.score - a.score) });
}

import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

const demoData = {
  leads: [
    {
      id: "1",
      name: "TechCorp Solutions",
      industry: "SaaS",
      intentScore: 85,
      techStack: ["React", "Node.js", "AWS"],
      signals: [
        { type: "Hiring", details: "New VP of Sales position" },
        { type: "Growth", details: "Series B Funding" }
      ]
    },
    {
      id: "2",
      name: "DataFlow Inc",
      industry: "Data Analytics",
      intentScore: 92,
      techStack: ["Python", "TensorFlow", "GCP"],
      signals: [
        { type: "Technology", details: "AI Implementation" },
        { type: "Market", details: "Expansion to EU" }
      ]
    },
    {
      id: "3",
      name: "CloudScale",
      industry: "Cloud Infrastructure",
      intentScore: 78,
      techStack: ["Kubernetes", "Docker", "Azure"],
      signals: [
        { type: "Partnership", details: "Strategic Alliance" },
        { type: "Product", details: "New Platform Launch" }
      ]
    }
  ],
  triggers: [
    {
      id: "1",
      company: "TechCorp Solutions",
      type: "Hiring Intent",
      details: "Posted 3 new sales positions in the last week",
      date: "2024-03-15T10:00:00Z",
      priority: "high",
      confidence: 0.89
    },
    {
      id: "2",
      company: "DataFlow Inc",
      type: "Technology Investment",
      details: "Significant investment in AI/ML infrastructure",
      date: "2024-03-14T15:30:00Z",
      priority: "medium",
      confidence: 0.75
    },
    {
      id: "3",
      company: "CloudScale",
      type: "Market Expansion",
      details: "Opening new offices in European market",
      date: "2024-03-13T09:15:00Z",
      priority: "high",
      confidence: 0.92
    }
  ],
  actions: [
    {
      id: "1",
      type: "outreach",
      title: "Engage TechCorp Solutions",
      description: "High intent detected - New VP of Sales hiring combined with Series B funding indicates expansion phase",
      priority: "high",
      dueDate: "2024-03-20",
      template: "series-b-expansion"
    },
    {
      id: "2",
      type: "meeting",
      title: "Schedule DataFlow Inc Demo",
      description: "AI implementation project presents perfect timing for product demonstration",
      priority: "medium",
      dueDate: "2024-03-22",
      template: "ai-implementation"
    },
    {
      id: "3",
      type: "content",
      title: "Share CloudScale Case Study",
      description: "Recent platform launch aligns with our infrastructure scaling success stories",
      priority: "low",
      dueDate: "2024-03-25",
      template: "platform-launch"
    }
  ]
};

export async function POST() {
  try {
    // Create a demo user with a unique ID
    const demoUser = {
      id: `demo-${Date.now()}`,
      email: 'demo@bruceleads.com',
      name: 'Demo User',
      role: 'DEMO',
      demoData, // Include demo data in the user object
    };

    // Create a demo user session token
    const token = sign(demoUser, JWT_SECRET, { expiresIn: '24h' });

    return NextResponse.json({
      success: true,
      token,
      email: demoUser.email,
      demoData, // Include demo data in the response
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    demoData
  });
}

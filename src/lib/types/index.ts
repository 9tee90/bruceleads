export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'admin' | 'user';
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'trial';
    expiresAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  source: 'linkedin' | 'crunchbase' | 'job_board' | 'manual';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  tags: string[];
  notes?: string;
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  funding?: {
    round: string;
    amount: number;
    date: Date;
  };
  lastFundingDate?: Date;
  hiringSignals: {
    jobPostings: number;
    lastUpdated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'email' | 'linkedin' | 'call' | 'note';
  leadId: string;
  userId: string;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  template: {
    subject: string;
    body: string;
    variables: string[];
  };
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    timezone: string;
  };
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Analytics {
  leads: {
    total: number;
    byStatus: Record<string, number>;
    bySource: Record<string, number>;
    byIndustry: Record<string, number>;
  };
  activities: {
    total: number;
    byType: Record<string, number>;
    byDay: Array<{ date: string; count: number }>;
  };
  conversion: {
    rate: number;
    funnel: Array<{ stage: string; count: number }>;
  };
}

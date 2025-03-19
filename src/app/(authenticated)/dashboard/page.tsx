'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  MessageSquare, 
  Phone, 
  Mail, 
  Linkedin,
  Users,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter,
  Settings,
  RefreshCw,
  BarChart2,
  Bell,
  Send,
  ArrowRight,
  Plus,
  Building2
} from 'lucide-react';
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useToast } from '@/components/ui/use-toast';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import LeadFilters from '@/components/dashboard/LeadFilters';
import NextBestAction from '@/components/dashboard/NextBestAction';
import BulkActions from '@/components/dashboard/BulkActions';
import TriggerRules from '@/components/dashboard/TriggerRules';
import OutreachPanel from '@/components/dashboard/OutreachPanel';

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
}

interface TriggerEvent {
  id: string;
  company: string;
  companyId: string;
  event: string;
  type: string;
  score?: number;
  description?: string;
  source?: string;
  timestamp: string;
  status?: 'new' | 'reviewing' | 'actioned' | 'ignored';
}

interface OutreachTemplate {
  id: number;
  name: string;
  type: 'Email' | 'Call' | 'Social';
  stats: Record<string, number>;
  icon: React.ElementType;
  content?: string;
  variables?: string[];
}

interface DemoData {
  leads: Array<{
    id: string;
    name: string;
    industry: string;
    funding: string;
    hiring: string;
    techStack: string[];
    intentScore: number;
    status: string;
    lastActivity: string;
  }>;
  triggers: Array<{
    id: string;
    type: string;
    company: string;
    details: string;
    date: string;
  }>;
  actions: Array<{
    id: string;
    type: 'email' | 'linkedin' | 'meeting';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
    template: string;
  }>;
}

interface DashboardTabsProps {
  leads: Array<{
    id: string;
    name: string;
    industry: string;
    funding: string;
    hiring: string;
    techStack: string[];
    intentScore: number;
    status: string;
    lastActivity: string;
  }>;
  triggers: Array<{
    id: string;
    type: string;
    company: string;
    details: string;
    date: string;
  }>;
  onLeadSelect: (leadId: string) => void;
  selectedLeads: string[];
}

const stats: Stat[] = [
  {
    name: "Target Companies",
    value: "156",
    change: "+12%",
    changeType: "positive",
    icon: Target,
  },
  {
    name: "Active Alerts",
    value: "23",
    change: "+8%",
    changeType: "positive",
    icon: Bell,
  },
  {
    name: "Outreach Campaigns",
    value: "8",
    change: "-2%",
    changeType: "negative",
    icon: Send,
  },
  {
    name: "Team Members",
    value: "12",
    change: "+3",
    changeType: "positive",
    icon: Users,
  },
]

const recentTriggers: TriggerEvent[] = [
  {
    id: "1",
    company: "Acme Corp",
    event: "New job posting for Sales Director",
    type: "Job Posting",
    companyId: "acme-corp",
    timestamp: "2024-03-15T10:00:00Z",
    score: 85,
    source: "LinkedIn",
    description: "Looking for a Sales Director to lead the enterprise sales team"
  },
  {
    id: "2",
    company: "TechStart Inc",
    event: "Series A funding announcement",
    type: "Funding Round",
    companyId: "techstart",
    timestamp: "2024-03-15T08:00:00Z",
    score: 90,
    source: "TechCrunch",
    description: "$15M Series A led by Accel Partners"
  },
  {
    id: "3",
    company: "Global Solutions",
    event: "New CTO appointment",
    type: "New Hire",
    companyId: "global-solutions",
    timestamp: "2024-03-14T15:00:00Z",
    score: 75,
    source: "Company Website",
    description: "Former VP of Engineering at AWS joins as CTO"
  }
]

const outreachTemplates: OutreachTemplate[] = [
  {
    id: 1,
    name: "Cold Email Sequence",
    type: "Email",
    stats: { sent: 245, opened: 156, replied: 42 },
    icon: Mail,
  },
  {
    id: 2,
    name: "Sales Call Script",
    type: "Call",
    stats: { used: 89, connected: 34, meetings: 12 },
    icon: Phone,
  },
  {
    id: 3,
    name: "LinkedIn Message",
    type: "Social",
    stats: { sent: 178, accepted: 92, responded: 45 },
    icon: MessageSquare,
  },
]

function StatsCard({ stat }: { stat: Stat }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
          <p className="text-3xl font-semibold mt-1">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-full ${
          stat.changeType === "positive" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
        }`}>
          <stat.icon className={`w-6 h-6 ${
            stat.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`} />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${
          stat.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        }`}>
          {stat.change}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400"> from last month</span>
      </div>
    </Card>
  )
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}

function TriggerEventCard({ event }: { event: TriggerEvent }) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{event.company}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{event.event}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatTimestamp(event.timestamp)}</p>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

function TemplateCard({ template }: { template: OutreachTemplate }) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
          <template.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{template.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{template.type}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        {Object.entries(template.stats).map(([key, value]) => (
          <div key={key}>
            <p className="font-medium">{value}</p>
            <p className="text-gray-600 dark:text-gray-400 capitalize">{key}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {template.variables?.map((variable) => (
          <Badge key={variable} variant="outline" className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            {variable}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32 mt-4" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const formatDate = (timestamp?: string) => {
  if (!timestamp) return 'No date';
  return new Date(timestamp).toLocaleDateString();
};

function getOutreachType(triggerType: string | undefined) {
  if (!triggerType) return "email";
  
  const typeMap: Record<string, "email" | "call" | "social"> = {
    "Funding Round": "email",
    "New Hire": "email",
    "Product Launch": "call",
    "Social Post": "social",
    "News Article": "email",
    "Job Posting": "email",
  };
  return typeMap[triggerType] || "email";
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [demoData, setDemoData] = useState<DemoData | null>(null);
  const [activeFeature, setActiveFeature] = useState<'leads' | 'triggers' | 'actions' | 'outreach'>('leads');
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user?.email === 'demo@bruceleads.com') {
      setIsDemoUser(true);
      // Fetch demo data from the session
      fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.demoData) {
            setDemoData(data.demoData);
          }
        })
        .catch(console.error);
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 max-w-[1400px] mx-auto mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Welcome to Bruce
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {isDemoUser ? 'Explore our AI-powered sales intelligence platform' : 'Your sales intelligence dashboard'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <ThemeToggle />
          {!isDemoUser && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/settings'} 
              className="w-full sm:w-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure Settings
            </Button>
          )}
          {isDemoUser && (
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/settings'}
              className="w-full sm:w-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
            >
              <Zap className="w-4 h-4 mr-2" />
              Configure API Keys
            </Button>
          )}
        </div>
      </div>

      {/* Feature Navigation */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeFeature === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('leads')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            Smart Lead Discovery
          </Button>
          <Button
            variant={activeFeature === 'triggers' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('triggers')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Zap className="w-4 h-4" />
            Intent Rules
          </Button>
          <Button
            variant={activeFeature === 'actions' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('actions')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Target className="w-4 h-4" />
            Next Best Actions
          </Button>
          <Button
            variant={activeFeature === 'outreach' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('outreach')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            Intelligent Outreach
          </Button>
        </div>

        {/* Feature Content */}
        <div className="space-y-6">
          {activeFeature === 'leads' && (
            <>
              <LeadFilters />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoData?.leads.map(lead => (
                  <Card key={lead.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{lead.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {lead.intentScore}% Intent
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">{lead.industry}</p>
                        <div className="flex flex-wrap gap-2">
                          {lead.techStack.map(tech => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLeads(prev => 
                              prev.includes(lead.id) 
                                ? prev.filter(id => id !== lead.id)
                                : [...prev, lead.id]
                            )}
                          >
                            {selectedLeads.includes(lead.id) ? 'Selected' : 'Select'}
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeFeature === 'triggers' && (
            <TriggerRules />
          )}

          {activeFeature === 'actions' && (
            <div className="space-y-4">
              {demoData?.actions.map(action => (
                <NextBestAction key={action.id} action={action} />
              ))}
            </div>
          )}

          {activeFeature === 'outreach' && (
            <OutreachPanel />
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <BulkActions selectedLeads={selectedLeads.map(Number)} />
        </div>
      )}
    </div>
  );
} 
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
  const [triggerEvents, setTriggerEvents] = useState<TriggerEvent[]>([]);
  const [templates, setTemplates] = useState<OutreachTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const router = useRouter();

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // In a real implementation, these would be separate API calls
      const mockTriggerEvents: TriggerEvent[] = [
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
        },
      ];

      const mockTemplates: OutreachTemplate[] = [
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
      ];

      setTriggerEvents(mockTriggerEvents);
      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch('/api/user/onboarding-status');
        const data = await response.json();
        setShowOnboarding(!data.completed);
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  const getStatusColor = (status: TriggerEvent['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'reviewing': return 'bg-yellow-500';
      case 'actioned': return 'bg-green-500';
      case 'ignored': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Skeleton Loading */}
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>
            
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-transparent">
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-transparent">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-transparent">
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 max-w-[1400px] mx-auto mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Your sales intelligence dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/settings'} 
            className="w-full sm:w-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </Button>
          <Button 
            onClick={fetchDashboardData} 
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/20"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button 
            onClick={() => setShowOnboarding(true)} 
            variant="outline"
            className="w-full sm:w-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
          >
            <Zap className="w-4 h-4 mr-2" />
            Demo Onboarding
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1400px] mx-auto">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
            <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{triggerEvents.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              +5 points improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Based on last 50 outreach</p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Across 3 channels</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        {/* Trigger Events List */}
        <div className="lg:col-span-2">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-xl">Recent Trigger Events</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="min-w-[150px] bg-white/80 dark:bg-gray-900/80">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="crunchbase">Crunchbase</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="builtwith">BuiltWith</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-8 h-8 p-0 bg-white/80 dark:bg-gray-900/80">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] sm:h-[500px] pr-4">
                <div className="space-y-4">
                  {triggerEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold">{event.company}</h3>
                            <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                              {event.type}
                            </Badge>
                            <span className={`text-sm font-medium ${getScoreColor(event.score)}`}>
                              Score: {event.score}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Source: {event.source}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimestamp(event.timestamp)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/outreach/${getOutreachType(event.type)}?triggerId=${event.id}&companyId=${event.companyId}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                              <Mail className="w-4 h-4" />
                              Start Outreach
                            </Link>
                            <Link
                              href={`/companies/${event.companyId}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-700"
                            >
                              <Building2 className="w-4 h-4" />
                              View Company
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Outreach Panel */}
        <div className="space-y-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent">
            <CardHeader>
              <CardTitle className="text-xl">Outreach Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-4 bg-gray-100/50 dark:bg-gray-900/50 p-1 rounded-lg">
                  <TabsTrigger value="email" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="linkedin" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </TabsTrigger>
                  <TabsTrigger value="call" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </TabsTrigger>
                </TabsList>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-medium mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {template.variables?.map((variable) => (
                          <Badge key={variable} variant="outline" className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/rules" className="w-full">
                  <Button className="w-full justify-start hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Trigger Rules
                  </Button>
                </Link>
                <Link href="/team" className="w-full">
                  <Button className="w-full justify-start hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Team
                  </Button>
                </Link>
                <Link href="/targets" className="w-full">
                  <Button className="w-full justify-start hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Set Target Accounts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation Badge */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {triggerEvents.filter(e => e.status === 'new').length}
      </div>
    </div>
  );
} 
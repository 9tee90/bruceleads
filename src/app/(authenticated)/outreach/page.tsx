'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  Users,
  Clock,
  Check,
  Pause,
  Play,
  Plus,
  Settings,
  MessageSquare,
  LinkedinIcon,
  BarChart,
  CalendarClock,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useSearchParams } from 'next/navigation';

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  type: 'email' | 'linkedin' | 'multi';
  stats: {
    sent: number;
    opened: number;
    replied: number;
    meetings: number;
  };
  lastUpdated: string;
}

interface Template {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'call';
  subject?: string;
  content: string;
  variables: string[];
  stats: {
    usage: number;
    responseRate: number;
  };
}

function OutreachPageContent() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const preselectedCompany = searchParams.get('company');
  const preselectedType = searchParams.get('type') || 'email';

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/outreach');
      if (!response.ok) {
        throw new Error('Failed to fetch outreach data');
      }
      const data = await response.json();
      setCampaigns(data.campaigns);
      setTemplates(data.templates);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch outreach data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (preselectedCompany) {
      // In a real app, you would filter campaigns by company
      // and pre-select templates based on type
      console.log('Pre-selected company:', preselectedCompany);
      console.log('Pre-selected type:', preselectedType);
    }
  }, [preselectedCompany, preselectedType]);

  const toggleCampaignStatus = async (id: string, currentStatus: Campaign['status']) => {
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      const response = await fetch('/api/outreach', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'campaign',
          id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign status');
      }

      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, status: newStatus } : campaign
      ));
    } catch (err) {
      console.error('Failed to update campaign status:', err);
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: Campaign['type'] | Template['type']) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'linkedin': return <LinkedinIcon className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'multi': return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Outreach</h1>
          <p className="text-gray-500">Manage your multi-channel campaigns and templates</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500">Running campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((campaigns.reduce((acc, c) => acc + c.stats.replied, 0) / 
                campaigns.reduce((acc, c) => acc + c.stats.sent, 0)) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Average across campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
            <CalendarClock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((acc, c) => acc + c.stats.meetings, 0)}
            </div>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((campaigns.reduce((acc, c) => acc + c.stats.meetings, 0) / 
                campaigns.reduce((acc, c) => acc + c.stats.replied, 0)) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Reply to meeting</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border p-4 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getTypeIcon(campaign.type)}
                              {campaign.type}
                            </Badge>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)} text-white`}>
                              {campaign.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                          
                          <div className="grid grid-cols-4 gap-4 mt-4">
                            <div>
                              <div className="text-sm font-medium">{campaign.stats.sent}</div>
                              <div className="text-xs text-gray-500">Sent</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{campaign.stats.opened}</div>
                              <div className="text-xs text-gray-500">Opened</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{campaign.stats.replied}</div>
                              <div className="text-xs text-gray-500">Replied</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{campaign.stats.meetings}</div>
                              <div className="text-xs text-gray-500">Meetings</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                          >
                            {campaign.status === 'active' ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Message Templates</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border p-4 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              <Badge variant="outline" className="flex items-center gap-1">
                                {getTypeIcon(template.type)}
                                {template.type}
                              </Badge>
                            </div>
                            {template.subject && (
                              <p className="text-sm font-medium mt-1">Subject: {template.subject}</p>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-600 whitespace-pre-line">
                            {template.content}
                          </div>

                          <div>
                            <div className="text-xs font-medium text-gray-500 mb-2">Variables:</div>
                            <div className="flex flex-wrap gap-2">
                              {template.variables.map((variable) => (
                                <Badge key={variable} variant="secondary">
                                  {variable}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-8">
                            <div>
                              <div className="text-sm font-medium">{template.stats.usage}</div>
                              <div className="text-xs text-gray-500">Times Used</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{template.stats.responseRate}%</div>
                              <div className="text-xs text-gray-500">Response Rate</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function OutreachPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <OutreachPageContent />
    </Suspense>
  );
} 
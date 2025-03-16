'use client';

import { useState, Suspense } from 'react';
import { Bell, Filter, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { useRouter, useSearchParams } from 'next/navigation';

interface Alert {
  id: string;
  title: string;
  company: string;
  type: string;
  status: 'new' | 'reviewing' | 'actioned' | 'dismissed';
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  description: string;
}

function AlertsPageContent() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightedCompany = searchParams.get('company');
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'New Funding Round',
      company: 'TechCorp',
      type: 'funding',
      status: 'new',
      priority: 'high',
      timestamp: new Date().toISOString(),
      description: 'Series B funding round of $50M announced',
    },
    {
      id: '2',
      title: 'Tech Stack Update',
      company: 'DataFlow Inc',
      type: 'technology',
      status: 'reviewing',
      priority: 'medium',
      timestamp: new Date().toISOString(),
      description: 'Added Kubernetes to their infrastructure',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'reviewing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'actioned': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'dismissed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return '';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Alerts
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Stay updated on important company changes</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="min-w-[150px] bg-white/80 dark:bg-gray-900/80">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="actioned">Actioned</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-8 h-8 p-0 bg-white/80 dark:bg-gray-900/80">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    {getStatusIcon(alert.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{alert.company}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(alert.timestamp).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{alert.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                    Review
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300">
                    Mark as Actioned
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-red-50 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300">
                    Dismiss
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30" onClick={() => router.push(`/outreach?company=${alert.company}`)}>
                    Start Outreach
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30" onClick={() => router.push(`/targets?company=${alert.company}`)}>
                    View Target
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AlertsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <AlertsPageContent />
    </Suspense>
  );
} 
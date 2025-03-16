'use client';

import { useState, Suspense } from 'react';
import { Plus, Search, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useRouter, useSearchParams } from 'next/navigation';

interface TargetCompany {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: 'active' | 'paused';
  priority: 'high' | 'medium' | 'low';
  triggers: number;
}

function TargetsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightedCompany = searchParams.get('company');
  const [companies] = useState<TargetCompany[]>([
    {
      id: '1',
      name: 'TechCorp',
      industry: 'Software',
      size: '1000-5000',
      status: 'active',
      priority: 'high',
      triggers: 5,
    },
    {
      id: '2',
      name: 'DataFlow Inc',
      industry: 'Data Analytics',
      size: '500-1000',
      status: 'active',
      priority: 'medium',
      triggers: 3,
    },
  ]);

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
            Target Companies
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor and manage your target accounts</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/20">
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
        {companies.map((company) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{company.industry}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getPriorityColor(company.priority)}>
                  {company.priority}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Company Size</span>
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Active Triggers</span>
                    <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                      {company.triggers}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                    <Badge variant="outline" className={company.status === 'active' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'}>
                      {company.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30" onClick={() => router.push(`/outreach?company=${company.name}`)}>
                    Start Outreach
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30" onClick={() => router.push(`/alerts?company=${company.name}`)}>
                    View Alerts
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

export default function TargetsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <TargetsPageContent />
    </Suspense>
  );
} 
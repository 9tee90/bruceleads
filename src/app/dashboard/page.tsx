'use client';

import { Shell } from '@/components/ui/Shell';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import {
  TrendingUp,
  Users,
  Target,
  Bell,
  BarChart,
  Calendar,
  Mail,
  MessageSquare,
  Filter,
  ChevronDown,
  Check,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const dynamic = 'force-dynamic';

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 30 days', value: 'month' },
  { label: 'Last 90 days', value: 'quarter' },
];

const stats = [
  {
    name: 'Active Triggers',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: Target,
  },
  {
    name: 'New Leads',
    value: '45',
    change: '+16%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Response Rate',
    value: '68%',
    change: '+8%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Notifications',
    value: '12',
    change: '-3',
    changeType: 'neutral',
    icon: Bell,
  },
];

const recentTriggers = [
  {
    company: 'Acme Corp',
    event: 'New funding round ($10M Series A)',
    time: '2 hours ago',
    score: 85,
    type: 'funding',
  },
  {
    company: 'TechStart Inc',
    event: 'Hiring spree (10+ engineering roles)',
    time: '4 hours ago',
    score: 75,
    type: 'hiring',
  },
  {
    company: 'DataFlow Systems',
    event: 'New CTO appointment',
    time: '6 hours ago',
    score: 82,
    type: 'leadership',
  },
  {
    company: 'CloudNine Solutions',
    event: 'Product launch announcement',
    time: '12 hours ago',
    score: 78,
    type: 'product',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Follow up with Acme Corp',
    type: 'Call',
    date: 'Today, 2:00 PM',
    icon: MessageSquare,
    completed: false,
  },
  {
    id: 2,
    title: 'Send proposal to TechStart',
    type: 'Email',
    date: 'Tomorrow, 10:00 AM',
    icon: Mail,
    completed: false,
  },
  {
    id: 3,
    title: 'Strategy meeting',
    type: 'Meeting',
    date: 'Wed, 11:00 AM',
    icon: Calendar,
    completed: false,
  },
];

const analyticsData = {
  leads: [42, 38, 55, 48, 65, 58, 72],
  responses: [18, 22, 35, 28, 42, 38, 45],
  meetings: [8, 12, 15, 18, 22, 25, 28],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [triggerFilter, setTriggerFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(upcomingTasks);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleTaskComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTriggers = recentTriggers.filter((trigger) => {
    const matchesSearch = trigger.company
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = triggerFilter === 'all' || trigger.type === triggerFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Shell>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="ml-4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="px-4 py-5 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd>
                            <div className="flex items-baseline">
                              <p className="text-2xl font-semibold text-gray-900">
                                {stat.value}
                              </p>
                              <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${
                                  stat.changeType === 'positive'
                                    ? 'text-green-600'
                                    : stat.changeType === 'negative'
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                                }`}
                              >
                                {stat.change}
                                {stat.changeType === 'positive' ? (
                                  <ArrowUpRight className="h-4 w-4 ml-1" />
                                ) : stat.changeType === 'negative' ? (
                                  <ArrowDownRight className="h-4 w-4 ml-1" />
                                ) : null}
                              </p>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Triggers */}
          <div className="mt-8">
            <Card className="overflow-hidden border border-gray-200 rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-gray-400" />
                    Recent Triggers
                  </h3>
                  <Button variant="outline" size="sm">
                    View all
                  </Button>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select
                    value={triggerFilter}
                    onChange={(e) => setTriggerFilter(e.target.value)}
                    className="pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Types</option>
                    <option value="funding">Funding</option>
                    <option value="hiring">Hiring</option>
                    <option value="leadership">Leadership</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </div>
              <div className="bg-white">
                <ul role="list" className="divide-y divide-gray-200">
                  {filteredTriggers.map((trigger) => (
                    <motion.li
                      key={trigger.company}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {trigger.company}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {trigger.event}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {trigger.time}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Score: {trigger.score}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Tasks and Analytics */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Upcoming Tasks */}
            <Card className="overflow-hidden border border-gray-200 rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  Upcoming Tasks
                </h3>
              </div>
              <div className="bg-white">
                <ul role="list" className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                        task.completed ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => handleTaskComplete(task.id)}
                          className={`flex-shrink-0 h-5 w-5 rounded border ${
                            task.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                          } mr-3`}
                        >
                          {task.completed && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                        <task.icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              task.completed
                                ? 'text-gray-500 line-through'
                                : 'text-gray-900'
                            } truncate`}
                          >
                            {task.title}
                          </p>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {task.date}
                          </div>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              task.completed
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {task.type}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Analytics Preview */}
            <Card className="overflow-hidden border border-gray-200 rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-gray-400" />
                  Analytics Overview
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="h-64 relative">
                  {/* Chart placeholder - Replace with actual chart component */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 grid grid-cols-7 gap-px bg-gray-100">
                      {analyticsData.leads.map((value, index) => (
                        <div key={index} className="relative bg-white">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-blue-500"
                            style={{ height: `${(value / 80) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-px">
                      {analyticsData.labels.map((label) => (
                        <div key={label} className="text-center text-xs text-gray-500">
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
} 
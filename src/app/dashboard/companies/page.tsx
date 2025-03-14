'use client';

import { Shell } from '@/components/ui/Shell';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  Plus,
  Filter,
  TrendingUp,
  AlertCircle,
  Clock,
  ChevronRight,
  Target,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const companies = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    size: '1000-5000',
    signals: [
      {
        type: 'funding',
        description: 'Raised $10M Series A',
        date: '2 days ago',
        score: 85,
      },
      {
        type: 'hiring',
        description: 'Posted 15 new positions',
        date: '1 week ago',
        score: 75,
      },
    ],
    status: 'hot',
  },
  {
    id: 2,
    name: 'TechStart Inc',
    industry: 'Software',
    size: '50-200',
    signals: [
      {
        type: 'technology',
        description: 'Adopting new cloud platform',
        date: '3 days ago',
        score: 82,
      },
    ],
    status: 'warm',
  },
  {
    id: 3,
    name: 'DataFlow Systems',
    industry: 'Data Analytics',
    size: '201-500',
    signals: [
      {
        type: 'expansion',
        description: 'Opening new office in London',
        date: '1 day ago',
        score: 88,
      },
      {
        type: 'leadership',
        description: 'New CTO appointed',
        date: '1 week ago',
        score: 78,
      },
    ],
    status: 'hot',
  },
];

const filters = [
  { name: 'All Companies', value: 'all' },
  { name: 'Hot Leads', value: 'hot' },
  { name: 'Warm Leads', value: 'warm' },
  { name: 'Cold Leads', value: 'cold' },
];

const industries = [
  'All Industries',
  'Technology',
  'Software',
  'Data Analytics',
  'Healthcare',
  'Finance',
];

export default function CompaniesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Shell>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-gray-400" />
              Companies
            </h1>
            <Button className="flex items-center">
              <Plus className="h-5 w-5 mr-1" />
              Add Company
            </Button>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-5 w-5 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedFilter === filter.value
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Companies List */}
          <div className="mt-6 space-y-4">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            {company.name}
                          </h2>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{company.industry}</span>
                            <span className="mx-2">&middot;</span>
                            <span>{company.size} employees</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            company.status === 'hot'
                              ? 'bg-red-100 text-red-800'
                              : company.status === 'warm'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {company.status.charAt(0).toUpperCase() +
                            company.status.slice(1)}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                      </div>
                    </div>

                    {/* Signals */}
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-1 text-gray-400" />
                        Recent Signals
                      </h3>
                      <div className="space-y-2">
                        {company.signals.map((signal, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center">
                              {signal.type === 'funding' ? (
                                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                              ) : signal.type === 'hiring' ? (
                                <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                              ) : (
                                <Clock className="h-4 w-4 text-purple-500 mr-2" />
                              )}
                              <span className="text-gray-600">
                                {signal.description}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">
                                {signal.date}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Score: {signal.score}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
} 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

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

const tabs = [
  {
    id: 'outreach',
    label: 'Outreach',
    icon: Mail,
    content: 'outreach-content',
  },
  {
    id: 'triggers',
    label: 'Triggers',
    icon: Zap,
    content: 'triggers-content',
  },
  {
    id: 'stats',
    label: 'Engagement Stats',
    icon: BarChart3,
    content: 'stats-content',
  },
];

export default function DashboardTabs({ leads, triggers, onLeadSelect, selectedLeads }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState('outreach');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              )}
            >
              <tab.icon
                className={cn(
                  '-ml-0.5 mr-2 h-5 w-5',
                  activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'
                )}
                aria-hidden="true"
              />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'outreach' && (
              <div className="space-y-4">
                {/* Outreach Content */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Active Outreach Campaigns</h3>
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                      >
                        <div>
                          <h4 className="text-white font-medium">{lead.name}</h4>
                          <p className="text-gray-300 text-sm">{lead.industry}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onLeadSelect(lead.id)}
                          className={cn(
                            'ml-4',
                            selectedLeads.includes(lead.id) && 'bg-blue-500 text-white hover:bg-blue-600'
                          )}
                        >
                          {selectedLeads.includes(lead.id) ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'triggers' && (
              <div className="space-y-4">
                {/* Triggers Content */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Triggers</h3>
                  <div className="space-y-4">
                    {triggers.map((trigger) => (
                      <div
                        key={trigger.id}
                        className="p-4 bg-gray-700 rounded-lg"
                      >
                        <h4 className="text-white font-medium">{trigger.company}</h4>
                        <p className="text-gray-300 text-sm">{trigger.details}</p>
                        <p className="text-gray-400 text-xs mt-2">{trigger.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-4">
                {/* Stats Content */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Engagement Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Total Leads</h4>
                      <p className="text-2xl text-blue-400 mt-2">{leads.length}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Active Triggers</h4>
                      <p className="text-2xl text-green-400 mt-2">{triggers.length}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Avg. Intent Score</h4>
                      <p className="text-2xl text-purple-400 mt-2">
                        {Math.round(leads.reduce((acc, lead) => acc + lead.intentScore, 0) / leads.length)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 
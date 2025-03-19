'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Key,
  Mail,
  Linkedin,
  Database,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Lock,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/use-toast';

interface Integration {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing';
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  icon: React.ElementType;
}

const integrations: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    type: 'incoming',
    description: 'Import leads and account data from Salesforce',
    status: 'connected',
    lastSync: '2024-03-15T10:00:00Z',
    icon: Database
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    type: 'incoming',
    description: 'Sync contacts and companies from HubSpot',
    status: 'disconnected',
    icon: Database
  },
  {
    id: 'email',
    name: 'Email Integration',
    type: 'outgoing',
    description: 'Send personalized emails through your email provider',
    status: 'connected',
    lastSync: '2024-03-15T11:30:00Z',
    icon: Mail
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'outgoing',
    description: 'Connect and message prospects on LinkedIn',
    status: 'error',
    lastSync: '2024-03-14T15:00:00Z',
    icon: Linkedin
  }
];

export default function SettingsPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSync = (integration: Integration) => {
    toast({
      title: 'Syncing...',
      description: `Syncing data with ${integration.name}`,
    });
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">API Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your API integrations and access keys
          </p>
        </div>

        {/* Security Notice */}
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Security Notice</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  API keys are encrypted and stored securely. Never share your API keys or expose them in client-side code.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incoming Data Sources */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Incoming Data Sources</h2>
          <div className="grid gap-4">
            {integrations.filter(i => i.type === 'incoming').map(integration => (
              <Card key={integration.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(integration.status)}`}>
                      <integration.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        <Badge variant="outline" className={getStatusColor(integration.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(integration.status)}
                            <span className="capitalize">{integration.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {integration.description}
                      </p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-2">
                          Last synced: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      )}
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">API Key</label>
                          <div className="flex gap-2">
                            <Input
                              type={showKeys[integration.id] ? 'text' : 'password'}
                              placeholder="Enter API key"
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleShowKey(integration.id)}
                            >
                              {showKeys[integration.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch checked={integration.status === 'connected'} />
                            <span className="text-sm">Enable Integration</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(integration)}
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Sync Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Outgoing Integrations */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Outgoing Integrations</h2>
          <div className="grid gap-4">
            {integrations.filter(i => i.type === 'outgoing').map(integration => (
              <Card key={integration.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(integration.status)}`}>
                      <integration.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        <Badge variant="outline" className={getStatusColor(integration.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(integration.status)}
                            <span className="capitalize">{integration.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {integration.description}
                      </p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-2">
                          Last synced: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      )}
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">API Key</label>
                          <div className="flex gap-2">
                            <Input
                              type={showKeys[integration.id] ? 'text' : 'password'}
                              placeholder="Enter API key"
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleShowKey(integration.id)}
                            >
                              {showKeys[integration.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch checked={integration.status === 'connected'} />
                            <span className="text-sm">Enable Integration</span>
                          </div>
                          {integration.status === 'error' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Troubleshoot
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

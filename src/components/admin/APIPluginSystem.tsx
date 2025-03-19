import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Activity, RefreshCw, Shield, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';

type APIIntegration = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  apiKey: string;
  enabled: boolean;
};

export default function APIPluginSystem() {
  const [integrations, setIntegrations] = useState<APIIntegration[]>([
    {
      id: '1',
      name: 'LinkedIn Sales Navigator',
      type: 'lead_source',
      status: 'active',
      lastSync: '2024-03-16T12:00:00Z',
      apiKey: '••••••••••••••••',
      enabled: true,
    },
    {
      id: '2',
      name: 'Clearbit',
      type: 'enrichment',
      status: 'active',
      lastSync: '2024-03-16T11:30:00Z',
      apiKey: '••••••••••••••••',
      enabled: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: '',
    apiKey: '',
  });

  const handleAddIntegration = () => {
    // In a real app, this would make an API call to securely store the integration
    const integration: APIIntegration = {
      id: Date.now().toString(),
      name: newIntegration.name,
      type: newIntegration.type,
      status: 'active',
      lastSync: new Date().toISOString(),
      apiKey: '••••••••••••••••',
      enabled: true,
    };
    setIntegrations([...integrations, integration]);
    setShowAddForm(false);
    setNewIntegration({ name: '', type: '', apiKey: '' });
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((i) => i.id !== id));
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((i) =>
        i.id === id ? { ...i, enabled: !i.enabled } : i
      )
    );
  };

  const getStatusColor = (status: APIIntegration['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'inactive':
        return 'text-gray-400 bg-gray-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">API Integrations</h2>
          <p className="text-gray-400">Manage your API connections and integrations</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Add Integration Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Integration Name</Label>
              <Input
                id="name"
                value={newIntegration.name}
                onChange={(e) =>
                  setNewIntegration({ ...newIntegration, name: e.target.value })
                }
                placeholder="e.g., LinkedIn Sales Navigator"
              />
            </div>
            <div>
              <Label htmlFor="type">Integration Type</Label>
              <Input
                id="type"
                value={newIntegration.type}
                onChange={(e) =>
                  setNewIntegration({ ...newIntegration, type: e.target.value })
                }
                placeholder="e.g., lead_source"
              />
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={newIntegration.apiKey}
                onChange={(e) =>
                  setNewIntegration({ ...newIntegration, apiKey: e.target.value })
                }
                placeholder="Enter your API key"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white border-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddIntegration}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                Add Integration
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Integrations List */}
      <div className="space-y-4">
        {integrations.map((integration) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getStatusColor(integration.status)}`}>
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-400">{integration.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </span>
                </div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => handleToggleIntegration(integration.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteIntegration(integration.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
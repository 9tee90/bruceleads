'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Save, Loader2, Bell, Mail, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };
  enrichment: {
    autoEnrich: boolean;
    enrichmentProvider: string;
    enrichmentApiKey: string;
  };
  integrations: {
    slack: {
      enabled: boolean;
      webhookUrl: string;
    };
    crm: {
      enabled: boolean;
      provider: string;
      apiKey: string;
    };
  };
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const { data: _session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leadNotifications: true,
    weeklyDigest: false,
    triggerAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    minCompanySize: '51-200',
    targetIndustries: ['Software', 'Data Analytics', 'Cloud Computing'],
    minLeadScore: 75,
    autoEnrichment: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      // TODO: Show success toast
    } catch (error) {
      console.error('Error saving settings:', error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (section: keyof Settings, key: string, value: any) => {
    setSettings((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>Email Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailAlerts}
                  onChange={() => handleNotificationChange('emailAlerts')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>New Lead Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.leadNotifications}
                  onChange={() => handleNotificationChange('leadNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span>Weekly Performance Digest</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyDigest}
                  onChange={() => handleNotificationChange('weeklyDigest')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-500" />
                <span>AI Trigger Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.triggerAlerts}
                  onChange={() => handleNotificationChange('triggerAlerts')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Lead Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Company Size
              </label>
              <select
                value={preferences.minCompanySize}
                onChange={(e) => setPreferences(prev => ({ ...prev, minCompanySize: e.target.value }))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001+">1001+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Industries
              </label>
              <div className="space-y-2">
                {['Software', 'Data Analytics', 'Cloud Computing', 'Fintech', 'E-commerce'].map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.targetIndustries.includes(industry)}
                      onChange={(e) => {
                        setPreferences(prev => ({
                          ...prev,
                          targetIndustries: e.target.checked
                            ? [...prev.targetIndustries, industry]
                            : prev.targetIndustries.filter(i => i !== industry),
                        }));
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Lead Score
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.minLeadScore}
                onChange={(e) => setPreferences(prev => ({ ...prev, minLeadScore: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>Current: {preferences.minLeadScore}</span>
                <span>100</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Auto Data Enrichment</h3>
                <p className="text-sm text-gray-500">Automatically enrich lead data with AI</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.autoEnrichment}
                  onChange={(e) => setPreferences(prev => ({ ...prev, autoEnrichment: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Enrichment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Enrichment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-enrich new leads</label>
              <input
                type="checkbox"
                checked={settings.enrichment.autoEnrich}
                onChange={(e) => handleChange('enrichment', 'autoEnrich', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Enrichment Provider</label>
              <select
                value={settings.enrichment.enrichmentProvider}
                onChange={(e) => handleChange('enrichment', 'enrichmentProvider', e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
              >
                <option value="clearbit">Clearbit</option>
                <option value="zoominfo">ZoomInfo</option>
                <option value="apollo">Apollo</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <input
                type="password"
                value={settings.enrichment.enrichmentApiKey}
                onChange={(e) => handleChange('enrichment', 'enrichmentApiKey', e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                placeholder="Enter your API key"
              />
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Slack Integration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable Slack</label>
                <input
                  type="checkbox"
                  checked={settings.integrations.slack.enabled}
                  onChange={(e) =>
                    handleChange('integrations', 'slack', {
                      ...settings.integrations.slack,
                      enabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              {settings.integrations.slack.enabled && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webhook URL</label>
                  <input
                    type="text"
                    value={settings.integrations.slack.webhookUrl}
                    onChange={(e) =>
                      handleChange('integrations', 'slack', {
                        ...settings.integrations.slack,
                        webhookUrl: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                    placeholder="Enter Slack webhook URL"
                  />
                </div>
              )}
            </div>

            {/* CRM Integration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable CRM</label>
                <input
                  type="checkbox"
                  checked={settings.integrations.crm.enabled}
                  onChange={(e) =>
                    handleChange('integrations', 'crm', {
                      ...settings.integrations.crm,
                      enabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              {settings.integrations.crm.enabled && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CRM Provider</label>
                    <select
                      value={settings.integrations.crm.provider}
                      onChange={(e) =>
                        handleChange('integrations', 'crm', {
                          ...settings.integrations.crm,
                          provider: e.target.value,
                        })
                      }
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                    >
                      <option value="salesforce">Salesforce</option>
                      <option value="hubspot">HubSpot</option>
                      <option value="pipedrive">Pipedrive</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <input
                      type="password"
                      value={settings.integrations.crm.apiKey}
                      onChange={(e) =>
                        handleChange('integrations', 'crm', {
                          ...settings.integrations.crm,
                          apiKey: e.target.value,
                        })
                      }
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                      placeholder="Enter CRM API key"
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

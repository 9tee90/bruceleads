
'use client';

import { Shell } from '@/components/ui/Shell';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Lock,
  Key,
  Globe,
  Database,
  Zap,
  Mail,
  MessageSquare,
  Save,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useState } from 'react';

const sections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    fields: [
      { label: 'Full Name', type: 'text', value: 'John Doe' },
      { label: 'Email', type: 'email', value: 'john@example.com' },
      { label: 'Company', type: 'text', value: 'Acme Corp' },
      { label: 'Title', type: 'text', value: 'Sales Director' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    icon: Bell,
    settings: [
      {
        label: 'Email Notifications',
        description: 'Receive notifications via email',
        enabled: true,
      },
      {
        label: 'Browser Notifications',
        description: 'Show desktop notifications',
        enabled: false,
      },
      {
        label: 'Trigger Alerts',
        description: 'Get notified about new buying signals',
        enabled: true,
      },
      {
        label: 'Response Notifications',
        description: 'Get notified when prospects respond',
        enabled: true,
      },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: Zap,
    connections: [
      {
        name: 'LinkedIn Sales Navigator',
        status: 'connected',
        lastSync: '2 hours ago',
      },
      {
        name: 'Crunchbase',
        status: 'connected',
        lastSync: '1 day ago',
      },
      {
        name: 'Apollo',
        status: 'disconnected',
        lastSync: 'Never',
      },
      {
        name: 'Clearbit',
        status: 'connected',
        lastSync: '3 hours ago',
      },
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging Settings',
    icon: MessageSquare,
    settings: [
      {
        label: 'Email Templates',
        description: 'Manage your outreach templates',
        type: 'action',
        action: 'View Templates',
      },
      {
        label: 'LinkedIn Messages',
        description: 'Configure LinkedIn message settings',
        type: 'action',
        action: 'Configure',
      },
      {
        label: 'Follow-up Rules',
        description: 'Set up automated follow-up rules',
        type: 'action',
        action: 'Set Rules',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data Management',
    icon: Database,
    settings: [
      {
        label: 'Data Export',
        description: 'Export your data and reports',
        type: 'action',
        action: 'Export',
      },
      {
        label: 'Data Retention',
        description: 'Configure data retention policies',
        type: 'action',
        action: 'Configure',
      },
    ],
  },
];

interface FormState {
  [key: string]: {
    [key: string]: string | boolean;
  };
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [formState, setFormState] = useState<FormState>({});

  const handleInputChange = (sectionId: string, fieldLabel: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldLabel]: value,
      },
    }));
  };

  const handleSave = (sectionId: string) => {
    console.log('Saving section:', sectionId, formState[sectionId]);
    // TODO: Implement save functionality
  };

  const handleToggle = (sectionId: string, settingLabel: string) => {
    setFormState((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [settingLabel]: !prev[sectionId]?.[settingLabel],
      },
    }));
  };

  return (
    <Shell>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-gray-400" />
            Settings
          </h1>

          <div className="mt-8 grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <nav className="col-span-12 lg:col-span-3">
              <div className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          activeSection === section.id
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        }`}
                      />
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Main Content */}
            <main className="col-span-12 lg:col-span-9 space-y-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeSection === section.id ? 1 : 0,
                    y: activeSection === section.id ? 0 : 20,
                    display: activeSection === section.id ? 'block' : 'none',
                  }}
                >
                  {activeSection === section.id && (
                    <Card className="overflow-hidden">
                      <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">
                          {section.title}
                        </h2>

                        {/* Profile Fields */}
                        {section.fields && (
                          <div className="space-y-6">
                            {section.fields.map((field) => (
                              <div key={field.label}>
                                <Label htmlFor={field.label}>
                                  {field.label}
                                </Label>
                                <Input
                                  type={field.type}
                                  id={field.label}
                                  defaultValue={field.value}
                                  onChange={(e) =>
                                    handleInputChange(
                                      section.id,
                                      field.label,
                                      e.target.value
                                    )
                                  }
                                  className="mt-1"
                                />
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <Button
                                onClick={() => handleSave(section.id)}
                                className="flex items-center"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Notification Toggles */}
                        {section.settings && (
                          <div className="space-y-4">
                            {section.settings.map((setting) => (
                              <div
                                key={setting.label}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {setting.label}
                                  </h3>
                                  {setting.description && (
                                    <p className="text-sm text-gray-500">
                                      {setting.description}
                                    </p>
                                  )}
                                </div>
                                {'enabled' in setting ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggle(section.id, setting.label)
                                    }
                                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                      formState[section.id]?.[setting.label] ??
                                      setting.enabled
                                        ? 'bg-blue-600'
                                        : 'bg-gray-200'
                                    }`}
                                  >
                                    <span
                                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                        formState[section.id]?.[setting.label] ??
                                        setting.enabled
                                          ? 'translate-x-5'
                                          : 'translate-x-0'
                                      }`}
                                    />
                                  </button>
                                ) : (
                                  <Button variant="outline" size="sm">
                                    {setting.action}
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Integrations */}
                        {section.connections && (
                          <div className="space-y-4">
                            {section.connections.map((connection) => (
                              <div
                                key={connection.name}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {connection.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Last sync: {connection.lastSync}
                                  </p>
                                </div>
                                <Button
                                  variant={
                                    connection.status === 'connected'
                                      ? 'outline'
                                      : 'default'
                                  }
                                  size="sm"
                                >
                                  {connection.status === 'connected'
                                    ? 'Disconnect'
                                    : 'Connect'}
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </Shell>
  );
} 
'use client';

import { Shell } from '@/components/ui/Shell';
import { motion } from 'framer-motion';
import {
  Bell,
  TrendingUp,
  Users,
  Building2,
  Mail,
  Calendar,
  MessageSquare,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const notifications = [
  {
    id: 1,
    type: 'trigger',
    title: 'New Buying Signal Detected',
    description: 'Acme Corp has raised a $10M Series A round',
    time: '2 hours ago',
    priority: 'high',
    read: false,
    actions: [
      { label: 'View Company', action: 'view' },
      { label: 'Dismiss', action: 'dismiss' },
    ],
  },
  {
    id: 2,
    type: 'engagement',
    title: 'Email Response Received',
    description: 'John Smith from TechStart Inc replied to your outreach',
    time: '4 hours ago',
    priority: 'medium',
    read: false,
    actions: [
      { label: 'View Thread', action: 'view' },
      { label: 'Mark as Read', action: 'read' },
    ],
  },
  {
    id: 3,
    type: 'task',
    title: 'Follow-up Reminder',
    description: 'Schedule a demo with DataFlow Systems',
    time: '1 day ago',
    priority: 'medium',
    read: true,
    actions: [
      { label: 'Schedule Now', action: 'schedule' },
      { label: 'Snooze', action: 'snooze' },
    ],
  },
  {
    id: 4,
    type: 'alert',
    title: 'New Decision Maker Identified',
    description: 'New VP of Engineering joined CloudNine Solutions',
    time: '2 days ago',
    priority: 'low',
    read: true,
    actions: [
      { label: 'View Profile', action: 'view' },
      { label: 'Connect', action: 'connect' },
    ],
  },
];

const filters = [
  { name: 'All Notifications', value: 'all' },
  { name: 'Unread', value: 'unread' },
  { name: 'Triggers', value: 'trigger' },
  { name: 'Engagement', value: 'engagement' },
  { name: 'Tasks', value: 'task' },
  { name: 'Alerts', value: 'alert' },
];

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notificationState, setNotificationState] = useState(notifications);

  const handleAction = (notificationId: number, action: string) => {
    if (action === 'read' || action === 'dismiss') {
      setNotificationState(
        notificationState.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'trigger':
        return TrendingUp;
      case 'engagement':
        return MessageSquare;
      case 'task':
        return Calendar;
      case 'alert':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const filteredNotifications = notificationState.filter(
    (notification) =>
      selectedFilter === 'all' ||
      (selectedFilter === 'unread' && !notification.read) ||
      notification.type === selectedFilter
  );

  return (
    <Shell>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Bell className="h-6 w-6 mr-2 text-gray-400" />
              Notifications
            </h1>
            <Button
              variant="outline"
              onClick={() =>
                setNotificationState(
                  notificationState.map((n) => ({ ...n, read: true }))
                )
              }
            >
              Mark All as Read
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedFilter === filter.value
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {filter.name}
                {filter.value === 'unread' && (
                  <span className="ml-2 bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {notificationState.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="mt-6 space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card
                    className={`overflow-hidden transition-colors ${
                      !notification.read
                        ? 'bg-blue-50 border-blue-100'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 rounded-full p-2 ${
                            notification.priority === 'high'
                              ? 'bg-red-100'
                              : notification.priority === 'medium'
                              ? 'bg-yellow-100'
                              : 'bg-blue-100'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              notification.priority === 'high'
                                ? 'text-red-600'
                                : notification.priority === 'medium'
                                ? 'text-yellow-600'
                                : 'text-blue-600'
                            }`}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? 'text-blue-900'
                                  : 'text-gray-900'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                          <p
                            className={`mt-1 text-sm ${
                              !notification.read
                                ? 'text-blue-700'
                                : 'text-gray-600'
                            }`}
                          >
                            {notification.description}
                          </p>
                          <div className="mt-4 flex gap-2">
                            {notification.actions.map((action) => (
                              <Button
                                key={action.action}
                                variant={
                                  action.action === 'view'
                                    ? 'default'
                                    : 'outline'
                                }
                                size="sm"
                                onClick={() =>
                                  handleAction(notification.id, action.action)
                                }
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="ml-4 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You're all caught up! Check back later for new updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
} 
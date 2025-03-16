'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Target,
  Filter,
  RefreshCw,
  Settings,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface TriggerEvent {
  id: string;
  company: string;
  type: string;
  source: string;
  description: string;
  score: number;
  timestamp: string;
  signals: {
    type: string;
    value: string;
    score: number;
  }[];
  status: 'new' | 'reviewing' | 'actioned' | 'ignored';
}

export default function TriggersPage() {
  const [events, setEvents] = useState<TriggerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const fetchTriggers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/triggers');
      if (!response.ok) {
        throw new Error('Failed to fetch triggers');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch triggers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: TriggerEvent['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'reviewing': return 'bg-yellow-500';
      case 'actioned': return 'bg-green-500';
      case 'ignored': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleEventExpansion = (id: string) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const updateEventStatus = async (id: string, status: TriggerEvent['status']) => {
    try {
      const response = await fetch('/api/triggers', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setEvents(events.map(event => 
        event.id === id ? { ...event, status } : event
      ));
    } catch (err) {
      console.error('Failed to update trigger status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trigger Events</h1>
          <p className="text-gray-500">Monitor and score high-intent signals</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </Button>
          <Button onClick={fetchTriggers}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Triggers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter(e => e.status === 'new').length}
            </div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(events.reduce((acc, e) => acc + e.score, 0) / events.length)}
            </div>
            <p className="text-xs text-gray-500">+5 points from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((events.filter(e => e.status === 'actioned').length / events.length) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Of total triggers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-gray-500">To first action</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Triggers</CardTitle>
            <div className="flex gap-2">
              <Select>
                <option value="all">All Sources</option>
                <option value="crunchbase">Crunchbase</option>
                <option value="linkedin">LinkedIn</option>
                <option value="builtwith">BuiltWith</option>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-gray-200 hover:border-indigo-500/50 transition-all"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.company}</h3>
                          <Badge variant="outline">{event.type}</Badge>
                          <span className={`text-sm font-medium ${getScoreColor(event.score)}`}>
                            Score: {event.score}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-400">Source: {event.source}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)} text-white`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleEventExpansion(event.id)}
                        >
                          {expandedEvent === event.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(event.source, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedEvent === event.id && (
                    <div className="px-4 pb-4 border-t border-gray-100 mt-4 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Contributing Signals</h4>
                          <div className="space-y-2">
                            {event.signals.map((signal, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                              >
                                <div>
                                  <span className="text-sm font-medium capitalize">
                                    {signal.type.replace('_', ' ')}
                                  </span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    {signal.value}
                                  </span>
                                </div>
                                <span className={`text-sm font-medium ${getScoreColor(signal.score)}`}>
                                  +{signal.score} points
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Actions</h4>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={event.status === 'reviewing' ? 'default' : 'outline'}
                              onClick={() => updateEventStatus(event.id, 'reviewing')}
                            >
                              Mark as Reviewing
                            </Button>
                            <Button
                              size="sm"
                              variant={event.status === 'actioned' ? 'default' : 'outline'}
                              onClick={() => updateEventStatus(event.id, 'actioned')}
                            >
                              Mark as Actioned
                            </Button>
                            <Button
                              size="sm"
                              variant={event.status === 'ignored' ? 'default' : 'outline'}
                              onClick={() => updateEventStatus(event.id, 'ignored')}
                            >
                              Ignore
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 
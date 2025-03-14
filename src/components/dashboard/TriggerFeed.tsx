'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Zap, TrendingUp, Building2, Briefcase, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type TriggerEvent = {
  id: string;
  company: string;
  type: string;
  title: string;
  description: string;
  impact: string;
  timestamp: string;
  confidence: number;
  signals: string[];
  recommendedActions: Array<{
    type: string;
    template?: string;
    message?: string;
    subject?: string;
    priority: string;
  }>;
};

const getEventIcon = (type: string) => {
  switch (type) {
    case 'HIRING':
      return <Briefcase className="h-5 w-5" />;
    case 'TECH_STACK':
      return <Zap className="h-5 w-5" />;
    case 'EXPANSION':
      return <Building2 className="h-5 w-5" />;
    default:
      return <TrendingUp className="h-5 w-5" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'HIRING':
      return 'bg-purple-100 text-purple-800';
    case 'TECH_STACK':
      return 'bg-blue-100 text-blue-800';
    case 'EXPANSION':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function TriggerFeed() {
  const [events, setEvents] = useState<TriggerEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    // Refresh every 5 minutes
    const interval = setInterval(fetchEvents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/triggers');
      if (!response.ok) {
        throw new Error('Failed to fetch triggers');
      }
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error('Error fetching triggers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading triggers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{event.company}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={event.impact === 'HIGH' ? 'default' : 'secondary'}>
                        {event.impact}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {event.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-lg font-medium">{event.title}</p>
                  <p className="mt-1 text-gray-600">{event.description}</p>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-500">Supporting Signals:</h4>
                    <ul className="mt-1 space-y-1">
                      {event.signals.map((signal, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {signal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {event.recommendedActions && event.recommendedActions.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Recommended Action:</h4>
                        <div className="flex gap-2">
                          {event.recommendedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              {action.type === 'EMAIL' ? (
                                <Mail className="h-4 w-4" />
                              ) : (
                                <MessageSquare className="h-4 w-4" />
                              )}
                              {action.type === 'EMAIL' ? 'Send Email' : 'Send Message'}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 
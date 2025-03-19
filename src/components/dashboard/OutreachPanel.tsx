import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Linkedin,
  Phone,
  MessageSquare,
  Calendar,
  Brain,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Plus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';

interface OutreachTemplate {
  id: string;
  name: string;
  channel: 'email' | 'linkedin' | 'call';
  content: string;
  variables: string[];
  aiEnhanced: boolean;
  performance: {
    sent: number;
    opened?: number;
    replied?: number;
    connected?: number;
    meetings?: number;
  };
}

interface Sequence {
  id: string;
  name: string;
  steps: {
    id: string;
    channel: 'email' | 'linkedin' | 'call';
    template: string;
    delay: number;
    condition?: string;
  }[];
  active: boolean;
  stats: {
    active: number;
    completed: number;
    meetings: number;
  };
}

const templates: OutreachTemplate[] = [
  {
    id: '1',
    name: 'AI Growth Intent',
    channel: 'email',
    content: 'Hi {{firstName}},\n\nI noticed {{company}} is scaling rapidly with your recent {{triggerEvent}}. Many companies at this stage are looking to optimize their sales processes.\n\nWould you be open to a quick chat about how Bruce can help accelerate your growth?\n\nBest,\n{{userName}}',
    variables: ['firstName', 'company', 'triggerEvent', 'userName'],
    aiEnhanced: true,
    performance: {
      sent: 245,
      opened: 156,
      replied: 42
    }
  },
  {
    id: '2',
    name: 'Tech Stack Change',
    channel: 'linkedin',
    content: "Hi {{firstName}}, I saw that {{company}} is investing in {{technology}}. I'd love to share how other companies have optimized their sales stack during similar transitions. Would you be open to connecting?",
    variables: ['firstName', 'company', 'technology'],
    aiEnhanced: true,
    performance: {
      sent: 178,
      connected: 92,
      meetings: 34
    }
  },
  {
    id: '3',
    name: 'Funding Congratulations',
    channel: 'email',
    content: "Hi {{firstName}},\n\nCongratulations on {{company}}'s {{fundingRound}}! As you scale your sales team, I thought you might be interested in learning how Bruce's AI can help optimize your outreach.\n\nWould you be open to a quick demo?\n\nBest,\n{{userName}}",
    variables: ['firstName', 'company', 'fundingRound', 'userName'],
    aiEnhanced: true,
    performance: {
      sent: 156,
      opened: 98,
      replied: 37
    }
  }
];

const sequences: Sequence[] = [
  {
    id: '1',
    name: 'High Intent Multi-Channel',
    steps: [
      {
        id: '1',
        channel: 'email',
        template: '1',
        delay: 0
      },
      {
        id: '2',
        channel: 'linkedin',
        template: '2',
        delay: 2,
        condition: 'if_no_reply'
      },
      {
        id: '3',
        channel: 'email',
        template: '3',
        delay: 4,
        condition: 'if_no_reply'
      }
    ],
    active: true,
    stats: {
      active: 45,
      completed: 156,
      meetings: 28
    }
  }
];

export default function OutreachPanel() {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<OutreachTemplate>>({
    channel: 'email',
    aiEnhanced: true,
    variables: []
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'linkedin':
        return 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400';
      case 'call':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Intelligent Outreach</h2>
          <p className="text-gray-500 dark:text-gray-400">
            AI-powered templates and multi-channel sequences
          </p>
        </div>
        <Button
          onClick={() => setIsCreatingTemplate(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Templates Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Message Templates</h3>
          <AnimatePresence>
            {templates.map(template => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getChannelColor(template.channel)}`}>
                          {getChannelIcon(template.channel)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {template.channel}
                            </Badge>
                            {template.aiEnhanced && (
                              <Badge
                                variant="outline"
                                className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 text-xs"
                              >
                                AI Enhanced
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTemplate(template.id === activeTemplate ? null : template.id)}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          template.id === activeTemplate ? 'transform rotate-180' : ''
                        }`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {template.id === activeTemplate && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                              <pre className="text-sm whitespace-pre-wrap font-mono">
                                {template.content}
                              </pre>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {template.variables.map(variable => (
                                <Badge key={variable} variant="outline">
                                  {`{{${variable}}}`}
                                </Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              {Object.entries(template.performance).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <div className="text-2xl font-semibold">{value}</div>
                                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sequences Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Multi-Channel Sequences</h3>
          {sequences.map(sequence => (
            <Card key={sequence.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{sequence.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{sequence.steps.length} steps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-500">{sequence.stats.completed} completed</span>
                      </div>
                    </div>
                  </div>
                  <Switch checked={sequence.active} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sequence.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className={`p-2 rounded-lg ${getChannelColor(step.channel)}`}>
                        {getChannelIcon(step.channel)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Step {index + 1}</span>
                          {step.condition && (
                            <Badge variant="outline" className="text-xs">
                              {step.condition}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {step.delay === 0 ? 'Immediately' : `After ${step.delay} days`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Template Modal */}
      <AnimatePresence>
        {isCreatingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Create Template</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreatingTemplate(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Template Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter template name"
                      value={newTemplate.name || ''}
                      onChange={e => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Channel</label>
                    <Select
                      value={newTemplate.channel}
                      onValueChange={value => setNewTemplate(prev => ({ ...prev, channel: value as OutreachTemplate['channel'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Message Content</label>
                    <Textarea
                      value={newTemplate.content || ''}
                      onChange={e => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter your message content..."
                      className="min-h-[200px] font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newTemplate.aiEnhanced}
                        onCheckedChange={checked => setNewTemplate(prev => ({ ...prev, aiEnhanced: checked }))}
                      />
                      <label className="text-sm font-medium">Enable AI Enhancement</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreatingTemplate(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // Handle save template
                    setIsCreatingTemplate(false);
                  }}>
                    <Send className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
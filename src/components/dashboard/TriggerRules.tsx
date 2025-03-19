import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Settings, Zap, Brain, Target, ArrowRight, Save, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';
import { Badge } from '@/components/ui/Badge';

interface TriggerRule {
  id: string;
  name: string;
  type: 'hiring' | 'funding' | 'technology' | 'growth' | 'custom';
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  score: number;
  isActive: boolean;
  aiEnhanced: boolean;
}

const defaultRules: TriggerRule[] = [
  {
    id: '1',
    name: 'High-Growth Hiring',
    type: 'hiring',
    conditions: [
      { field: 'job_posts', operator: 'greater_than', value: '5' },
      { field: 'department', operator: 'equals', value: 'sales' }
    ],
    score: 85,
    isActive: true,
    aiEnhanced: true
  },
  {
    id: '2',
    name: 'Series B+ Funding',
    type: 'funding',
    conditions: [
      { field: 'funding_round', operator: 'equals', value: 'Series B' },
      { field: 'amount', operator: 'greater_than', value: '10000000' }
    ],
    score: 90,
    isActive: true,
    aiEnhanced: true
  },
  {
    id: '3',
    name: 'Tech Stack Change',
    type: 'technology',
    conditions: [
      { field: 'tech_change', operator: 'contains', value: 'cloud migration' }
    ],
    score: 75,
    isActive: true,
    aiEnhanced: true
  }
];

export default function TriggerRules() {
  const [rules, setRules] = useState<TriggerRule[]>(defaultRules);
  const [isCreating, setIsCreating] = useState(false);
  const [newRule, setNewRule] = useState<Partial<TriggerRule>>({
    type: 'custom',
    conditions: [],
    score: 50,
    isActive: true,
    aiEnhanced: true
  });

  const handleAddCondition = () => {
    setNewRule(prev => ({
      ...prev,
      conditions: [...(prev.conditions || []), { field: '', operator: '', value: '' }]
    }));
  };

  const handleRemoveCondition = (index: number) => {
    setNewRule(prev => ({
      ...prev,
      conditions: prev.conditions?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSaveRule = () => {
    if (newRule.name && newRule.type) {
      setRules(prev => [...prev, { ...newRule, id: Date.now().toString() } as TriggerRule]);
      setIsCreating(false);
      setNewRule({
        type: 'custom',
        conditions: [],
        score: 50,
        isActive: true,
        aiEnhanced: true
      });
    }
  };

  const handleToggleRule = (id: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Adaptive Intent Rules</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Configure and manage your intent detection rules
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </Button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Create New Rule</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Name</label>
                  <Input
                    value={newRule.name || ''}
                    onChange={e => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter rule name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Type</label>
                  <Select
                    value={newRule.type}
                    onValueChange={value => setNewRule(prev => ({ ...prev, type: value as TriggerRule['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hiring">Hiring Intent</SelectItem>
                      <SelectItem value="funding">Funding Events</SelectItem>
                      <SelectItem value="technology">Technology Changes</SelectItem>
                      <SelectItem value="growth">Growth Signals</SelectItem>
                      <SelectItem value="custom">Custom Rule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Conditions</label>
                <div className="space-y-3">
                  {newRule.conditions?.map((condition, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <Select
                        value={condition.field}
                        onValueChange={value => {
                          const newConditions = [...(newRule.conditions || [])];
                          newConditions[index].field = value;
                          setNewRule(prev => ({ ...prev, conditions: newConditions }));
                        }}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="job_posts">Job Posts</SelectItem>
                          <SelectItem value="funding_round">Funding Round</SelectItem>
                          <SelectItem value="tech_stack">Tech Stack</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="employees">Employee Count</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={condition.operator}
                        onValueChange={value => {
                          const newConditions = [...(newRule.conditions || [])];
                          newConditions[index].operator = value;
                          setNewRule(prev => ({ ...prev, conditions: newConditions }));
                        }}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={condition.value}
                        onChange={e => {
                          const newConditions = [...(newRule.conditions || [])];
                          newConditions[index].value = e.target.value;
                          setNewRule(prev => ({ ...prev, conditions: newConditions }));
                        }}
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCondition(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCondition}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Intent Score Threshold</label>
                  <Slider
                    value={[newRule.score || 50]}
                    onValueChange={([value]) => setNewRule(prev => ({ ...prev, score: value }))}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newRule.aiEnhanced}
                      onCheckedChange={checked => setNewRule(prev => ({ ...prev, aiEnhanced: checked }))}
                    />
                    <label className="text-sm font-medium">Enable AI Enhancement</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRule}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Rule
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {rules.map(rule => (
          <Card key={rule.id} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    rule.type === 'hiring' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    rule.type === 'funding' ? 'bg-green-100 dark:bg-green-900/20' :
                    rule.type === 'technology' ? 'bg-purple-100 dark:bg-purple-900/20' :
                    'bg-gray-100 dark:bg-gray-800/20'
                  }`}>
                    {rule.type === 'hiring' ? <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                     rule.type === 'funding' ? <Target className="w-5 h-5 text-green-600 dark:text-green-400" /> :
                     rule.type === 'technology' ? <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" /> :
                     <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                      </Badge>
                      {rule.aiEnhanced && (
                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 text-xs">
                          AI Enhanced
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => handleToggleRule(rule.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Conditions:
                  <ul className="mt-1 space-y-1">
                    {rule.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        <span>{condition.field.replace('_', ' ')} {condition.operator.replace('_', ' ')} {condition.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Intent Score Threshold:</span>
                  <Badge variant="outline" className={`
                    ${rule.score >= 80 ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      rule.score >= 50 ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'}
                  `}>
                    {rule.score}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
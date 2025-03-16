'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Save, Loader2, Bell, Target, Zap, Filter, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface TriggerRule {
  id: string;
  name: string;
  type: string;
  source: string;
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  score: number;
  enabled: boolean;
}

interface ScoringWeight {
  factor: string;
  weight: number;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [triggerRules, setTriggerRules] = useState<TriggerRule[]>([
    {
      id: '1',
      name: 'Funding Round',
      type: 'company_event',
      source: 'crunchbase',
      conditions: [
        { field: 'funding_amount', operator: '>=', value: '1000000' },
        { field: 'funding_round', operator: 'in', value: 'Series A,Series B,Series C' }
      ],
      score: 85,
      enabled: true
    },
    {
      id: '2',
      name: 'Tech Stack Change',
      type: 'technology',
      source: 'builtwith',
      conditions: [
        { field: 'technology_added', operator: 'in', value: 'Kubernetes,Docker,AWS' },
        { field: 'company_size', operator: '>=', value: '50' }
      ],
      score: 75,
      enabled: true
    }
  ]);

  const [scoringWeights, setScoringWeights] = useState<ScoringWeight[]>([
    { factor: 'Company Size', weight: 0.3 },
    { factor: 'Industry Match', weight: 0.2 },
    { factor: 'Technology Fit', weight: 0.25 },
    { factor: 'Growth Signals', weight: 0.25 }
  ]);

  const [integrations, setIntegrations] = useState({
    crunchbase: { enabled: true, apiKey: 'demo-key' },
    clearbit: { enabled: true, apiKey: 'demo-key' },
    builtwith: { enabled: true, apiKey: 'demo-key' },
    hunter: { enabled: false, apiKey: '' }
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // In a real implementation, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Settings saved',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addTriggerRule = () => {
    const newRule: TriggerRule = {
      id: Date.now().toString(),
      name: 'New Rule',
      type: 'company_event',
      source: 'crunchbase',
      conditions: [{ field: '', operator: '=', value: '' }],
      score: 50,
      enabled: true
    };
    setTriggerRules([...triggerRules, newRule]);
  };

  const deleteTriggerRule = (id: string) => {
    setTriggerRules(triggerRules.filter(rule => rule.id !== id));
  };

  const updateTriggerRule = (id: string, updates: Partial<TriggerRule>) => {
    setTriggerRules(triggerRules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  return (
    <div className="space-y-6 p-6">
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
        {/* Trigger Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Trigger Rules
              </CardTitle>
              <Button onClick={addTriggerRule} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {triggerRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <Input
                          value={rule.name}
                          onChange={(e) => updateTriggerRule(rule.id, { name: e.target.value })}
                          className="font-medium"
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{rule.source}</Badge>
                          <Badge variant="outline">{rule.type}</Badge>
                          <Badge variant="outline">Score: {rule.score}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(enabled) => updateTriggerRule(rule.id, { enabled })}
                        />
                        <Button
                          variant="ghost"
                          className="w-8 h-8 p-0"
                          onClick={() => deleteTriggerRule(rule.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {rule.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            defaultValue={condition.field}
                            onValueChange={(value) => {
                              const newConditions = [...rule.conditions];
                              newConditions[index].field = value;
                              updateTriggerRule(rule.id, { conditions: newConditions });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="funding_amount">Funding Amount</SelectItem>
                              <SelectItem value="funding_round">Funding Round</SelectItem>
                              <SelectItem value="technology_added">Technology Added</SelectItem>
                              <SelectItem value="company_size">Company Size</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            defaultValue={condition.operator}
                            onValueChange={(value) => {
                              const newConditions = [...rule.conditions];
                              newConditions[index].operator = value;
                              updateTriggerRule(rule.id, { conditions: newConditions });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="=">=</SelectItem>
                              <SelectItem value=">=">&gt;=</SelectItem>
                              <SelectItem value="<=">&lt;=</SelectItem>
                              <SelectItem value="in">in</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={condition.value}
                            onChange={(e) => {
                              const newConditions = [...rule.conditions];
                              newConditions[index].value = e.target.value;
                              updateTriggerRule(rule.id, { conditions: newConditions });
                            }}
                            placeholder="Value"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Scoring Weights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Scoring Weights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoringWeights.map((weight, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium">{weight.factor}</label>
                    <Input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={weight.weight}
                      onChange={(e) => {
                        const newWeights = [...scoringWeights];
                        newWeights[index].weight = parseFloat(e.target.value);
                        setScoringWeights(newWeights);
                      }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    {(weight.weight * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Sources & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Data Sources & Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(integrations).map(([name, config]) => (
                <div key={name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium capitalize">{name}</h4>
                    <p className="text-sm text-gray-500">API Key: {config.apiKey ? '••••••••' : 'Not configured'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="password"
                      value={config.apiKey}
                      onChange={(e) => setIntegrations({
                        ...integrations,
                        [name]: { ...config, apiKey: e.target.value }
                      })}
                      placeholder="Enter API Key"
                      className="w-64"
                    />
                    <Switch
                      checked={config.enabled}
                      onCheckedChange={(enabled) => setIntegrations({
                        ...integrations,
                        [name]: { ...config, enabled }
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Settings,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  AlertTriangle,
  Target,
  Zap,
  Scale,
  Filter,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/use-toast';
import { RuleDialog } from '@/components/rules/RuleDialog';
import { WeightDialog } from '@/components/rules/WeightDialog';

interface TriggerRule {
  id: string;
  name: string;
  description: string;
  type: 'funding' | 'tech_stack' | 'leadership' | 'growth' | 'custom';
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  score: number;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

interface ScoringWeight {
  id: string;
  category: string;
  description: string;
  weight: number;
  factors: {
    name: string;
    weight: number;
  }[];
}

export default function RulesPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<TriggerRule[]>([]);
  const [weights, setWeights] = useState<ScoringWeight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [expandedWeight, setExpandedWeight] = useState<string | null>(null);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<TriggerRule | undefined>(undefined);
  const [selectedWeight, setSelectedWeight] = useState<ScoringWeight | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rules');
      if (!response.ok) {
        throw new Error('Failed to fetch rules');
      }
      const data = await response.json();
      setRules(data.rules);
      setWeights(data.weights);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rules');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveRule = async (data: Omit<TriggerRule, 'id' | 'lastUpdated'>) => {
    try {
      const response = await fetch('/api/rules', {
        method: selectedRule ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rule',
          data: selectedRule ? { ...data, id: selectedRule.id } : data,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${selectedRule ? 'update' : 'create'} rule`);
      }
      fetchData(); // Refresh data
    } catch (err) {
      throw err;
    }
  };

  const handleSaveWeight = async (data: Omit<ScoringWeight, 'id'>) => {
    try {
      const response = await fetch('/api/rules', {
        method: selectedWeight ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'weight',
          data: selectedWeight ? { ...data, id: selectedWeight.id } : data,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${selectedWeight ? 'update' : 'create'} weight`);
      }
      fetchData(); // Refresh data
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      const response = await fetch(`/api/rules?id=${id}&type=rule`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete rule');
      }
      toast({
        title: 'Success',
        description: 'Rule deleted successfully',
      });
      fetchData(); // Refresh data
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete rule',
      });
    }
  };

  const handleDeleteWeight = async (id: string) => {
    try {
      const response = await fetch(`/api/rules?id=${id}&type=weight`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete weight');
      }
      toast({
        title: 'Success',
        description: 'Weight deleted successfully',
      });
      fetchData(); // Refresh data
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete weight',
      });
    }
  };

  const toggleRuleExpansion = (id: string) => {
    setExpandedRule(expandedRule === id ? null : id);
  };

  const toggleWeightExpansion = (id: string) => {
    setExpandedWeight(expandedWeight === id ? null : id);
  };

  const getTypeColor = (type: TriggerRule['type']) => {
    switch (type) {
      case 'funding': return 'text-green-500';
      case 'tech_stack': return 'text-blue-500';
      case 'leadership': return 'text-purple-500';
      case 'growth': return 'text-yellow-500';
      case 'custom': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: TriggerRule['type']) => {
    switch (type) {
      case 'funding': return <Scale className="h-4 w-4" />;
      case 'tech_stack': return <Zap className="h-4 w-4" />;
      case 'leadership': return <Target className="h-4 w-4" />;
      case 'growth': return <RefreshCw className="h-4 w-4" />;
      case 'custom': return <Filter className="h-4 w-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold">Error Loading Rules</h2>
        <p className="text-gray-500">{error}</p>
        <Button onClick={fetchData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rules & Scoring</h1>
          <p className="text-gray-500">Configure trigger rules and lead scoring weights</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button onClick={() => {
            setSelectedRule(undefined);
            setRuleDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rules.filter(r => r.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500">Trigger rules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(rules.reduce((acc, r) => acc + r.score, 0) / rules.length)}
            </div>
            <p className="text-xs text-gray-500">Across all rules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
            <Scale className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weights.reduce((acc, w) => acc + w.weight, 0)}%
            </div>
            <p className="text-xs text-gray-500">Score weights</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Factors</CardTitle>
            <Filter className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weights.reduce((acc, w) => acc + w.factors.length, 0)}
            </div>
            <p className="text-xs text-gray-500">Scoring factors</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Trigger Rules</TabsTrigger>
          <TabsTrigger value="weights">Score Weights</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Active Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border p-4 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{rule.name}</h3>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getTypeIcon(rule.type)}
                              <span className={getTypeColor(rule.type)}>{rule.type}</span>
                            </Badge>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${rule.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                              {rule.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => toggleRuleExpansion(rule.id)}
                          >
                            {expandedRule === rule.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => {
                              setSelectedRule(rule);
                              setRuleDialogOpen(true);
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedRule === rule.id && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Conditions</h4>
                            <div className="space-y-2">
                              {rule.conditions.map((condition, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                >
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                      {condition.field}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                      {condition.operator}
                                    </span>
                                    <Badge variant="outline">
                                      {condition.value}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Score Impact</h4>
                              <p className="text-sm text-gray-500">
                                This rule adds {rule.score} points to the lead score
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteRule(rule.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Rule
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weights">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Score Weights</CardTitle>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedWeight(undefined);
                  setWeightDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Weight
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {weights.map((weight) => (
                    <motion.div
                      key={weight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border p-4 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{weight.category}</h3>
                            <Badge variant="outline">
                              {weight.weight}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{weight.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => toggleWeightExpansion(weight.id)}
                          >
                            {expandedWeight === weight.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => {
                              setSelectedWeight(weight);
                              setWeightDialogOpen(true);
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedWeight === weight.id && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Factors</h4>
                            <div className="space-y-2">
                              {weight.factors.map((factor, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                >
                                  <span className="text-sm font-medium">
                                    {factor.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                      {factor.weight}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteWeight(weight.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Weight
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RuleDialog
        open={ruleDialogOpen}
        onOpenChange={setRuleDialogOpen}
        initialData={selectedRule}
        onSave={handleSaveRule}
      />

      <WeightDialog
        open={weightDialogOpen}
        onOpenChange={setWeightDialogOpen}
        initialData={selectedWeight}
        onSave={handleSaveWeight}
      />
    </div>
  );
} 
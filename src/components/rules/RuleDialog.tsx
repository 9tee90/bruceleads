'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { RuleForm } from './RuleForm';
import { useToast } from '@/components/ui/use-toast';

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

interface RuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: TriggerRule;
  onSave: (data: Omit<TriggerRule, 'id' | 'lastUpdated'>) => Promise<void>;
}

export function RuleDialog({ open, onOpenChange, initialData, onSave }: RuleDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data: Omit<TriggerRule, 'id' | 'lastUpdated'>) => {
    try {
      setLoading(true);
      await onSave(data);
      onOpenChange(false);
      toast({
        title: 'Success',
        description: `Rule ${initialData ? 'updated' : 'created'} successfully`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} rule`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Rule' : 'Create New Rule'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update the trigger rule settings below.'
              : 'Configure a new trigger rule to score leads based on specific criteria.'}
          </DialogDescription>
        </DialogHeader>
        <RuleForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 
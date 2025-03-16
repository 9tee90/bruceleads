'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { WeightForm } from './WeightForm';
import { useToast } from '@/components/ui/use-toast';

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

interface WeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ScoringWeight;
  onSave: (data: Omit<ScoringWeight, 'id'>) => Promise<void>;
}

export function WeightDialog({ open, onOpenChange, initialData, onSave }: WeightDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data: Omit<ScoringWeight, 'id'>) => {
    try {
      setLoading(true);
      await onSave(data);
      onOpenChange(false);
      toast({
        title: 'Success',
        description: `Weight ${initialData ? 'updated' : 'created'} successfully`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} weight`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Weight' : 'Create New Weight'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update the scoring weight settings below.'
              : 'Configure a new scoring weight to calculate lead scores based on specific factors.'}
          </DialogDescription>
        </DialogHeader>
        <WeightForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 
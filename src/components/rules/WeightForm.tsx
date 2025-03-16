'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trash2, Plus } from 'lucide-react';

const weightSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  weight: z.number().min(0).max(100),
  factors: z.array(z.object({
    name: z.string().min(1, 'Factor name is required'),
    weight: z.number().min(0).max(100),
  })).min(1, 'At least one factor is required'),
});

type WeightFormValues = z.infer<typeof weightSchema>;

interface WeightFormProps {
  initialData?: WeightFormValues;
  onSubmit: (data: WeightFormValues) => void;
  onCancel: () => void;
}

export function WeightForm({ initialData, onSubmit, onCancel }: WeightFormProps) {
  const form = useForm<WeightFormValues>({
    resolver: zodResolver(weightSchema),
    defaultValues: initialData || {
      category: '',
      description: '',
      weight: 0,
      factors: [{ name: '', weight: 0 }],
    },
  });

  const addFactor = () => {
    const factors = form.getValues('factors');
    form.setValue('factors', [...factors, { name: '', weight: 0 }]);
  };

  const removeFactor = (index: number) => {
    const factors = form.getValues('factors');
    form.setValue('factors', factors.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter category description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Total weight for this category (0-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Factors</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFactor}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Factor
            </Button>
          </div>

          {form.watch('factors').map((factor, index) => (
            <div key={index} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name={`factors.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Factor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`factors.${index}.weight`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          className="w-20"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => removeFactor(index)}
                disabled={form.watch('factors').length === 1}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Weight' : 'Create Weight'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  X,
  DollarSign,
  Users,
  Code,
  Target,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const filterCategories = [
  {
    id: 'funding',
    label: 'Funding',
    icon: DollarSign,
    options: [
      { label: 'Recently Funded', value: 'recent_funding' },
      { label: 'Series A', value: 'series_a' },
      { label: 'Series B', value: 'series_b' },
      { label: 'Series C+', value: 'series_c' },
    ],
  },
  {
    id: 'hiring',
    label: 'Hiring',
    icon: Users,
    options: [
      { label: 'Active Hiring', value: 'active_hiring' },
      { label: 'Engineering Roles', value: 'engineering' },
      { label: 'Sales Roles', value: 'sales' },
      { label: 'Marketing Roles', value: 'marketing' },
    ],
  },
  {
    id: 'tech',
    label: 'Tech Stack',
    icon: Code,
    options: [
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'Python', value: 'python' },
      { label: 'AWS', value: 'aws' },
    ],
  },
  {
    id: 'intent',
    label: 'Intent Score',
    icon: Target,
    options: [
      { label: 'High Intent (80+)', value: 'high' },
      { label: 'Medium Intent (60-79)', value: 'medium' },
      { label: 'Low Intent (<60)', value: 'low' },
    ],
  },
];

export default function LeadFilters() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const getActiveFiltersCount = () => {
    return activeFilters.length;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {filterCategories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          const Icon = category.icon;
          const activeOptions = activeFilters.filter((filter) =>
            category.options.some((opt) => opt.value === filter)
          );

          return (
            <div key={category.id} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-400" />
                  {category.label}
                  {activeOptions.length > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {activeOptions.length}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 space-y-1">
                      {category.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleFilter(option.value)}
                          className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                            activeFilters.includes(option.value)
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => {
              const category = filterCategories.find((cat) =>
                cat.options.some((opt) => opt.value === filter)
              );
              const option = category?.options.find((opt) => opt.value === filter);

              return (
                <div
                  key={filter}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {option?.label}
                  <button
                    onClick={() => toggleFilter(filter)}
                    className="ml-1.5 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 
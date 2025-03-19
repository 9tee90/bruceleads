import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BulkAction {
  id: string;
  label: string;
  icon: any;
  description: string;
  action: (leads: number[]) => void;
}

const actions: BulkAction[] = [
  {
    id: 'email',
    label: 'Send Email',
    icon: Mail,
    description: 'Send an email to selected leads',
    action: (leads) => console.log('Sending email to leads:', leads),
  },
  {
    id: 'linkedin',
    label: 'Send LinkedIn Message',
    icon: Linkedin,
    description: 'Send a LinkedIn message to selected leads',
    action: (leads) => console.log('Sending LinkedIn message to leads:', leads),
  },
  {
    id: 'meeting',
    label: 'Schedule Meeting',
    icon: Calendar,
    description: 'Schedule a meeting with selected leads',
    action: (leads) => console.log('Scheduling meeting with leads:', leads),
  },
  {
    id: 'assign',
    label: 'Assign to Team',
    icon: Users,
    description: 'Assign selected leads to team members',
    action: (leads) => console.log('Assigning leads to team:', leads),
  },
];

interface BulkActionsProps {
  selectedLeads: number[];
}

export default function BulkActions({ selectedLeads }: BulkActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAction = (action: BulkAction) => {
    action.action(selectedLeads);
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 hover:bg-blue-500 text-white"
      >
        Actions ({selectedLeads.length})
        {isExpanded ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4 mr-3 text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
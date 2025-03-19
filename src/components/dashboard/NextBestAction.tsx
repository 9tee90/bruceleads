import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Calendar,
  ArrowRight,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Action {
  type: 'email' | 'linkedin' | 'meeting';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  template: string;
}

interface NextBestActionProps {
  action: Action;
}

export default function NextBestAction({ action }: NextBestActionProps) {
  const getActionIcon = () => {
    switch (action.type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-500" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (action.priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 rounded-lg p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {getActionIcon()}
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              {action.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">{action.description}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Due {new Date(action.dueDate).toLocaleDateString()}
              </div>
              <div
                className={`inline-flex items-center px-2 py-0.5 rounded-full ${getPriorityColor()}`}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            Use Template
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            Take Action
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 
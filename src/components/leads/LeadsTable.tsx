import { useRouter } from 'next/navigation';
import { MoreHorizontal, ArrowUpDown, ChevronDown, Loader2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  status: string;
  source: string;
  score: number;
  createdAt: string;
  lastContactedAt: string | null;
  companyData?: {
    industry?: string;
    size?: string;
    location?: string;
  };
  triggerEvents?: Array<{
    type: string;
    title: string;
    description: string;
    impact: string;
    confidence: number;
    timestamp: string;
    signals: string[];
  }>;
  recommendedActions?: Array<{
    type: string;
    template?: string;
    message?: string;
    subject?: string;
    priority: string;
  }>;
}

interface LeadsTableProps {
  leads: Lead[];
  isLoading?: boolean;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export function LeadsTable({
  leads,
  isLoading,
  onSort,
  sortField,
  sortDirection,
}: LeadsTableProps) {
  const router = useRouter();

  const handleSort = (field: string) => {
    if (onSort) {
      const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(field, direction);
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('name')}
              className="flex items-center font-semibold"
            >
              Name
              {renderSortIcon('name')}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('company')}
              className="flex items-center font-semibold"
            >
              Company
              {renderSortIcon('company')}
            </Button>
          </TableHead>
          <TableHead>Latest Trigger</TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('score')}
              className="flex items-center font-semibold"
            >
              Score
              {renderSortIcon('score')}
            </Button>
          </TableHead>
          <TableHead>Recommended Action</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow
            key={lead.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => router.push(`/leads/${lead.id}`)}
          >
            <TableCell>
              <div>
                <div className="font-medium">{lead.name}</div>
                <div className="text-sm text-muted-foreground">{lead.title}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{lead.company}</div>
                <div className="text-sm text-muted-foreground">
                  {lead.companyData?.industry || 'Unknown Industry'}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {lead.triggerEvents && lead.triggerEvents[0] ? (
                <div>
                  <div className="font-medium">{lead.triggerEvents[0].title}</div>
                  <div className="text-sm text-muted-foreground">
                    {lead.triggerEvents[0].description}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      lead.triggerEvents[0].impact === 'HIGH'
                        ? 'bg-green-100 text-green-800'
                        : lead.triggerEvents[0].impact === 'MEDIUM'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.triggerEvents[0].impact}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lead.triggerEvents[0].confidence}% confidence
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No recent triggers</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    lead.score >= 80
                      ? 'bg-green-400'
                      : lead.score >= 50
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}
                />
                <span className="ml-2">{lead.score}</span>
              </div>
            </TableCell>
            <TableCell>
              {lead.recommendedActions && lead.recommendedActions[0] ? (
                <div>
                  <div className="flex items-center gap-2">
                    {lead.recommendedActions[0].type === 'EMAIL' ? (
                      <Mail className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      lead.recommendedActions[0].priority === 'HIGH'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {lead.recommendedActions[0].priority}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {lead.recommendedActions[0].subject || 'Send personalized message'}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No actions needed</span>
              )}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {leads.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No leads found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

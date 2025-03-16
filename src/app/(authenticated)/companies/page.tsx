"use client";

import { useState } from "react";
import { 
  Search,
  Filter,
  Building2,
  Globe,
  Users,
  Briefcase,
  ChevronRight,
  Plus
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  industry: string;
  size: string;
  location: string;
  lastActivity?: string;
  status?: "researching" | "contacted" | "engaged" | "customer";
}

const SAMPLE_COMPANIES: Company[] = [
  {
    id: "1",
    name: "TechStart Inc",
    description: "AI-powered developer tools platform",
    website: "techstart.ai",
    industry: "Developer Tools",
    size: "50-100",
    location: "San Francisco, CA",
    lastActivity: "2 days ago",
    status: "researching"
  },
  {
    id: "2",
    name: "DataFlow Systems",
    description: "Enterprise data integration platform",
    website: "dataflow.io",
    industry: "Data Infrastructure",
    size: "100-250",
    location: "Boston, MA",
    lastActivity: "5 days ago",
    status: "contacted"
  },
  {
    id: "3",
    name: "CloudScale",
    description: "Cloud infrastructure automation",
    website: "cloudscale.com",
    industry: "Cloud Infrastructure",
    size: "250-500",
    location: "Seattle, WA",
    lastActivity: "1 week ago",
    status: "engaged"
  }
];

const statusColors = {
  researching: "bg-blue-50 text-blue-700",
  contacted: "bg-yellow-50 text-yellow-700",
  engaged: "bg-green-50 text-green-700",
  customer: "bg-purple-50 text-purple-700"
};

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredCompanies = SAMPLE_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(company.industry);

    const matchesSize = selectedSizes.length === 0 ||
      selectedSizes.includes(company.size);

    return matchesSearch && matchesIndustry && matchesSize;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Company Database
          </h1>
          <p className="text-gray-500 mt-1">
            Search and manage your target companies
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredCompanies.map((company) => (
          <Card
            key={company.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gray-100">
                <Building2 className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {company.name}
                      {company.status && (
                        <Badge
                          variant="outline"
                          className={statusColors[company.status]}
                        >
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {company.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Globe className="w-4 h-4" />
                    {company.website}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    {company.size} employees
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase className="w-4 h-4" />
                    {company.industry}
                  </div>
                </div>
                {company.lastActivity && (
                  <div className="mt-4 text-xs text-gray-500">
                    Last activity: {company.lastActivity}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Plus,
  ChevronRight,
  Target as TargetIcon,
  Building2
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";

interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
  type: "email" | "call" | "social";
  category: "cold" | "trigger" | "followup";
}

interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  industry: string;
  size: string;
  trigger?: {
    type: string;
    score: number;
    description: string;
  };
}

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Funding Announcement Follow-up",
    content: "Hi {{firstName}},\n\nCongratulations on {{company}}'s recent {{fundingRound}} funding round! This is a significant milestone.\n\nI noticed you're scaling {{department}} and thought you might be interested in how we've helped similar companies improve their sales intelligence and outreach automation...",
    variables: ["firstName", "company", "fundingRound", "department"],
    type: "email",
    category: "trigger"
  },
  {
    id: "2",
    name: "New CTO Introduction",
    content: "Hi {{firstName}},\n\nCongratulations on your new role as CTO at {{company}}! I've been following {{company}}'s growth and your previous work at {{previousCompany}}.\n\nI'd love to discuss how we can help with your sales intelligence needs as you build out the team...",
    variables: ["firstName", "company", "previousCompany"],
    type: "email",
    category: "trigger"
  },
  {
    id: "3",
    name: "Product Launch Call Script",
    content: "Introduction:\n- Congratulate on recent {{productName}} launch\n- Mention specific feature: {{featureHighlight}}\n\nValue Proposition:\n- Share how we've helped similar companies after product launches\n- Discuss integration possibilities\n\nNext Steps:\n- Schedule product demo\n- Share case studies",
    variables: ["productName", "featureHighlight"],
    type: "call",
    category: "trigger"
  }
];

const SAMPLE_COMPANY: Company = {
  id: "1",
  name: "TechStart Inc",
  description: "AI-powered developer tools platform",
  website: "techstart.ai",
  industry: "Developer Tools",
  size: "50-100",
  trigger: {
    type: "Funding Round",
    score: 85,
    description: "Series A funding announcement - $15M"
  }
};

export default function OutreachPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customizedContent, setCustomizedContent] = useState("");
  
  const type = params.type as string;
  const triggerId = searchParams.get("triggerId");
  const companyId = searchParams.get("companyId");
  
  const typeIcon = {
    email: Mail,
    call: Phone,
    social: MessageSquare
  }[type] || Mail;

  const TypeIcon = typeIcon;
  
  const filteredTemplates = SAMPLE_TEMPLATES.filter(t => t.type === type);
  const triggerTemplates = filteredTemplates.filter(t => t.category === "trigger");
  const standardTemplates = filteredTemplates.filter(t => t.category !== "trigger");

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    let content = template.content;
    
    // If we have trigger data, pre-fill some variables
    if (SAMPLE_COMPANY.trigger) {
      content = content
        .replace("{{company}}", SAMPLE_COMPANY.name)
        .replace("{{fundingRound}}", "Series A")
        .replace("{{department}}", "engineering team");
    }
    
    setCustomizedContent(content);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <TypeIcon className="w-6 h-6" />
            {type.charAt(0).toUpperCase() + type.slice(1)} Outreach
          </h1>
          <p className="text-gray-500 mt-1">
            Create and manage your {type} templates and campaigns
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {triggerId && (
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-50">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{SAMPLE_COMPANY.name}</h3>
                <Badge variant="outline" className="bg-purple-50">
                  {SAMPLE_COMPANY.industry}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {SAMPLE_COMPANY.description}
              </p>
              {SAMPLE_COMPANY.trigger && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {SAMPLE_COMPANY.trigger.type}
                  </Badge>
                  <span className="text-gray-500">
                    Score: {SAMPLE_COMPANY.trigger.score}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 space-y-6">
          {triggerTemplates.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Trigger-Based Templates</h3>
              <div className="space-y-3">
                {triggerTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`p-4 cursor-pointer transition-all hover:ring-2 hover:ring-purple-200 ${
                      selectedTemplate?.id === template.id ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {template.content}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {template.variables.map((variable) => (
                        <Badge
                          key={variable}
                          variant="outline"
                          className="bg-purple-50 text-purple-700"
                        >
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-3">Standard Templates</h3>
            <div className="space-y-3">
              {standardTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:ring-2 hover:ring-purple-200 ${
                    selectedTemplate?.id === template.id ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {template.content}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {template.variables.map((variable) => (
                      <Badge
                        key={variable}
                        variant="outline"
                        className="bg-purple-50 text-purple-700"
                      >
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Customize Template</h3>
            {selectedTemplate ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject Line
                  </label>
                  <Input placeholder="Enter subject line..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <Textarea
                    value={customizedContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomizedContent(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a template to customize
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 
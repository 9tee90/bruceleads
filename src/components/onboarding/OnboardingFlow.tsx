'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Building2, Users, Target, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  {
    title: 'Welcome to Bruce Leads',
    description: 'Your AI-powered sales intelligence platform',
    icon: Zap,
  },
  {
    title: 'Company Monitoring',
    description: 'Configure your company monitoring preferences',
    icon: Building2,
  },
  {
    title: 'Team Setup',
    description: 'Add your team members',
    icon: Users,
  },
  {
    title: 'Target Companies',
    description: 'Set up your initial target companies',
    icon: Target,
  },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [companySettings, setCompanySettings] = useState({
    fundingRounds: true,
    techStack: true,
    hiring: true,
    leadership: true,
  });
  const [targetCompanies, setTargetCompanies] = useState<string[]>([]);
  const [teamEmails, setTeamEmails] = useState<string[]>([]);
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleCompanySettingChange = (key: keyof typeof companySettings) => {
    setCompanySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addTargetCompany = () => {
    if (newCompany && !targetCompanies.includes(newCompany)) {
      setTargetCompanies(prev => [...prev, newCompany]);
      setNewCompany('');
    }
  };

  const addTeamEmail = () => {
    if (newEmail && !teamEmails.includes(newEmail)) {
      setTeamEmails(prev => [...prev, newEmail]);
      setNewEmail('');
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Welcome to Bruce Leads</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Let's set up your account to start finding the perfect sales opportunities.
              </p>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {Object.entries(companySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize">
                    Monitor {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Switch
                    checked={value}
                    onCheckedChange={() => handleCompanySettingChange(key as keyof typeof companySettings)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="team@company.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTeamEmail()}
              />
              <Button onClick={addTeamEmail}>Add</Button>
            </div>
            <div className="space-y-2">
              {teamEmails.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span>{email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTeamEmails(prev => prev.filter(e => e !== email))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Company name"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTargetCompany()}
              />
              <Button onClick={addTargetCompany}>Add</Button>
            </div>
            <div className="space-y-2">
              {targetCompanies.map((company) => (
                <div
                  key={company}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span>{company}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTargetCompanies(prev => prev.filter(c => c !== company))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col items-center relative z-10",
                  index <= currentStep ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-600"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                  index <= currentStep 
                    ? "border-indigo-600 dark:border-indigo-400 bg-white dark:bg-gray-900" 
                    : "border-gray-300 dark:border-gray-700"
                )}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span className="text-xs mt-2 font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2">
              <div
                className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6">
          <AnimatePresence mode="wait">
            {renderStepContent(currentStep)}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                <>
                  Complete
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
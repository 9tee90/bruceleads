'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Calculator, DollarSign, Clock, TrendingUp, Users, BarChart, Target, HelpCircle } from 'lucide-react';
import { Slider } from '@/components/ui/Slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

export default function ROICalculator() {
  const [prospectingHours, setProspectingHours] = useState(20);
  const [avgHourlyRate, setAvgHourlyRate] = useState(50);
  const [numReps, setNumReps] = useState(1);
  const [activeMetric, setActiveMetric] = useState<'cost' | 'time' | 'benefits'>('cost');

  const [savings, setSavings] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
    hours: 0,
    leads: 0,
    meetings: 0,
  });

  useEffect(() => {
    // Calculate savings
    const weeklyHoursSaved = prospectingHours * 0.7; // 70% time reduction
    const weeklySavings = weeklyHoursSaved * avgHourlyRate * numReps;
    const yearlyHours = weeklyHoursSaved * 52 * numReps;
    const yearlyLeads = yearlyHours * 3; // Average 3 qualified leads per hour saved
    const yearlyMeetings = yearlyLeads * 0.3; // 30% meeting conversion rate

    setSavings({
      weekly: weeklySavings,
      monthly: weeklySavings * 4,
      yearly: weeklySavings * 52,
      hours: yearlyHours,
      leads: yearlyLeads,
      meetings: yearlyMeetings,
    });
  }, [prospectingHours, avgHourlyRate, numReps]);

  const handleSliderChange = (value: number[], setter: (value: number) => void) => {
    setter(value[0]);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="w-full max-w-5xl mx-auto" role="region" aria-label="ROI Calculator">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Calculate Your ROI
        </h2>
        <p className="text-lg text-gray-300">
          See how much time and money you can save with Bruce Leads AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <Card className="lg:col-span-5 p-6 space-y-8 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-300">
            <Calculator className="w-5 h-5" aria-hidden="true" />
            Customize Your Calculation
          </h3>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2" htmlFor="prospecting-hours">
                  <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  Weekly Prospecting Hours
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-300" aria-label="Learn more about prospecting hours">
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-gray-200 border-gray-700">
                      <p>The number of hours your team currently spends on prospecting activities per week</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                id="prospecting-hours"
                value={[prospectingHours]}
                onValueChange={(value) => handleSliderChange(value, setProspectingHours)}
                min={5}
                max={40}
                step={1}
                className="w-full"
                aria-label="Select weekly prospecting hours"
              />
              <div className="mt-2 text-sm text-gray-400 flex justify-between">
                <span>5 hours</span>
                <span className="font-medium text-indigo-400">{prospectingHours} hours</span>
                <span>40 hours</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2" htmlFor="hourly-rate">
                  <DollarSign className="w-4 h-4 text-green-400" aria-hidden="true" />
                  Average Hourly Rate
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-300" aria-label="Learn more about hourly rate">
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-gray-200 border-gray-700">
                      <p>The average hourly cost of your sales team members</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                id="hourly-rate"
                value={[avgHourlyRate]}
                onValueChange={(value) => handleSliderChange(value, setAvgHourlyRate)}
                min={20}
                max={200}
                step={5}
                className="w-full"
                aria-label="Select average hourly rate"
              />
              <div className="mt-2 text-sm text-gray-400 flex justify-between">
                <span>$20/hr</span>
                <span className="font-medium text-green-400">${avgHourlyRate}/hr</span>
                <span>$200/hr</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2" htmlFor="num-reps">
                  <Users className="w-4 h-4 text-purple-400" aria-hidden="true" />
                  Number of Sales Reps
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-300" aria-label="Learn more about number of sales reps">
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-gray-200 border-gray-700">
                      <p>The total number of sales representatives on your team</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                id="num-reps"
                value={[numReps]}
                onValueChange={(value) => handleSliderChange(value, setNumReps)}
                min={1}
                max={50}
                step={1}
                className="w-full"
                aria-label="Select number of sales representatives"
              />
              <div className="mt-2 text-sm text-gray-400 flex justify-between">
                <span>1 rep</span>
                <span className="font-medium text-purple-400">
                  {numReps} rep{numReps > 1 ? 's' : ''}
                </span>
                <span>50 reps</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-6" role="tablist">
            <button
              role="tab"
              aria-selected={activeMetric === 'cost'}
              aria-controls="cost-panel"
              onClick={() => setActiveMetric('cost')}
              className={`p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeMetric === 'cost'
                  ? 'bg-gray-800 border-green-500/50 shadow-lg shadow-green-500/10'
                  : 'hover:bg-gray-800/50 border-gray-700'
              }`}
            >
              <DollarSign className={`w-5 h-5 mx-auto mb-2 ${
                activeMetric === 'cost' ? 'text-green-400' : 'text-gray-400'
              }`} aria-hidden="true" />
              <span className={`text-sm font-medium ${
                activeMetric === 'cost' ? 'text-green-400' : 'text-gray-300'
              }`}>Cost Savings</span>
            </button>
            <button
              role="tab"
              aria-selected={activeMetric === 'time'}
              aria-controls="time-panel"
              onClick={() => setActiveMetric('time')}
              className={`p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeMetric === 'time'
                  ? 'bg-gray-800 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'hover:bg-gray-800/50 border-gray-700'
              }`}
            >
              <Clock className={`w-5 h-5 mx-auto mb-2 ${
                activeMetric === 'time' ? 'text-blue-400' : 'text-gray-400'
              }`} aria-hidden="true" />
              <span className={`text-sm font-medium ${
                activeMetric === 'time' ? 'text-blue-400' : 'text-gray-300'
              }`}>Time Saved</span>
            </button>
            <button
              role="tab"
              aria-selected={activeMetric === 'benefits'}
              aria-controls="benefits-panel"
              onClick={() => setActiveMetric('benefits')}
              className={`p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeMetric === 'benefits'
                  ? 'bg-gray-800 border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'hover:bg-gray-800/50 border-gray-700'
              }`}
            >
              <BarChart className={`w-5 h-5 mx-auto mb-2 ${
                activeMetric === 'benefits' ? 'text-purple-400' : 'text-gray-400'
              }`} aria-hidden="true" />
              <span className={`text-sm font-medium ${
                activeMetric === 'benefits' ? 'text-purple-400' : 'text-gray-300'
              }`}>Key Metrics</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeMetric === 'cost' && (
              <motion.div
                key="cost"
                id="cost-panel"
                role="tabpanel"
                aria-labelledby="cost-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                  <h4 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-6">
                    <DollarSign className="w-5 h-5" aria-hidden="true" />
                    Projected Cost Savings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <span className="text-gray-300">Weekly</span>
                      <motion.span
                        key={savings.weekly}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold text-green-400"
                      >
                        {formatCurrency(savings.weekly)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <span className="text-gray-300">Monthly</span>
                      <motion.span
                        key={savings.monthly}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold text-green-400"
                      >
                        {formatCurrency(savings.monthly)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/80 rounded-lg border border-green-500/30">
                      <span className="text-gray-200 font-medium">Yearly</span>
                      <motion.span
                        key={savings.yearly}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-green-400"
                      >
                        {formatCurrency(savings.yearly)}
                      </motion.span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeMetric === 'time' && (
              <motion.div
                key="time"
                id="time-panel"
                role="tabpanel"
                aria-labelledby="time-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                  <h4 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                    Time Saved Annually
                  </h4>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                      <motion.div
                        key={savings.hours}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-4xl font-bold text-blue-400 mb-2"
                      >
                        {formatNumber(Math.round(savings.hours))}
                      </motion.div>
                      <p className="text-blue-400 font-medium">Hours Saved Per Year</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-800/80 rounded-lg border border-blue-500/30">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {formatNumber(Math.round(savings.hours / 40))}
                        </div>
                        <p className="text-sm text-blue-400">Weeks of Work</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800/80 rounded-lg border border-blue-500/30">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {formatNumber(Math.round((savings.hours / (40 * 52)) * 10) / 10)}
                        </div>
                        <p className="text-sm text-blue-400">Full-Time Employees</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeMetric === 'benefits' && (
              <motion.div
                key="benefits"
                id="benefits-panel"
                role="tabpanel"
                aria-labelledby="benefits-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                  <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5" aria-hidden="true" />
                    Projected Annual Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <motion.div
                        key={savings.leads}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-purple-400 mb-1"
                      >
                        {formatNumber(Math.round(savings.leads))}
                      </motion.div>
                      <p className="text-sm text-purple-400">Additional Qualified Leads</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <motion.div
                        key={savings.meetings}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-purple-400 mb-1"
                      >
                        {formatNumber(Math.round(savings.meetings))}
                      </motion.div>
                      <p className="text-sm text-purple-400">Additional Meetings</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-purple-400 bg-gray-800/80 p-3 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-500" aria-hidden="true" />
                      <span>73% higher response rates vs. traditional outreach</span>
                    </div>
                    <div className="flex items-center gap-3 text-purple-400 bg-gray-800/80 p-3 rounded-lg">
                      <Target className="w-5 h-5 text-purple-500" aria-hidden="true" />
                      <span>2.5x faster deal closure with AI-powered triggers</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

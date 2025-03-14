'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Calculator, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/Slider';

export default function ROICalculator() {
  const [prospectingHours, setProspectingHours] = useState(20);
  const [avgHourlyRate, setAvgHourlyRate] = useState(50);
  const [numReps, setNumReps] = useState(1);

  const [savings, setSavings] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
    hours: 0,
  });

  useEffect(() => {
    // Calculate savings
    const weeklyHoursSaved = prospectingHours * 0.7; // 70% time reduction
    const weeklySavings = weeklyHoursSaved * avgHourlyRate * numReps;

    setSavings({
      weekly: weeklySavings,
      monthly: weeklySavings * 4,
      yearly: weeklySavings * 52,
      hours: weeklyHoursSaved * 52 * numReps,
    });
  }, [prospectingHours, avgHourlyRate, numReps]);

  const handleSliderChange = (value: number[], setter: (value: number) => void) => {
    setter(value[0]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Controls */}
        <Card className="p-6 space-y-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculate Your Savings
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Prospecting Hours
              </label>
              <Slider
                value={[prospectingHours]}
                onValueChange={(value) => handleSliderChange(value, setProspectingHours)}
                min={5}
                max={40}
                step={1}
                className="w-full"
              />
              <div className="mt-1 text-sm text-gray-500">
                Current: {prospectingHours} hours/week
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Hourly Rate
              </label>
              <Slider
                value={[avgHourlyRate]}
                onValueChange={(value) => handleSliderChange(value, setAvgHourlyRate)}
                min={20}
                max={200}
                step={5}
                className="w-full"
              />
              <div className="mt-1 text-sm text-gray-500">Current: ${avgHourlyRate}/hour</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Sales Reps
              </label>
              <Slider
                value={[numReps]}
                onValueChange={(value) => handleSliderChange(value, setNumReps)}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="mt-1 text-sm text-gray-500">
                Current: {numReps} rep{numReps > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <h4 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Projected Cost Savings
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly</span>
                  <motion.span
                    key={savings.weekly}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-green-700"
                  >
                    ${Math.round(savings.weekly).toLocaleString()}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly</span>
                  <motion.span
                    key={savings.monthly}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-green-700"
                  >
                    ${Math.round(savings.monthly).toLocaleString()}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Yearly</span>
                  <motion.span
                    key={savings.yearly}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-green-700"
                  >
                    ${Math.round(savings.yearly).toLocaleString()}
                  </motion.span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Saved Annually
              </h4>
              <div className="mt-4">
                <motion.div
                  key={savings.hours}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-blue-700"
                >
                  {Math.round(savings.hours).toLocaleString()} hours
                </motion.div>
                <p className="text-sm text-blue-600 mt-1">
                  That's {Math.round(savings.hours / 40)} weeks of full-time work!
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <h4 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Additional Benefits
              </h4>
              <ul className="mt-4 space-y-2 text-purple-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  73% higher response rates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  2.5x faster deal closure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Improved team productivity
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

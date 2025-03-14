'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap } from 'lucide-react';

interface Feature {
  name: string;
  bruce: boolean;
  others: boolean;
  description: string;
  category: string;
}

const features: Feature[] = [
  {
    name: 'AI-Powered Lead Generation',
    bruce: true,
    others: false,
    description:
      'Identify high-quality leads using real-time company signals and buyer intent data',
    category: 'Lead Generation',
  },
  {
    name: 'Real-time Company Signals',
    bruce: true,
    others: false,
    description: 'Monitor hiring surges, funding rounds, and M&A activity',
    category: 'Lead Generation',
  },
  {
    name: 'Intent Data Tracking',
    bruce: true,
    others: false,
    description: 'Track buying signals across the web to identify active buyers',
    category: 'Lead Generation',
  },
  {
    name: 'Automated Email Sequences',
    bruce: true,
    others: true,
    description: 'Send personalized follow-ups based on prospect behavior',
    category: 'Outreach',
  },
  {
    name: 'Multi-Channel Outreach',
    bruce: true,
    others: true,
    description: 'Engage prospects across email, LinkedIn, and phone',
    category: 'Outreach',
  },
  {
    name: 'Smart Lead Scoring',
    bruce: true,
    others: true,
    description: 'Prioritize leads based on likelihood to convert',
    category: 'Outreach',
  },
  {
    name: 'AI-Powered Territory Management',
    bruce: true,
    others: false,
    description: 'Automatically route leads based on rep performance and capacity',
    category: 'Management',
  },
  {
    name: 'Real-time Analytics',
    bruce: true,
    others: true,
    description: 'Track campaign performance and ROI in real-time',
    category: 'Management',
  },
  {
    name: 'Team Collaboration Tools',
    bruce: true,
    others: false,
    description: 'Share insights and collaborate on opportunities',
    category: 'Management',
  },
];

const categories = Array.from(new Set(features.map((f) => f.category)));

export default function ComparisonSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Lead Generation');
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);

  const filteredFeatures = features.filter((f) => f.category === selectedCategory);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Bruce is Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Bruce's AI-powered approach transforms your sales process
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 bg-gray-50 p-6 border-b border-gray-200">
            <div className="col-span-6 font-semibold text-gray-900">Feature</div>
            <div className="col-span-3 text-center font-semibold text-blue-600">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Bruce
              </div>
            </div>
            <div className="col-span-3 text-center font-semibold text-gray-500">Others</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="grid grid-cols-12 p-6 hover:bg-gray-50 transition-colors relative"
                onMouseEnter={() => setHoveredFeature(feature.name)}
                onMouseLeave={() => setHoveredFeature(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="col-span-6">
                  <h3 className="font-medium text-gray-900">{feature.name}</h3>
                  <motion.p
                    className="text-sm text-gray-500 mt-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredFeature === feature.name ? 'auto' : 0,
                      opacity: hoveredFeature === feature.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                <div className="col-span-3 flex justify-center items-center">
                  {feature.bruce ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: index * 0.1 }}
                      className="bg-green-100 p-2 rounded-full"
                    >
                      <Check className="w-5 h-5 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div className="bg-red-100 p-2 rounded-full">
                      <X className="w-5 h-5 text-red-500" />
                    </motion.div>
                  )}
                </div>

                <div className="col-span-3 flex justify-center items-center">
                  {feature.others ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: index * 0.1 + 0.1 }}
                      className="bg-gray-100 p-2 rounded-full"
                    >
                      <Check className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  ) : (
                    <motion.div className="bg-gray-100 p-2 rounded-full">
                      <X className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  )}
                </div>

                {hoveredFeature === feature.name && (
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
                    layoutId="outline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <span>See Bruce in Action</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

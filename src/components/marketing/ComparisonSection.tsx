'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Brain, Target, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CALENDLY_LINK = 'https://calendly.com/beyondbusinessgroup/30min';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const features = [
  {
    title: "Adaptive Intent Intelligence",
    description: "AI-powered signal detection that learns and adapts to your industry",
    traditional: "Static rules and basic triggers",
    benefits: [
      "Real-time market signal analysis",
      "Continuous learning system",
      "Industry-specific intent models",
      "Predictive scoring"
    ],
    icon: Brain,
    color: "blue"
  },
  {
    title: "Smart Lead Discovery",
    description: "Automatically identify and prioritize high-intent prospects",
    traditional: "Manual list building and basic firmographic data",
    benefits: [
      "Multi-signal correlation",
      "Automated lead scoring",
      "Buying stage detection",
      "Company fit analysis"
    ],
    icon: Target,
    color: "purple"
  },
  {
    title: "Intelligent Outreach",
    description: "Context-aware engagement recommendations",
    traditional: "Template-based sequences",
    benefits: [
      "Personalized messaging",
      "Optimal timing suggestions",
      "Multi-channel orchestration",
      "Response prediction"
    ],
    icon: Sparkles,
    color: "indigo"
  }
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$99",
    period: "per month",
    description: "Perfect for small sales teams",
    features: [
      "Up to 100 tracked companies",
      "Basic intent signals",
      "Email templates",
      "Standard support"
    ],
    highlight: false
  },
  {
    name: "Professional",
    price: "$299",
    period: "per month",
    description: "For growing sales organizations",
    features: [
      "Up to 500 tracked companies",
      "Advanced intent signals",
      "Multi-channel templates",
      "Priority support",
      "Custom triggers",
      "API access"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per month",
    description: "For large sales teams",
    features: [
      "Unlimited tracked companies",
      "Custom intent models",
      "Advanced integrations",
      "Dedicated support",
      "Custom workflows",
      "Full API access",
      "SSO & advanced security"
    ],
    highlight: false
  }
];

export default function ComparisonSection() {
  return (
    <div className="space-y-16">
      {/* How It Works */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5"
        >
          <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Intelligent Sales Process
          </span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          How Bruce Works
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Experience how Bruce's adaptive AI transforms your sales process by learning and evolving with your unique market dynamics.
        </p>
      </div>

      {/* Feature Comparison */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 md:gap-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="group relative"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className={`absolute inset-0 bg-${feature.color}-500/10 rounded-2xl blur-xl group-hover:bg-${feature.color}-500/20 transition-all duration-300`} />
            
            {/* Content */}
            <div className="relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-500/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Bruce Benefits */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-blue-400 tracking-wider uppercase">WITH BRUCE</h4>
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-1 rounded-full bg-green-500/10">
                              <Check className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Traditional Tools */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-500 tracking-wider uppercase">TRADITIONAL TOOLS</h4>
                      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                        <p className="text-gray-500 italic">{feature.traditional}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center pt-8"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 text-lg px-8 h-14"
          onClick={() => window.open(CALENDLY_LINK, '_blank')}
        >
          See It In Action
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}

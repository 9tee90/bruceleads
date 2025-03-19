import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Brain,
    title: "Dynamic Scoring",
    description: "Our AI continuously learns and adapts to your market, automatically adjusting lead scoring based on real-time signals and historical success patterns.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Real-time Signals",
    description: "Monitor multiple intent signals simultaneously—from tech stack changes to hiring patterns—and get notified when prospects show buying intent.",
    color: "purple",
  },
  {
    icon: Target,
    title: "Smart Prioritization",
    description: "Automatically rank leads based on their likelihood to buy, ensuring your team focuses on the most promising opportunities first.",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Track how intent signals evolve over time and identify patterns that indicate when prospects are most likely to engage.",
    color: "orange",
  },
];

export default function AdaptiveIntentSection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Why Adaptive Intent Intelligence™ Matters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Traditional lead scoring is static and outdated. Bruce Leads' Adaptive Intent Intelligence™ 
            continuously learns from market signals and your success patterns to identify the perfect 
            moment for engagement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-${feature.color}-500/10 rounded-2xl blur-xl group-hover:bg-${feature.color}-500/20 transition-colors duration-300`} />
              <div className="relative h-full p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-colors duration-300 flex flex-col">
                <div className={`p-3 rounded-lg bg-${feature.color}-500/10 inline-block`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-300 flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 
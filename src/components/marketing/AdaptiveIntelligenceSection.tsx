import { motion } from 'framer-motion';
import { Brain, Target, Zap, Rocket, Check } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Adaptive Intent Intelligence",
    description: "AI-powered signal detection that adapts to your industry",
    detail: "Our proprietary AI continuously learns from your industry's unique buying patterns, analyzing millions of data points to identify high-probability opportunities before your competitors.",
    color: "blue",
    features: [
      "Real-time market signal analysis",
      "Industry-specific intent patterns",
      "Automated signal validation",
      "Continuous learning system"
    ]
  },
  {
    icon: Target,
    title: "Dynamic Lead Scoring",
    description: "Contextual scoring that evolves with your sales cycle",
    detail: "Bruce's dynamic scoring system combines multiple intent signals with your historical success patterns to identify the most promising opportunities at the perfect moment.",
    color: "indigo",
    features: [
      "Multi-signal correlation",
      "Historical pattern matching",
      "Real-time score adjustments",
      "Custom scoring rules"
    ]
  },
  {
    icon: Zap,
    title: "Smart Engagement",
    description: "AI-optimized outreach with perfect timing",
    detail: "Stop guessing when to reach out. Bruce analyzes engagement patterns and trigger events to suggest the perfect time and channel for each prospect.",
    color: "violet",
    features: [
      "AI-powered timing optimization",
      "Multi-channel orchestration",
      "Personalized messaging",
      "Response prediction"
    ]
  },
  {
    icon: Rocket,
    title: "Revenue Acceleration",
    description: "Turn insights into closed deals faster",
    detail: "Transform your entire sales process with actionable intelligence. Bruce provides real-time recommendations and next best actions to accelerate deal velocity.",
    color: "purple",
    features: [
      "Deal velocity optimization",
      "Success pattern replication",
      "Automated follow-ups",
      "ROI tracking"
    ]
  }
];

export default function AdaptiveIntelligenceSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Adaptive Intelligence in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Experience how Bruce's adaptive AI transforms your sales process by learning and evolving with your unique market dynamics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-${feature.color}-500/10 rounded-2xl blur-xl group-hover:bg-${feature.color}-500/20 transition-colors duration-300`} />
              <div className="relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                <div className={`p-3 rounded-lg bg-${feature.color}-500/10 inline-block`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-300">{feature.description}</p>
                <p className="mt-3 text-sm text-gray-400">{feature.detail}</p>
                <div className="mt-4 space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-400">
                      <Check className="h-4 w-4 mr-2 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
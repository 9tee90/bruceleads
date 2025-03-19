import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CALENDLY_LINK = 'https://calendly.com/beyondbusinessgroup/30min';

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
      "Standard support",
      "Core AI features",
      "Basic reporting"
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
      "Advanced analytics",
      "API access",
      "Team collaboration"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large sales teams",
    features: [
      "Unlimited tracked companies",
      "Custom intent models",
      "Advanced integrations",
      "Dedicated support",
      "Custom workflows",
      "Full API access",
      "SSO & advanced security",
      "Custom reporting",
      "Training & onboarding"
    ],
    highlight: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Choose the plan that best fits your team's needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border ${
                tier.highlight
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'border-gray-700'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="text-gray-300 mb-3">{tier.description}</div>
                <div className="text-4xl font-bold text-white mb-1">{tier.price}</div>
                <div className="text-sm text-gray-400">{tier.period}</div>
              </div>
              <div className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    className={`w-full ${
                      tier.highlight
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {tier.name === 'Enterprise' ? 'Talk to Sales' : 'Get Started'}
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
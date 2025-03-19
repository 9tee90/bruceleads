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
    <div className="relative">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
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
            className={`relative rounded-2xl ${
              tier.highlight
                ? 'border-2 border-blue-500 bg-[#0B1120]/80'
                : 'border border-white/10 bg-[#0B1120]/40'
            } p-8`}
          >
            {tier.highlight && (
              <div className="absolute -top-5 left-0 right-0 flex justify-center">
                <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-4">{tier.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="ml-2 text-gray-400">/{tier.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Button
                className={`w-full ${
                  tier.highlight
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
                onClick={() => window.open(CALENDLY_LINK, '_blank')}
              >
                {tier.name === 'Enterprise' ? 'Talk to Sales' : 'Get Started'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
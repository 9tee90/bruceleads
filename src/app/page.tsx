"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { 
  Check, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  XCircle,
  Target,
  Brain,
  Zap,
  Rocket,
  Loader2,
  TrendingUp,
  Signal
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import { AITriggerAnimation } from '@/components/marketing/AITriggerAnimation';
import ROICalculator from '@/components/marketing/ROICalculator';
import { Suspense } from 'react';
import Header from '@/components/marketing/Header';
import ComparisonSection from '@/components/marketing/ComparisonSection';
import Footer from '@/components/marketing/Footer';
import { useToast } from '@/components/ui/use-toast';
import HeroSection from '@/components/marketing/HeroSection';
import AdaptiveIntentSection from '@/components/marketing/AdaptiveIntentSection';
import AdaptiveIntelligenceSection from '@/components/marketing/AdaptiveIntelligenceSection';
import PricingSection from '@/components/marketing/PricingSection';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';

const features = [
  {
    icon: Brain,
    title: "Dynamic Scoring",
    description: "Our AI continuously learns and adapts to your market, automatically adjusting lead scoring based on real-time signals and historical success patterns.",
    color: "blue",
  },
  {
    icon: Signal,
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
] as const;

const stats = [
  { value: '8hrs', label: 'Average daily prospecting time saved' },
  { value: '85%', label: 'Higher response rate with intent signals' },
  { value: '3x', label: 'Faster deal closure with AI insights' },
];

const salesCycleSteps = [
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
] as const;

// Add type definition for the salesCycleSteps
type SalesCycleStep = {
  icon: React.ComponentType;
  title: string;
  description: string;
  detail: string;
  color: string;
  features: string[];
};

const comparison = {
  traditional: {
    title: 'Contact Databases & Enrichment Tools',
    items: [
      'Static contact data that quickly becomes outdated',
      'Basic firmographic data with no context',
      'Generic outreach templates',
      'Spray and pray approach',
      'No real-time intent signals',
      'High volume, low quality leads',
      'Manual research required',
      'Low response rates (10-15%)',
    ],
    examples: ['ZoomInfo', 'Apollo', 'LeadIQ', 'Lusha'],
  },
  bruce: {
    title: 'Bruce Leads AI',
    items: [
      'Real-time buying intent signals',
      'Deep contextual understanding',
      'AI-customized messaging',
      'Targeted, timely outreach',
      'Proprietary intent algorithm',
      'High-quality, sales-ready leads',
      'Automated research & insights',
      'High response rates (70%+)',
    ],
  },
};

const CALENDLY_LINK = 'https://calendly.com/beyondbusinessgroup/30min';

const menuItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'ROI Calculator', href: '#roi' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
];

const footerLinks = {
  product: [
    { label: 'Why Bruce', href: '#why' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'ROI Calculator', href: '#roi' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const orbitVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Add new animation variants
const glowVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const particleVariants = {
  animate: {
    y: [0, -10, 0],
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.token,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: 'Error',
        description: 'Failed to login to demo account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0B1120] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900 to-black">
      <div className="relative">
        <Header />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="relative py-20 sm:py-24 bg-[#0B1120]/80">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
              >
                Why Adaptive Intent Intelligence™ Matters
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Experience the future of sales with our cutting-edge AI technology
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                    <feature.icon className={`w-12 h-12 text-${feature.color}-500 mb-4`} />
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="relative py-20 sm:py-24 bg-[#0B1120]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonSection />
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section id="roi" className="relative py-20 sm:py-24 bg-[#0B1120]/80">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5"
              >
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Calculate Your ROI
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4"
              >
                See Your Potential Return on Investment
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Discover how Bruce can transform your sales metrics and drive revenue growth with our interactive ROI calculator.
              </motion.p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <ROICalculator />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 text-lg px-8 h-14"
                onClick={() => window.open(CALENDLY_LINK, '_blank')}
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-20 sm:py-24 bg-[#0B1120]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingSection />
          </div>
        </section>

        {/* Built by Sales Leaders */}
        <section className="relative py-20 sm:py-24 bg-[#0B1120]/80">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
              >
                Built by Sales Leaders,<br />for Sales Teams
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                We've spent years in the trenches, just like you. Bruce combines real sales experience with cutting-edge AI to deliver what actually works.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center p-6 sm:p-8 bg-gray-900/50 rounded-xl"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">15+ Years</div>
                <div className="text-sm sm:text-base text-gray-400">Sales Leadership Experience</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-6 sm:p-8 bg-gray-900/50 rounded-xl"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$100M+</div>
                <div className="text-sm sm:text-base text-gray-400">Revenue Generated</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6 sm:p-8 bg-gray-900/50 rounded-xl"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-sm sm:text-base text-gray-400">Deals Closed</div>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 text-lg px-8 h-14"
                onClick={() => window.open(CALENDLY_LINK, '_blank')}
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative py-20 sm:py-24 bg-[#0B1120]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsSection />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}


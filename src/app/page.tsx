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
  Loader2
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import { AITriggerAnimation } from '@/components/marketing/AITriggerAnimation';
import ROICalculator from '@/components/marketing/ROICalculator';
import { Suspense } from 'react';
import Header from '@/components/marketing/Header';
import ComparisonSection from '@/components/marketing/ComparisonSection';
import Footer from '@/components/marketing/Footer';
import { useToast } from '@/components/ui/use-toast';
import { AIAnimation } from '@/components/marketing/AIAnimation';
import { NeuralAnimation } from '@/components/marketing/NeuralAnimation';

const stats = [
  { value: '8hrs', label: 'Average daily prospecting time saved' },
  { value: '85%', label: 'Higher response rate with intent signals' },
  { value: '3x', label: 'Faster deal closure with AI insights' },
];

const salesCycleSteps = [
  {
    icon: Target,
    title: "Smart Detection",
    description: "Uncover hidden opportunities with AI-powered signal detection",
    detail: "Our AI monitors millions of data points across the web, identifying companies showing real buying intent through tech stack changes, hiring patterns, funding rounds, and expansion signals.",
    color: "blue",
    features: [
      "Real-time tech stack monitoring",
      "Funding & growth signal tracking",
      "Company expansion detection",
      "Digital footprint analysis"
    ]
  },
  {
    icon: Brain,
    title: "Intent Analysis",
    description: "Turn signals into actionable intelligence",
    detail: "Bruce's proprietary AI analyzes and correlates multiple intent signals, scoring prospects based on their likelihood to buy and identifying the perfect moment for engagement.",
    color: "indigo",
    features: [
      "Multi-signal correlation",
      "Predictive intent scoring",
      "Buying stage identification",
      "Opportunity prioritization"
    ]
  },
  {
    icon: Zap,
    title: "Perfect Timing",
    description: "Engage prospects exactly when they're ready to buy",
    detail: "Stop guessing and start engaging with precision. Bruce identifies the optimal moment for outreach and crafts personalized messages based on detected trigger events.",
    color: "violet",
    features: [
      "Trigger event detection",
      "Engagement timing optimization",
      "Personalized outreach suggestions",
      "Multi-channel orchestration"
    ]
  },
  {
    icon: Rocket,
    title: "Deal Acceleration",
    description: "Close deals faster with contextual intelligence",
    detail: "Transform your sales conversations with deep contextual insights. Bruce provides real-time intelligence during calls and suggests the next best actions to accelerate deals.",
    color: "purple",
    features: [
      "Real-time conversation insights",
      "Next best action suggestions",
      "Deal velocity tracking",
      "Success pattern analysis"
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
  { label: 'Bruce vs. Market', href: '#comparison' },
  { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
];

const footerLinks = {
  product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'ROI Calculator', href: '#roi' },
    { label: 'Bruce vs. Market', href: '#comparison' },
    { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
    { label: 'Try Demo', href: '/dashboard' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const expertiseLogos = [
  {
    src: '/logos/adobe.png',
    alt: 'Adobe',
    width: 150,
    height: 50,
    quality: 90
  },
  {
    src: '/logos/microsoft.png',
    alt: 'Microsoft',
    width: 150,
    height: 50,
    quality: 90
  },
  {
    src: '/logos/salesforce.png',
    alt: 'Salesforce',
    width: 150,
    height: 50,
    quality: 90
  },
  {
    src: '/logos/meta.png',
    alt: 'Meta',
    width: 150,
    height: 50,
    quality: 90
  },
  {
    src: '/logos/google.png',
    alt: 'Google',
    width: 150,
    height: 50,
    quality: 90
  }
];

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
    <main className="relative min-h-screen bg-gray-900">
      {/* Add subtle particle background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      <Header />
      
      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm font-medium mb-6 border border-indigo-500/20">
              AI-Powered Sales Intelligence
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Sales<br />with Intelligent Automation
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Bruce identifies high-intent prospects using real-time buying signals, helping you engage the right leads at the perfect moment. Stop guessing, start converting.
            </p>
            <Link
              href={CALENDLY_LINK}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-12 bg-gray-900/50 backdrop-blur-xl border-t border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Bruce Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900/90">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm font-medium mb-4 border border-indigo-500/20">
                How Bruce Works
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Your Intelligent Sales Co-Pilot
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Experience the future of sales with Bruce's AI-driven intelligence platform
              </p>
            </motion.div>
          </div>

          {/* Process Steps */}
          <div className="relative max-w-6xl mx-auto">
            {/* Enhanced connection lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent hidden lg:block">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"
                animate={{
                  y: [0, 100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            
            <div className="space-y-8 relative">
              {salesCycleSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-stretch gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Step Number */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-auto ${
                      index % 2 === 0 ? 'lg:left-[calc(50%-1.5rem)]' : 'lg:right-[calc(50%-1.5rem)]'
                    } top-0 w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center z-10`}
                  >
                    <span className="text-indigo-300 font-bold">{index + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 group">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="h-full bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className={`p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 border border-indigo-500/20`}
                        >
                          <step.icon className="w-6 h-6 text-indigo-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {step.detail}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 group"
                          >
                            <div className="p-1 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                              <Check className="w-4 h-4 text-indigo-400" />
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-8 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual Side */}
                  <div className="flex-1 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <AIAnimation color={step.color} active={true} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href={CALENDLY_LINK}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Experience Bruce in Action
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator - Enhanced */}
      <section id="roi" className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          />
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <Suspense fallback={<div>Loading...</div>}>
            <ROICalculator />
          </Suspense>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Beyond Traditional Sales Intelligence
            </h2>
            <p className="text-lg text-gray-300">
              While others focus on static data, Bruce delivers dynamic insights that help you close deals faster and more efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-6 text-gray-400">Traditional Sales Tools</h3>
              <div className="space-y-4">
                {comparison.traditional.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-2">Common limitations of:</p>
                <div className="flex flex-wrap gap-2">
                  {comparison.traditional.examples.map((example) => (
                    <span key={example} className="inline-block px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-xl font-semibold mb-6 text-indigo-300">Bruce's AI Advantage</h3>
              <div className="space-y-4">
                {comparison.bruce.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built by Sales Leaders,<br className="hidden md:block" /> for Sales Teams
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                We've spent years in the trenches, just like you. Bruce combines real sales experience with cutting-edge AI to deliver what actually works.
              </p>
              
              {/* Sales Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
                <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">15+ Years</div>
                  <div className="text-gray-300">Sales Leadership Experience</div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$100M+</div>
                  <div className="text-gray-300">Revenue Generated</div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">10,000+</div>
                  <div className="text-gray-300">Deals Closed</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="relative mt-16">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />
            
            <div className="overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -100 * expertiseLogos.length],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="flex gap-16 items-center"
              >
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-16 items-center">
                    {expertiseLogos.map((logo) => (
                      <div key={`${logo.alt}-${setIndex}`} className="flex-shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                          quality={logo.quality}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={CALENDLY_LINK}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Our Sales Team <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced cards */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg md:text-xl text-gray-300">
                Choose the plan that best fits your team's needs. All plans include our core AI features.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-indigo-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-300 mb-6">Perfect for small sales teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Up to 3 users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">1,000 leads/month</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Basic intent signals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Email support</span>
                </li>
              </ul>
              <Button
                className="w-full bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                variant="outline"
                onClick={() => window.location.href = CALENDLY_LINK}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Professional Plan - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-8 border border-indigo-500/20 relative overflow-hidden md:-mt-6"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <p className="text-gray-300 mb-6">For growing sales organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$499</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Up to 10 users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">5,000 leads/month</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Advanced intent signals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                onClick={() => window.location.href = CALENDLY_LINK}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Enterprise Plan - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-indigo-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-300 mb-6">For large sales teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Unlimited users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Unlimited leads</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Custom AI models</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Full API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Custom training</span>
                </li>
              </ul>
              <Button
                className="w-full bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                variant="outline"
                onClick={() => window.location.href = CALENDLY_LINK}
              >
                Contact Sales
              </Button>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I change plans later?</h4>
                <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-300">We accept all major credit cards and can also arrange alternative payment methods for enterprise customers.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Do you offer a free trial?</h4>
                <p className="text-gray-300">Yes, we offer a 14-day free trial on our Professional plan. No credit card required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

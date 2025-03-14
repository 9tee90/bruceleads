"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Zap, Users, BarChart3, Target, MessageSquare, Check, ArrowRight, X } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import ComparisonTable from '@/components/marketing/ComparisonTable';
import AITriggerAnimation from '@/components/marketing/AITriggerAnimation';
import ROICalculator from '@/components/marketing/ROICalculator';
import ComparisonSection from '@/components/marketing/ComparisonSection';
import TriggerEventsCarousel from '@/components/marketing/TriggerEventsCarousel';
import Header from '@/components/layout/Header';

const stats = [
  { value: '6hrs', label: 'Average daily prospecting time saved' },
  { value: '73%', label: 'Higher response rate vs cold outreach' },
  { value: '2.5x', label: 'Faster deal closure with trigger events' }
];

const triggerEvents = [
  {
    icon: '🚀',
    title: 'Growth Signals',
    items: [
      'Mass hiring events',
      'New office locations',
      'Department expansion'
    ]
  },
  {
    icon: '💰',
    title: 'Financial Events',
    items: [
      'Series funding rounds',
      'IPO preparations',
      'Major investments'
    ]
  },
  {
    icon: '🤝',
    title: 'Strategic Changes',
    items: [
      'Leadership changes',
      'M&A activity',
      'Market expansion'
    ]
  },
  {
    icon: '📈',
    title: 'Market Moves',
    items: [
      'Product launches',
      'Tech stack changes',
      'Industry pivots'
    ]
  }
];

const salesCycleSteps = [
  {
    icon: "🎯",
    title: "Smart Detection",
    description: "AI identifies companies showing real buying intent"
  },
  {
    icon: "🧠",
    title: "Auto-Enrichment",
    description: "Instant access to decision maker data and insights"
  },
  {
    icon: "⚡",
    title: "Perfect Timing",
    description: "Engage prospects exactly when they're ready to buy"
  },
  {
    icon: "🚀",
    title: "Close Deals",
    description: "Higher conversion rates with targeted outreach"
  }
];

const roiMetrics = [
  {
    title: 'Time Saved',
    stats: [
      { value: '30hrs', label: 'Weekly prospecting time saved' },
      { value: '$1,500', label: 'Weekly cost savings' }
    ]
  },
  {
    title: 'Better Results',
    stats: [
      { value: '73%', label: 'Higher response rates' },
      { value: '2.5x', label: 'Faster deal closure' }
    ]
  },
  {
    title: 'Annual Impact',
    stats: [
      { value: '$72k', label: 'Cost savings per rep' },
      { value: '1,440hrs', label: 'Time saved per rep' }
    ]
  }
];

const comparison = {
  traditional: {
    title: "Traditional Prospecting",
    items: [
      "Hours wasted on manual research",
      "Outdated company information",
      "Missed opportunity windows",
      "Low response rates"
    ]
  },
  bruce: {
    title: "Bruce Leads AI",
    items: [
      "Real-time buying signals",
      "AI-enriched company data",
      "Perfect timing engagement",
      "3x higher conversion rates"
    ]
  }
};

const features = [
  {
    title: 'Hiring Surges & Job Reposts',
    description: 'AI monitors company hiring patterns to identify expansion signals and growth opportunities.',
    icon: '📡',
  },
  {
    title: 'Funding Rounds & M&A',
    description: 'Track companies receiving new funding or going through strategic changes.',
    icon: '💰',
  },
  {
    title: 'AI-Powered Outreach',
    description: 'Generate personalized messages that convert, backed by behavioral analysis.',
    icon: '🎯',
  }
];

const CALENDLY_LINK = "https://calendly.com/beyondbusinessgroup/30min";

const menuItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'ROI Calculator', href: '#roi' },
  { label: 'Compare', href: '#compare' },
  { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
];

const footerLinks = {
  product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'ROI Calculator', href: '#roi' },
    { label: 'Compare', href: '#compare' },
    { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
    { label: 'Try Demo', href: '/dashboard' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const expertiseLogos = [
  { src: '/logos/adobe.png', alt: 'Adobe', width: 100, height: 40 },
  { src: '/logos/google.png', alt: 'Google', width: 100, height: 40 },
  { src: '/logos/linkedin.png', alt: 'LinkedIn', width: 100, height: 40 },
  { src: '/logos/microsoft.png', alt: 'Microsoft', width: 100, height: 40 },
  { src: '/logos/salesforce.png', alt: 'Salesforce', width: 100, height: 40 },
  { src: '/logos/SAP.png', alt: 'SAP', width: 100, height: 40 },
];

export default function LandingPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll-based animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const handleDemoLogin = async () => {
    await signIn('credentials', {
      email: 'demo@bruceleads.com',
      password: 'demouser123',
      redirect: true,
      callbackUrl: '/dashboard'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Bruce Leads</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-16 bg-white shadow-lg z-40"
          >
            <div className="px-4 py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="block py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6 px-4 py-1 bg-blue-50 rounded-full"
            >
              <span className="text-blue-600 font-medium">
                🚀 The Future of B2B Sales
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight mb-8">
              Stop Prospecting.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Start Closing.
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Bruce helps sales teams identify and engage high-quality leads using real-time company signals and buyer intent data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Link 
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                >
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2">
                <Link href="#how-it-works" className="flex items-center gap-2">
                  See How It Works
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Built with Sales Expertise From Industry Leaders
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Our team brings enterprise sales experience from the world's top tech companies
            </motion.p>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex space-x-16 animate-scroll">
              {[...expertiseLogos, ...expertiseLogos].map((logo, index) => (
                <motion.div
                  key={`${logo.alt}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-none"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 object-contain"
                    priority={index < 6}
                  />
                </motion.div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              From Trigger to Close
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Turn real-time signals into closed deals with our proven process
            </motion.p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {salesCycleSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Trigger Detection Section */}
      <section id="smart-triggers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Smart Trigger Detection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Our AI monitors real-time signals to identify companies ready to buy
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl">
              <AITriggerAnimation />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Why Bruce is Different
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Transform your sales process with AI-powered lead generation
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{comparison.traditional.title}</h3>
              </div>
              <ul className="space-y-4">
                {comparison.traditional.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{comparison.bruce.title}</h3>
              </div>
              <ul className="space-y-4">
                {comparison.bruce.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Calculate Your ROI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              See how much time and money you can save by automating prospecting
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-3xl">
              <ROICalculator />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.1]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Book a demo to see how Bruce can help you find and close more deals
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="default" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                <Link 
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Bruce Leads</h3>
              <p className="text-gray-400 text-sm">
                AI-powered lead generation platform for modern sales teams.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      {link.label === 'Try Demo' ? (
                        <button
                          onClick={handleDemoLogin}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={link.isExternal ? 'noopener noreferrer' : undefined}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Bruce Leads AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

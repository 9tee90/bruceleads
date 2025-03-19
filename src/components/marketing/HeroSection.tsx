import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { AIAnimation } from './AIAnimation';
import { ArrowRight } from 'lucide-react';

const CALENDLY_LINK = 'https://calendly.com/beyondbusinessgroup/30min';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const stats = [
  { value: '8hrs', label: 'Average daily prospecting time saved' },
  { value: '85%', label: 'Higher response rate with intent signals' },
  { value: '3x', label: 'Faster deal closure with AI insights' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-24 lg:py-32">
      {/* Gradient Orb */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 rounded-full blur-[120px]" />
      </div>
      
      <div className="container relative px-6 md:px-8 flex flex-col items-center justify-center min-h-screen">
        {/* Text content */}
        <motion.div 
          className="max-w-[800px] text-center space-y-8 md:space-y-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Sales Intelligence
            </span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Transform Your Sales with{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Adaptive Intelligence™
              </span>
              <motion.span 
                className="absolute -inset-1 bg-blue-500/20 blur-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bruce leverages real-time signals and AI to help you identify, engage, and convert high-intent prospects with unprecedented precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 text-lg h-14 px-8 sm:px-10"
              onClick={() => window.open(CALENDLY_LINK, '_blank')}
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-lg h-14 px-8 sm:px-10"
              onClick={() => {
                const element = document.getElementById('how-it-works');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 lg:mt-24 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Animation */}
        <motion.div 
          className="w-full max-w-3xl aspect-[2/1] mt-20 lg:mt-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <AIAnimation />
        </motion.div>
      </div>
    </section>
  );
} 
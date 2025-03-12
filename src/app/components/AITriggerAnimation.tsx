"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const triggers = [
  {
    phase: "Detect",
    icon: "🔍",
    title: "Real-Time Signal Detection",
    description: "AI constantly monitors 50+ data sources for growth signals and opportunities.",
    highlight: "Just detected 3 companies with major hiring sprees",
    color: "from-blue-500/20 to-green-500/20"
  },
  {
    phase: "Analyze",
    icon: "🧠",
    title: "Smart Lead Qualification",
    description: "Advanced algorithms identify high-intent prospects based on multiple triggers.",
    highlight: "Found 7 companies that recently secured funding",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    phase: "Score",
    icon: "⚡",
    title: "Intelligent Prioritization",
    description: "Each lead is scored based on likelihood to convert and deal size potential.",
    highlight: "Identified 5 high-priority opportunities",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    phase: "Engage",
    icon: "✨",
    title: "Personalized Outreach",
    description: "AI crafts tailored messages based on prospect's context and triggers.",
    highlight: "Generating personalized outreach sequences",
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function AITriggerAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % triggers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${triggers[currentIndex].color} opacity-50`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content Container */}
        <div className="relative p-8 sm:p-12">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mb-12">
            {triggers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-16 h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{triggers[currentIndex].icon}</span>
                    <h3 className="text-xl font-medium text-gray-500">Phase {currentIndex + 1}: {triggers[currentIndex].phase}</h3>
                  </div>
                  
                  <h2 className="text-4xl font-light text-gray-900">
                    {triggers[currentIndex].title}
                  </h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {triggers[currentIndex].description}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-base text-gray-600">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                      {triggers[currentIndex].highlight}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full aspect-square">
                    {/* Animated Background Elements */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl">{triggers[currentIndex].icon}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const triggers = [
  {
    phase: "🔍 DETECT",
    image: "/animations/radar-pulse.gif",
    description: "Bruce scans 50+ sources in real-time to uncover new sales opportunities.",
    funMessage: "🔎 Bruce just spotted 12 new triggers!"
  },
  {
    phase: "📡 IDENTIFY",
    image: "/animations/data-analysis.gif",
    description: "Detects high-intent leads based on funding, hiring, and market shifts.",
    funMessage: "📊 Bruce identified high-intent leads!"
  },
  {
    phase: "🧠 SCORE",
    image: "/animations/ai-learning.gif",
    description: "Ranks & prioritizes leads so you engage at the right time.",
    funMessage: "⚡ Bruce ranked your hottest leads!"
  },
  {
    phase: "✍️ ENGAGE",
    image: "/animations/message-creation.gif",
    description: "AI crafts tailored LinkedIn & Email outreach for every lead.",
    funMessage: "✍️ Bruce is drafting relevant outreach…"
  },
  {
    phase: "🎯 CONVERT",
    image: "/animations/prospect-engagement.gif",
    description: "Ensures your outreach lands at the perfect moment.",
    funMessage: "🎯 Boom! Your lead wants to talk!"
  }
];

export default function AITriggerAnimation() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % triggers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-2xl h-[400px] sm:h-[520px] bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 border border-yellow-500 flex flex-col items-center justify-between mt-8 sm:mt-16"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* Progress Bar */}
      <div className="absolute top-2 sm:top-4 left-4 sm:left-6 right-4 sm:right-6 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-yellow-500"
          key={stepIndex}
          initial={{ width: "0%" }}
          animate={{ width: `${((stepIndex + 1) / triggers.length) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Phase Title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-bold text-yellow-400 tracking-wide text-center px-2"
        >
          {triggers[stepIndex].phase}
        </motion.div>
      </AnimatePresence>

      {/* Animated Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={stepIndex}
          src={triggers[stepIndex].image}
          alt={triggers[stepIndex].phase}
          className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg shadow-lg mx-auto mt-2 sm:mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${stepIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm sm:text-base text-gray-300 text-center max-w-md px-4 mt-4"
        >
          {triggers[stepIndex].description}
        </motion.p>
      </AnimatePresence>

      {/* Dynamic Fun Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-black font-bold text-base sm:text-lg rounded-lg shadow-lg text-center mt-4 sm:mt-6 mx-2"
        >
          {triggers[stepIndex].funMessage}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
} 
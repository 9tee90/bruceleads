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
      className="relative w-full max-w-2xl h-[520px] bg-gray-900 rounded-lg shadow-lg p-6 border border-yellow-500 flex flex-col items-center justify-between mt-16"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* Progress Bar */}
      <div className="absolute top-4 left-6 right-6 h-2 bg-gray-700 rounded-full overflow-hidden">
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
          className="mt-8 text-3xl font-bold text-yellow-400 tracking-wide"
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
          className="w-48 h-48 object-cover rounded-lg shadow-lg mx-auto mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Dynamic Fun Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="px-6 py-3 bg-yellow-500 text-black font-bold text-lg rounded-lg shadow-lg text-center mt-6"
        >
          {triggers[stepIndex].funMessage}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

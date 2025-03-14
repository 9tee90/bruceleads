"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Target, Users, Zap, Brain } from "lucide-react";

interface Signal {
  id: number;
  text: string;
  color: string;
  angle: number;
  icon: typeof Sparkles | typeof Target | typeof Users | typeof Zap;
}

const generateSignals = (count: number): Signal[] => {
  const icons = [Sparkles, Target, Users, Zap];
  const colors = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-emerald-500 to-emerald-600', 'from-indigo-500 to-indigo-600'];
  const messages = [
    "New tech stack detected",
    "Leadership change",
    "Growth signals",
    "Budget confirmed",
    "Team expansion",
    "Product launch",
    "Office location",
    "Hiring surge"
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: messages[i % messages.length],
    color: colors[i % colors.length],
    angle: (i * (360 / count)) * (Math.PI / 180),
    icon: icons[i % icons.length]
  }));
};

export function AITriggerAnimation() {
  const [signals] = useState(() => generateSignals(8));
  const [activeSignal, setActiveSignal] = useState<number | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal((prev) => {
        const next = prev === null ? 0 : (prev + 1) % signals.length;
        if (next === 0) {
          setPhase((p) => (p + 1) % 4);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [signals.length]);

  const phases = [
    "Detecting Intent Signals",
    "Processing AI Insights",
    "Identifying Decision Makers",
    "Generating Smart Actions"
  ];

  return (
    <div className="relative h-[400px] bg-white rounded-2xl p-8 overflow-hidden">
      {/* Orbital grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `
            radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(0,0,0,0.1) 20.5%, transparent 21%),
            radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 35%, transparent 35.5%),
            radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 50%, transparent 50.5%)
          `,
          backgroundSize: '400px 400px',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative h-full flex items-center justify-center">
        {/* Orbital paths */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-100 opacity-50" />
        <div className="absolute w-[250px] h-[250px] rounded-full border border-gray-100 opacity-40" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-gray-100 opacity-30" />

        {/* Central AI Core */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Core glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>

        {/* Orbiting Signals */}
        {signals.map((signal, index) => {
          const radius = 130; // Orbit radius
          const x = Math.cos(signal.angle + (phase * Math.PI / 2)) * radius;
          const y = Math.sin(signal.angle + (phase * Math.PI / 2)) * radius;
          const Icon = signal.icon;
          const isActive = index === activeSignal;

          return (
            <motion.div
              key={signal.id}
              className="absolute"
              animate={{
                x: x,
                y: y,
                scale: isActive ? 1.2 : 1,
                zIndex: isActive ? 20 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                scale: { duration: 0.2 }
              }}
            >
              <motion.div
                className={`relative flex items-center ${isActive ? 'gap-2' : 'gap-0'}`}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${signal.color} rounded-xl shadow-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    {signal.text}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Phase Display */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-full px-4 py-2"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {phases[phase]}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
} 
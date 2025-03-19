import { motion } from 'framer-motion';
import { Brain, Signal, Users, Calendar, MessageSquare, Target } from 'lucide-react';

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

const signalVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const flowVariants = {
  animate: {
    pathLength: [0, 1],
    opacity: [0.2, 1, 0.2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function AIAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Brain */}
      <motion.div
        className="absolute"
        animate={pulseVariants.animate}
      >
        <div className="relative p-8 rounded-full bg-blue-500/20">
          <Brain className="w-16 h-16 text-blue-400" />
        </div>
      </motion.div>

      {/* Orbiting Elements */}
      <motion.div
        className="absolute w-full h-full"
        animate={orbitVariants.animate}
      >
        {/* Market Signals */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={signalVariants.animate}
        >
          <div className="p-4 rounded-full bg-purple-500/20">
            <Signal className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>

        {/* Target Companies */}
        <motion.div
          className="absolute top-1/2 right-0 translate-x-1/2"
          animate={signalVariants.animate}
        >
          <div className="p-4 rounded-full bg-green-500/20">
            <Target className="w-8 h-8 text-green-400" />
          </div>
        </motion.div>

        {/* Engagement */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          animate={signalVariants.animate}
        >
          <div className="p-4 rounded-full bg-yellow-500/20">
            <MessageSquare className="w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>

        {/* Meetings */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-x-1/2"
          animate={signalVariants.animate}
        >
          <div className="p-4 rounded-full bg-red-500/20">
            <Calendar className="w-8 h-8 text-red-400" />
          </div>
        </motion.div>
      </motion.div>

      {/* Flow Lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 200 200">
        <motion.path
          d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          variants={flowVariants}
          animate="animate"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Connecting Lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 200 200">
        <motion.line
          x1="100" y1="20"
          x2="100" y2="100"
          stroke="#4f46e5"
          strokeWidth="1"
          variants={flowVariants}
          animate="animate"
        />
        <motion.line
          x1="180" y1="100"
          x2="100" y2="100"
          stroke="#4f46e5"
          strokeWidth="1"
          variants={flowVariants}
          animate="animate"
        />
        <motion.line
          x1="100" y1="180"
          x2="100" y2="100"
          stroke="#4f46e5"
          strokeWidth="1"
          variants={flowVariants}
          animate="animate"
        />
        <motion.line
          x1="20" y1="100"
          x2="100" y2="100"
          stroke="#4f46e5"
          strokeWidth="1"
          variants={flowVariants}
          animate="animate"
        />
      </svg>
    </div>
  );
} 
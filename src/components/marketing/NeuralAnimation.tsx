import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface Signal {
  id: number;
  type: 'tech' | 'funding' | 'hiring' | 'social' | 'news';
  x: number;
  y: number;
  progress: number;
}

interface ProcessNode {
  id: number;
  x: number;
  y: number;
  type: 'input' | 'processing' | 'output';
  connections: number[];
}

const SIGNAL_TYPES = ['tech', 'funding', 'hiring', 'social', 'news'];
const SIGNAL_ICONS = {
  tech: '💻',
  funding: '💰',
  hiring: '👥',
  social: '🌐',
  news: '📰',
};

const generateProcessNodes = () => {
  const nodes: ProcessNode[] = [];
  
  // Input layer - signal collectors
  for (let i = 0; i < 8; i++) {
    nodes.push({
      id: i,
      x: 10 + (i * 12),
      y: 20,
      type: 'input',
      connections: [8 + Math.floor(i / 2)], // Connect to processing layer
    });
  }
  
  // Processing layer - neural network
  for (let i = 0; i < 4; i++) {
    nodes.push({
      id: 8 + i,
      x: 20 + (i * 20),
      y: 50,
      type: 'processing',
      connections: [12], // All connect to central node
    });
  }
  
  // Output node - central processor
  nodes.push({
    id: 12,
    x: 50,
    y: 80,
    type: 'output',
    connections: [],
  });
  
  return nodes;
};

export function NeuralAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes] = useState<ProcessNode[]>(generateProcessNodes());
  const [signals, setSignals] = useState<Signal[]>([]);
  const controls = useAnimation();

  // Generate new signals
  useEffect(() => {
    const interval = setInterval(() => {
      const newSignal: Signal = {
        id: Date.now(),
        type: SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)] as Signal['type'],
        x: Math.random() * 100,
        y: 0,
        progress: 0,
      };
      
      setSignals(prev => [...prev, newSignal]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animate signals
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => 
        prev
          .map(signal => {
            if (signal.progress >= 1) return null;
            return {
              ...signal,
              progress: signal.progress + 0.02,
              y: Math.min(100, signal.y + 2),
            };
          })
          .filter((signal): signal is Signal => signal !== null)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/20" />
          ))}
        </div>
        <div className="grid grid-rows-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-white/20" />
          ))}
        </div>
      </div>

      {/* Neural Network */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Connections */}
        {nodes.map(node => 
          node.connections.map(targetId => {
            const target = nodes.find(n => n.id === targetId);
            if (!target) return null;
            return (
              <motion.path
                key={`${node.id}-${targetId}`}
                d={`M ${node.x}% ${node.y}% C ${node.x}% ${(node.y + target.y) / 2}%, ${target.x}% ${(node.y + target.y) / 2}%, ${target.x}% ${target.y}%`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            );
          })
        )}
      </svg>

      {/* Process Nodes */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full ${
            node.type === 'input' ? 'bg-blue-500' :
            node.type === 'processing' ? 'bg-purple-500' :
            'bg-green-500'
          }`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.type === 'output' ? '40px' : '20px',
            height: node.type === 'output' ? '40px' : '20px',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: node.id * 0.1,
          }}
        />
      ))}

      {/* Incoming Signals */}
      {signals.map(signal => (
        <motion.div
          key={signal.id}
          className="absolute flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${signal.x}%`,
            top: `${signal.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <span className="text-lg">{SIGNAL_ICONS[signal.type]}</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>
      ))}

      {/* Data Processing Effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-20"
        style={{
          background: 'linear-gradient(to top, rgba(59,130,246,0.2), transparent)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Labels */}
      <div className="absolute top-4 left-4 text-white/80 text-sm">Incoming Signals</div>
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">Processing Layer</div>
      <div className="absolute bottom-4 right-4 text-white/80 text-sm">AI Core</div>
    </div>
  );
} 
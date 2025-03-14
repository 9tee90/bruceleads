import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  pulseDelay: number;
  size: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  active: boolean;
}

interface DataPoint {
  id: number;
  path: { x: number; y: number }[];
  progress: number;
  color: string;
}

interface AIAnimationProps {
  color?: string;
  active?: boolean;
  interactive?: boolean;
}

const generateNodes = (count: number): Node[] => {
  const nodes: Node[] = [];
  const centerX = 50;
  const centerY = 50;
  
  // Create layers of nodes in a neural network structure
  const layers = [1, 3, 5, 3, 1]; // Network architecture
  let currentId = 0;
  
  layers.forEach((layerSize, layerIndex) => {
    const layerOffset = (layerIndex - (layers.length - 1) / 2) * 30;
    
    for (let i = 0; i < layerSize; i++) {
      const verticalOffset = (i - (layerSize - 1) / 2) * 20;
      nodes.push({
        id: currentId++,
        x: centerX + layerOffset,
        y: centerY + verticalOffset,
        connections: [],
        pulseDelay: Math.random() * 2,
        size: layerIndex === 0 || layerIndex === layers.length - 1 ? 4 : 3
      });
    }
  });

  // Connect nodes between layers
  for (let layer = 0; layer < layers.length - 1; layer++) {
    const startIdx = layers.slice(0, layer).reduce((a, b) => a + b, 0);
    const nextStartIdx = startIdx + layers[layer];
    
    for (let i = startIdx; i < nextStartIdx; i++) {
      for (let j = nextStartIdx; j < nextStartIdx + layers[layer + 1]; j++) {
        nodes[i].connections.push(j);
      }
    }
  }

  return nodes;
};

export function AIAnimation({ color = 'blue', active = true, interactive = true }: AIAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes] = useState<Node[]>(() => generateNodes(13));
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Initialize connections
  useEffect(() => {
    const newConnections: Connection[] = [];
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        newConnections.push({
          from: node.id,
          to: targetId,
          progress: 0,
          active: false
        });
      });
    });
    setConnections(newConnections);
  }, [nodes]);

  // Handle mouse interaction
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, [interactive]);

  // Animate data flow
  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      // Create new data point
      const startNode = nodes[0];
      const newPoint: DataPoint = {
        id: Date.now(),
        path: [{ x: startNode.x, y: startNode.y }],
        progress: 0,
        color: color
      };

      setDataPoints(prev => [...prev, newPoint]);

      // Update connections
      setConnections(prev => 
        prev.map(conn => ({
          ...conn,
          active: Math.random() > 0.7
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [active, nodes, color]);

  // Animate data points
  useEffect(() => {
    if (!active || dataPoints.length === 0) return;

    const interval = setInterval(() => {
      setDataPoints(prev => 
        prev
          .map(point => {
            if (point.progress >= 1) return null;

            const currentNode = nodes[Math.floor(point.progress * (nodes.length - 1))];
            const nextNode = nodes[Math.min(nodes.length - 1, Math.ceil(point.progress * (nodes.length - 1)))];

            if (currentNode && nextNode) {
              return {
                ...point,
                progress: point.progress + 0.02,
                path: [...point.path, {
                  x: currentNode.x + (nextNode.x - currentNode.x) * (point.progress % 1),
                  y: currentNode.y + (nextNode.y - currentNode.y) * (point.progress % 1)
                }]
              };
            }
            return null;
          })
          .filter((point): point is DataPoint => point !== null)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [active, dataPoints, nodes]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ cursor: interactive ? 'crosshair' : 'default' }}
    >
      {/* Neural Network Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={`var(--${color}-500)`}
              strokeWidth={conn.active ? "2" : "1"}
              strokeOpacity={conn.active ? "0.4" : "0.2"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.1
              }}
            />
          );
        })}
      </svg>

      {/* Neural Network Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full bg-${color}-500`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size * 2}px`,
            height: `${node.size * 2}px`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: node.pulseDelay,
          }}
        />
      ))}

      {/* Data Flow Points */}
      {dataPoints.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute w-2 h-2 rounded-full bg-${point.color}-500`}
          style={{
            left: `${point.path[point.path.length - 1].x}%`,
            top: `${point.path[point.path.length - 1].y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Interactive Glow Effect */}
      {interactive && (
        <motion.div
          className={`absolute w-40 h-40 bg-${color}-500 rounded-full filter blur-3xl pointer-events-none`}
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.05,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      {/* Central Core */}
      <motion.div
        className={`absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2`}
        style={{
          background: `radial-gradient(circle, var(--${color}-500) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
} 
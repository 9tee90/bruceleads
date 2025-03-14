'use client';

import * as React from 'react';
import { useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useInView } from 'react-intersection-observer';

interface TriggerEvent {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const triggerEvents: TriggerEvent[] = [
  {
    id: 1,
    title: 'Hiring Surges',
    description:
      'Identify companies expanding their teams in relevant departments, indicating growth and potential needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
    color: 'bg-green-500',
  },
  {
    id: 2,
    title: 'Funding Rounds',
    description:
      'Get notified when companies secure new funding, signaling budget availability for solutions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Technology Changes',
    description:
      'Monitor when companies adopt or switch technologies, revealing opportunities for complementary solutions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: 'bg-blue-500',
  },
  {
    id: 4,
    title: 'M&A Activity',
    description:
      'Track mergers and acquisitions that could create new opportunities or signal market changes.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    color: 'bg-orange-500',
  },
];

const CarouselSlide = memo(({ event, _isActive }: { event: TriggerEvent; _isActive: boolean }) => {
  return (
    <div>
      <div
        className={`w-12 h-12 rounded-lg ${event.color} text-white flex items-center justify-center mb-6`}
      >
        {event.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
      <p className="text-lg text-gray-600">{event.description}</p>
    </div>
  );
});

CarouselSlide.displayName = 'CarouselSlide';

const CarouselDots = memo(
  ({
    total,
    current,
    onSelect,
  }: {
    total: number;
    current: number;
    onSelect: (index: number) => void;
  }) => {
    return (
      <div className="flex space-x-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-blue-600 w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  },
);

CarouselDots.displayName = 'CarouselDots';

export default function TriggerEventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const _controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Optimized slide variants with reduced motion for mobile
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? window.innerWidth : -window.innerWidth,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? window.innerWidth : -window.innerWidth,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback(
    (newDirection: number) => {
      if (isDragging) {
        return;
      }

      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex >= triggerEvents.length) {
          nextIndex = 0;
        }
        if (nextIndex < 0) {
          nextIndex = triggerEvents.length - 1;
        }
        return nextIndex;
      });
    },
    [isDragging],
  );

  const handleDotClick = useCallback(
    (index: number) => {
      if (isDragging) {
        return;
      }
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex, isDragging],
  );

  // Auto-advance when in view
  React.useEffect(() => {
    if (!inView) {
      return;
    }

    const timer = setInterval(() => {
      if (!isDragging) {
        paginate(1);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [inView, isDragging, paginate]);

  const _renderDot = (_isActive: boolean, _index: number) => (
    <button
      key={_index}
      className={`h-2 w-2 rounded-full ${
        _index === currentIndex ? 'bg-primary' : 'bg-gray-300'
      }`}
      onClick={() => setCurrentIndex(_index)}
    />
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4" ref={inViewRef}>
      <div ref={containerRef} className="overflow-hidden relative h-[400px] touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, { offset, velocity }) => {
              setIsDragging(false);
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <Card className="h-full p-8 flex flex-col justify-between">
              <CarouselSlide event={triggerEvents[currentIndex]} _isActive={true} />

              <div className="flex justify-between items-center mt-8">
                <CarouselDots
                  total={triggerEvents.length}
                  current={currentIndex}
                  onSelect={handleDotClick}
                />
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

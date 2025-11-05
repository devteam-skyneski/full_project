'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  duration: number;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Initialize particles only once - reduced from 15 to 6 for better performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight,
        duration: 4 + Math.random() * 2, // Slightly slower for smoother animation
      }));
      setParticles(newParticles);
    }
  }, []);

  // Trigger completion callback after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds for smooth transition

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animation variants for logo (subtle fade-in + scale)
  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Animation variants for text container
  const textContainerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
  };

  // Animation variants for individual letters (left-to-right reveal)
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 6,
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.35 + i * 0.08,
        duration: 0.35,
      },
    }),
  };

  const companyName = 'EduLearn';
  const letters = companyName.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 pointer-events-auto"
      aria-label="Loading eduLearn"
      style={{ willChange: 'opacity' }}
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Subtle particle effect - optimized with CSS transforms */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-4">
        {/* Centered header row: logo + name */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
          {/* Logo/Icon */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="relative"
            style={{ willChange: 'transform' }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" style={{ willChange: 'auto' }} />
            <motion.div
              animate={{
                scale: [1, 1.05, 1], // Reduced scale change for smoother animation
                rotate: [0, -4, 0, 4, 0], // Reduced rotation for better performance
              }}
              transition={{
                duration: 2.5, // Slightly slower for smoother animation
                repeat: Infinity,
                ease: 'easeInOut', // Smoother easing
              }}
              className="relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/20"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
            >
              <GraduationCap
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white"
                strokeWidth={2}
              />
            </motion.div>
          </motion.div>

          {/* Company name with left-to-right letter stagger */}
          <motion.div
            variants={textContainerVariants}
            initial="initial"
            animate="animate"
            className="flex items-center justify-center leading-none"
            style={{
              // Use clamp for responsive size while keeping balance
              fontSize: 'clamp(36px, 6vw, 72px)',
              willChange: 'transform',
            }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="font-bold text-white tracking-tight"
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '200px' }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="h-1 w-[200px] max-w-[80vw] bg-white/20 rounded-full overflow-hidden"
          style={{ willChange: 'width, opacity' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.2, duration: 1.3, ease: 'easeInOut' }}
            className="h-full bg-white rounded-full shadow-lg"
            style={{ 
              willChange: 'width',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


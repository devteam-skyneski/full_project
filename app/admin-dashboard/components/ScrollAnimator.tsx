"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [150, 0]); 
  const opacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.5, 1]); 
  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]); 
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]); 

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformPerspective: 1200, 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimator;
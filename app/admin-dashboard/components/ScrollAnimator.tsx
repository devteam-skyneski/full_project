"use client";

// Notice the import is "framer-motion"
import { motion, Variants } from "framer-motion"; 
import React from "react";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
}

// Define our COOLER animations
const scrollVariants: Variants = {
  // Start hidden, rotated, and small
  hidden: { 
    opacity: 0, 
    y: 75,
    scale: 0.9,
    rotateX: 10 
  },
  // Animate to visible, flat, and full-size
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.01, -0.05, 0.95], // A nice ease-out curve
      delay: 0.1
    }
  }
};

export const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }} // This enables the 3D rotateX
      variants={scrollVariants}
      initial="hidden"
      whileInView="visible"
      // This is the magic:
      // once: true -> Only animate it in one time
      // amount: 0.2 -> Trigger the animation when 20% of the section is visible
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimator;
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Boxes = ({ className }: { className?: string }) => {
  // Increased grid size to ensure full coverage with skew transform
  const rows = useMemo(() => new Array(35).fill(1), []);
  const cols = useMemo(() => new Array(30).fill(1), []);
  
  const colors = useMemo(() => [
    "rgba(125, 211, 252, 0.4)",
    "rgba(249, 168, 212, 0.4)",
    "rgba(134, 239, 172, 0.4)",
    "rgba(253, 224, 71, 0.4)",
    "rgba(252, 165, 165, 0.4)",
    "rgba(196, 181, 253, 0.4)",
    "rgba(147, 197, 253, 0.4)",
    "rgba(129, 140, 248, 0.4)",
    "rgba(196, 181, 253, 0.4)",
  ], []);

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(1.2) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute inset-0 w-full h-full flex z-0",
        className
      )}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="w-16 h-8 border-l border-slate-600/50 relative pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.01 }}
        >
          {cols.map((_, j) => {
            const boxKey = `box-${i}-${j}`;
            const shouldShowPlus = j % 2 === 0 && i % 2 === 0;
            // Use a seeded random based on position for consistent but varied colors
            const seed = (i * cols.length + j) * 17;
            const colorIndex = seed % colors.length;
            const hoverColor = colors[colorIndex];
            
            return (
              <motion.div
                key={boxKey}
                className="w-16 h-8 border-r border-t border-slate-600/50 relative pointer-events-auto"
                whileHover={{
                  backgroundColor: hoverColor,
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: (i * cols.length + j) * 0.001 }}
              >
                {shouldShowPlus && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-500/60 stroke-[1px] pointer-events-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};


"use client";

import React from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';

export const MotionDiv = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        {...(shouldReduceMotion ? { initial: false, animate: false, transition: { duration: 0 } } : props)}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

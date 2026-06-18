"use client";

import { motion } from "framer-motion";

export function PulseRing({ size = 400 }: { size?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary-500/30"
          style={{ width: size - i * 60, height: size - i * 60 }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.15, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

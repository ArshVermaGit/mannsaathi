"use client";

import { motion } from "framer-motion";
import { variants } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.pageEnter}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

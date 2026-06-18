"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { variants } from "@/lib/animations";

export function HeroSection() {
  const router = useRouter();
  const headline = "डर असली बीमारी है। हम इलाज हैं।";
  const words = headline.split(' ');

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40rem] h-[40rem] pulse-ring opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block text-primary-400 font-mono text-sm tracking-widest uppercase mb-4"
        >
          DesignVerse 2026 — Real Ideas. Real Impact.
        </motion.div>
        
        <motion.h1 
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
          className="font-display font-bold text-5xl md:text-7xl leading-tight text-text-primary flex flex-wrap justify-center gap-x-4 gap-y-2"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={variants.staggerItem}
              transition={variants.fadeIn.transition}
              className={i >= 2 ? "text-primary-500" : ""}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          variants={variants.fadeIn}
          initial="initial"
          animate="animate"
          className="font-body text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed pt-4"
        >
          Thousands of people avoid doctors every day — not because care doesn't exist, but because taking the first step feels impossible. MannSaathi meets you where you are.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link 
            href="/check" 
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-glow-primary flex items-center justify-center gap-2 text-lg"
          >
            Check Your Symptoms — Anonymous
          </Link>
          <Link 
            href="/chat" 
            className="w-full sm:w-auto bg-transparent border border-surface-600 hover:border-primary-500 text-text-primary font-display font-medium px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg"
          >
            Or talk to MannSaathi <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary pt-8 font-medium"
        >
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent-500" /> No login required</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent-500" /> No data sold</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent-500" /> Under 5 minutes</span>
        </motion.div>
      </div>
    </section>
  );
}

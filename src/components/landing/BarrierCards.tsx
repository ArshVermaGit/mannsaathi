"use client";

import { ArrowRight, HeartPulse, Users, Activity, IndianRupee, Clock, ShieldCheck } from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface BarrierCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const BARRIER_CARDS: BarrierCard[] = [
  { id: "1", title: "Fear of Diagnosis", description: "Knowing is better than wondering.", icon: HeartPulse },
  { id: "2", title: "Social Stigma", description: "4,200+ people near you checked last month.", icon: Users },
  { id: "3", title: "Masculinity Norms", description: "Getting checked is the smart move.", icon: Activity },
  { id: "4", title: "Cost Concerns", description: "Free options near you exist.", icon: IndianRupee },
  { id: "5", title: "Lack of Time", description: "5 minutes. That's all we need.", icon: Clock },
  { id: "6", title: "Uncertainty", description: "Let's find out together.", icon: ShieldCheck },
];

function Card({ card, index }: { card: BarrierCard; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-surface-800 border border-surface-700 rounded-2xl p-6 group hover:border-primary-500/50 transition-all duration-300"
    >
      <div className="bg-surface-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/10 transition-colors">
        <card.icon className="w-6 h-6 text-primary-400" />
      </div>
      <h3 className="font-display font-semibold text-xl mb-2">{card.title}</h3>
      <p className="text-text-secondary mb-4">{card.description}</p>
      <div className="text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
        Overcome this <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

export function BarrierCards() {
  return (
    <section className="py-24 bg-surface-950 border-t border-surface-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-display font-bold text-4xl text-center mb-16">What's really stopping you?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BARRIER_CARDS.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

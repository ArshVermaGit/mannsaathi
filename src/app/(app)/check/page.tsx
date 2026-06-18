"use client";

import { useRouter } from "next/navigation";
import { useSymptomStore } from "@/store/symptomStore";
import { Brain, HeartPulse, BatteryWarning, HelpCircle } from "lucide-react";

export default function CheckEntryPage() {
  const router = useRouter();
  const setPathway = useSymptomStore(state => state.setPathway);
  
  const handleSelectPathway = (id: string) => {
    setPathway(id);
    router.push("/check/symptoms");
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-6 mb-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
          How are you feeling today?
        </h1>
        <p className="text-text-secondary text-lg">
          Select an area to start. No medical jargon needed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 w-full">
        {[
          { id: "mental", title: "Mind & Mood", desc: "Stress, anxiety, sleep, sadness", icon: Brain, color: "text-primary-500", bg: "group-hover:bg-primary-500/10" },
          { id: "physical", title: "Body & Physical", desc: "Pain, breathing, digestion", icon: HeartPulse, color: "text-accent-500", bg: "group-hover:bg-accent-500/10" },
          { id: "fatigue", title: "Tired & Stressed", desc: "Burnout, low energy, fatigue", icon: BatteryWarning, color: "text-alert-500", bg: "group-hover:bg-alert-500/10" },
          { id: "general", title: "Not Sure", desc: "General checkup", icon: HelpCircle, color: "text-text-secondary", bg: "group-hover:bg-surface-600/30" },
        ].map((pathway, i) => (
          <button 
            key={i} 
            onClick={() => handleSelectPathway(pathway.id)}
            aria-label={`Select pathway: ${pathway.title}. ${pathway.desc}`}
            className="text-left group bg-surface-800 border border-surface-700 hover:border-primary-500 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg flex items-start gap-4 min-h-[44px]"
          >
            <div className={`p-4 rounded-xl bg-surface-700 transition-colors ${pathway.bg}`}>
              <pathway.icon className={`w-8 h-8 ${pathway.color}`} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-xl text-text-primary mb-1">{pathway.title}</h3>
              <p className="text-text-secondary text-sm">{pathway.desc}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div 
        role="progressbar" 
        aria-valuenow={1} 
        aria-valuemin={1} 
        aria-valuemax={4} 
        aria-label="Step 1 of 4"
        className="mt-16 flex items-center justify-center gap-2 text-text-tertiary text-sm font-mono"
      >
        Step 1 of 4
      </div>
    </div>
  );
}

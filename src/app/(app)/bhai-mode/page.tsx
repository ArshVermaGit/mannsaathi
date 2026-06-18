"use client";

import { Activity, Dumbbell, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function BhaiModePage() {
  const router = useRouter();
  const { bhaiModeEnabled, toggleBhaiMode } = useUserStore();
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-6 py-8 border-b border-surface-800">
        <button 
          onClick={toggleBhaiMode}
          className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full font-display font-semibold uppercase tracking-wider text-sm transition-colors
            ${bhaiModeEnabled 
              ? "bg-primary-500/10 text-primary-500 border-primary-500/20" 
              : "bg-surface-700 text-text-secondary border-surface-600"
            }
          `}
        >
          <Activity className="w-4 h-4" /> {bhaiModeEnabled ? "Bhai Mode ON" : "Bhai Mode OFF"}
        </button>
        <h1 className="font-display font-bold text-5xl md:text-6xl text-text-primary leading-tight">
          Checking your engine isn't weakness.<br />
          <span className="text-primary-500">It's engineering.</span>
        </h1>
        <p className="text-text-secondary text-xl max-w-2xl mx-auto">
          You take care of your family, your work, and your bike. It's time to take care of the machine that runs it all.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface-800 border-l-4 border-l-primary-500 rounded-r-2xl p-6 shadow-md">
          <Dumbbell className="w-8 h-8 text-primary-500 mb-4" />
          <p className="text-text-primary font-medium text-lg italic">
            "Virat checks his fitness daily. Why? Because he plays to win."
          </p>
        </div>
        <div className="bg-surface-800 border-l-4 border-l-primary-500 rounded-r-2xl p-6 shadow-md">
          <ShieldCheck className="w-8 h-8 text-primary-500 mb-4" />
          <p className="text-text-primary font-medium text-lg italic">
            "Your body is your most important tool. Maintain it."
          </p>
        </div>
        <div className="bg-surface-800 border-l-4 border-l-primary-500 rounded-r-2xl p-6 shadow-md">
          <Activity className="w-8 h-8 text-primary-500 mb-4" />
          <p className="text-text-primary font-medium text-lg italic">
            "4 out of 5 men ignore symptoms. Be the 1 who doesn't."
          </p>
        </div>
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={() => router.push('/check')}
          className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-bold text-xl px-10 py-5 rounded-xl transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98] inline-flex items-center gap-3"
        >
          Let's check your engine <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSymptomStore } from "@/store/symptomStore";
import { useAnalyzeSymptoms } from "@/hooks/useAnalyzeSymptoms";
import { ArrowRight, Info, CheckCircle2, ShieldAlert, ShieldCheck, HeartPulse } from "lucide-react";
import { PulseRing } from "@/components/shared/PulseRing";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { AnimatePresence } from "framer-motion";
import LiveRegion from "@/components/ui/LiveRegion";

export default function ResultPage() {
  const router = useRouter();
  const { 
    result, customText, selectedSymptomIds, 
    durationDays, severity, pathway, language, setStep 
  } = useSymptomStore();
  
  const { mutate: analyze, isPending, isError } = useAnalyzeSymptoms();

  useEffect(() => {
    if (!result && !isPending && (customText || selectedSymptomIds.length > 0)) {
      analyze({
        text: customText + (selectedSymptomIds.length > 0 ? " " + selectedSymptomIds.join(", ") : ""),
        duration_days: durationDays,
        severity,
        pathway: pathway || "general",
        language
      });
    }
  }, [result, isPending, customText, selectedSymptomIds, durationDays, severity, pathway, language, analyze]);

  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "There's no wrong answer here...",
    "Most symptoms are manageable...",
    "You did something brave today..."
  ];

  useEffect(() => {
    if (isPending || !result) {
      const interval = setInterval(() => {
        setMsgIndex(i => (i + 1) % messages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPending, result, messages.length]);

  if (isPending || !result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <PulseRing size={200} />
          <div className="font-display font-bold text-primary-500 text-xl relative z-10">
            Analyzing
          </div>
        </div>
        <AnimatePresence mode="wait">
          <LiveRegion message={isPending ? "Analyzing your symptoms" : "Analysis complete"} />
          <MotionDiv
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-text-secondary text-lg text-center max-w-sm"
          >
            {messages[msgIndex]}
          </MotionDiv>
        </AnimatePresence>
      </div>
    );
  }

  const getRiskUI = () => {
    if (result.risk_label === "worth-attention") {
      return { icon: ShieldAlert, color: "text-alert-500", bg: "bg-alert-500/10 border-alert-500/30", label: "Worth Attention" };
    }
    if (result.risk_label === "moderate") {
      return { icon: HeartPulse, color: "text-accent-500", bg: "bg-accent-500/10 border-accent-500/30", label: "Moderate" };
    }
    return { icon: ShieldCheck, color: "text-primary-500", bg: "bg-primary-500/10 border-primary-500/30", label: "Low Risk" };
  };

  const riskUI = getRiskUI();

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full">
      <section className="mb-8" aria-label="Your symptom analysis result">
        <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full font-medium text-sm mb-6 ${riskUI.bg} ${riskUI.color}`}>
          <riskUI.icon className="w-4 h-4" /> {riskUI.label}
        </div>
        <h1 id="result-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
          Here is what we found.
        </h1>
        <div aria-labelledby="result-heading" className="bg-surface-800 border border-surface-700 rounded-2xl p-6 text-lg text-text-secondary leading-relaxed">
          {result.primary_message}
        </div>
      </section>

      <div className="space-y-6 flex-1">
        {result.possible_reasons.length > 0 && (
          <div className="bg-surface-800/50 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-display font-semibold text-xl mb-4 text-text-primary">
              <Info className="w-5 h-5 text-primary-500" /> Possible Reasons
            </h3>
            <ul className="space-y-3">
              {result.possible_reasons.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-surface-800 flex items-center justify-between">
        <div 
          role="progressbar" 
          aria-valuenow={3} 
          aria-valuemin={1} 
          aria-valuemax={4} 
          aria-label="Step 3 of 4"
          className="text-text-tertiary text-sm font-mono"
        >
          Step 3 of 4
        </div>
        <button 
          onClick={() => {
            setStep(3);
            router.push('/check/next-steps');
          }}
          className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          See Next Steps <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useSymptomStore } from "@/store/symptomStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Clock, Calendar, BookOpen, ChevronRight, HelpCircle } from "lucide-react";

export default function NextStepsPage() {
  const router = useRouter();
  const { result } = useSymptomStore();

  useEffect(() => {
    if (!result) {
      router.push("/check");
    }
  }, [result, router]);

  if (!result) return null;
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full">
      <div className="text-center space-y-4 mb-10">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
          What to do next
        </h1>
        <p className="text-text-secondary text-lg">
          Take it one step at a time. Choose the pace that feels right for you.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {/* Map through dynamic tiers */}
        {["now", "week", "learn"].map((tierType) => {
          const tierSteps = result.next_steps.filter(s => s.tier === tierType);
          if (tierSteps.length === 0) return null;

          let TierIcon = HelpCircle;
          let colorClass = "text-text-secondary";
          let bgClass = "bg-surface-700";
          let title = "";
          let desc = "";

          if (tierType === "now") {
            TierIcon = Clock;
            colorClass = "text-alert-500";
            bgClass = "bg-alert-500/10";
            title = "Right now, today";
            desc = "Take immediate action for relief.";
          } else if (tierType === "week") {
            TierIcon = Calendar;
            colorClass = "text-primary-500";
            bgClass = "bg-primary-500/10";
            title = "This week";
            desc = "Plan ahead and get checked in person.";
          } else if (tierType === "learn") {
            TierIcon = BookOpen;
            colorClass = "text-accent-500";
            bgClass = "bg-accent-500/10";
            title = "Learn more first";
            desc = "Read up on what this could be without the scary jargon.";
          }

          return (
            <div key={tierType} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`${bgClass} p-3 rounded-xl`}>
                  <TierIcon className={`w-6 h-6 ${colorClass}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl mb-1 text-text-primary">{title}</h3>
                  <p className="text-text-secondary mb-4 text-sm">{desc}</p>
                  <div className="space-y-2">
                    {tierSteps.map((step, idx) => (
                      <button key={idx} className="w-full flex items-center justify-between p-3 bg-surface-700 rounded-lg hover:bg-surface-600 transition-colors">
                        <span className="font-medium text-text-primary text-left">{step.actionText}</span>
                        <ChevronRight className="w-4 h-4 text-text-tertiary shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-surface-800 flex flex-col items-center justify-center gap-4">
        <button className="text-primary-400 hover:text-primary-300 font-medium underline-offset-4 hover:underline transition-all min-h-[44px] min-w-[44px]">
          Save my results (Optional)
        </button>
        <div 
          role="progressbar" 
          aria-valuenow={4} 
          aria-valuemin={1} 
          aria-valuemax={4} 
          aria-label="Step 4 of 4"
          className="text-text-tertiary text-sm font-mono"
        >
          Step 4 of 4
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useSymptomStore } from "@/store/symptomStore";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function SymptomsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { 
    selectedSymptomIds, toggleSymptom, 
    customText, setCustomText, 
    durationDays, setDuration,
    setStep
  } = useSymptomStore();

  const handleContinue = () => {
    setStep(2);
    router.push("/check/result");
  };
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full">
      <div className="space-y-4 mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
          {t("symptoms.title")}
        </h1>
        <p className="text-text-secondary">{t("symptoms.subtitle")}</p>
      </div>

      <div className="space-y-8 flex-1">
        {/* Chips */}
        <div className="flex flex-wrap gap-3">
          {[
            { id: "Headaches", label: t("symptoms.headaches") },
            { id: "Chest tightness", label: t("symptoms.chestTightness") },
            { id: "Trouble sleeping", label: t("symptoms.troubleSleeping") },
            { id: "Low energy", label: t("symptoms.lowEnergy") },
            { id: "Mood changes", label: t("symptoms.moodChanges") },
            { id: "Body aches", label: t("symptoms.bodyAches") }
          ].map((symptom) => {
            const isSelected = selectedSymptomIds.includes(symptom.id);
            return (
              <button 
                key={symptom.id} 
                onClick={() => toggleSymptom(symptom.id)}
                aria-pressed={isSelected}
                aria-label={`${symptom.label} — ${isSelected ? 'selected' : 'not selected'}`}
                className={`px-4 py-2 rounded-full border transition-colors font-medium min-h-[44px] min-w-[44px]
                  ${isSelected 
                    ? "border-primary-500 bg-primary-500/20 text-primary-400" 
                    : "border-surface-600 text-text-primary hover:border-primary-500 hover:bg-primary-500/10"
                  }
                `}
              >
                {symptom.label}
              </button>
            );
          })}
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">{t("symptoms.describeLabel")}</label>
          <textarea 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            aria-label={t("symptoms.describeLabel")}
            className="w-full bg-surface-800 border border-surface-700 rounded-xl p-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 transition-colors min-h-[100px]"
            placeholder={t("symptoms.placeholder")}
          />
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-secondary">{t("symptoms.howLong")}</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: t("symptoms.fewDays"), days: 3 },
              { label: t("symptoms.weeks"), days: 14 },
              { label: t("symptoms.months"), days: 60 },
              { label: t("symptoms.overYear"), days: 365 }
            ].map((dur) => (
              <button 
                key={dur.days} 
                onClick={() => setDuration(dur.days)}
                aria-pressed={durationDays === dur.days}
                className={`flex-1 py-3 border rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px]
                  ${durationDays === dur.days 
                    ? "bg-surface-700 border-primary-500 text-primary-400" 
                    : "bg-surface-800 border-surface-700 hover:bg-surface-700"
                  }
                `}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-surface-800 flex items-center justify-between">
        <div 
          role="progressbar" 
          aria-valuenow={2} 
          aria-valuemin={1} 
          aria-valuemax={4} 
          aria-label={`${t("step")} 2 ${t("of")} 4`}
          className="text-text-tertiary text-sm font-mono"
        >
          {t("step")} 2 {t("of")} 4
        </div>
        <button 
          onClick={handleContinue}
          disabled={!customText && selectedSymptomIds.length === 0}
          className="bg-primary-500 disabled:opacity-50 hover:bg-primary-400 text-surface-900 font-display font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          {t("symptoms.continue")} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

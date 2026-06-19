"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSymptomStore } from "@/store/symptomStore";
import { ArrowRight, Info, CheckCircle2, ShieldAlert, ShieldCheck, HeartPulse, Stethoscope, Activity, Apple, MessageCircleQuestion, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Add Accordion Component internally for clean UI
const Accordion = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-surface-800/50 border border-surface-700/50 rounded-2xl overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-800/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-surface-900 rounded-xl">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
          <h3 className="font-display font-semibold text-lg text-text-primary">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-text-tertiary" /> : <ChevronDown className="w-5 h-5 text-text-tertiary" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-text-secondary"
          >
            <div className="pt-2 border-t border-surface-700/50 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
import { PulseRing } from "@/components/shared/PulseRing";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { AnimatePresence, motion } from "framer-motion";
import LiveRegion from "@/components/ui/LiveRegion";

export default function ResultPage() {
  const router = useRouter();
  const { 
    customText, selectedSymptomIds, 
    durationDays, severity, pathway, language, setStep, setResult: setStoreResult 
  } = useSymptomStore();
  
  const [localResult, setLocalResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isNextStepsModalOpen, setIsNextStepsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [msgIndex, setMsgIndex] = useState(0);
  const { t } = useTranslation();
  
  const loadingMessages = [
    t("loading.msg1"),
    t("loading.msg2"),
    t("loading.msg3")
  ];

  // Always fetch fresh results on mount
  useEffect(() => {
    const symptomText = customText + (selectedSymptomIds.length > 0 ? " " + selectedSymptomIds.join(", ") : "");
    
    if (!symptomText.trim()) {
      router.push("/check");
      return;
    }

    setIsLoading(true);
    setHasError(false);

    // Check if user is signed in
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(session => {
        if (session?.user) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {});

    fetch('/api/symptoms/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: symptomText,
        duration: durationDays,
        severity,
        pathway: pathway || "general",
        language
      })
    })
    .then(r => {
      if (!r.ok) throw new Error('Analysis failed');
      return r.json();
    })
    .then(data => {
      setLocalResult(data);
      setStoreResult(data); // Also save to store for other pages
      setIsLoading(false);
    })
    .catch(err => {
      console.error("Analysis error:", err);
      setHasError(true);
      setIsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only

  // Rotate loading messages
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMsgIndex(i => (i + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages.length]);

  if (hasError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <ShieldAlert className="w-16 h-16 text-alert-500 mb-4" />
        <h2 className="font-display font-bold text-2xl text-text-primary mb-2">{t("result.timeout")}</h2>
        <p className="text-text-secondary mb-6 max-w-sm text-center">
          {t("result.timeoutDesc")}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-bold px-6 py-3 rounded-xl transition-all"
        >
          {t("result.retry")}
        </button>
      </div>
    );
  }

  const handleBackToDashboard = () => {
    if (isAuthenticated) {
      setIsSaveModalOpen(true);
    } else {
      router.push("/");
    }
  };

  const handleSaveResult = async (save: boolean) => {
    if (save && localResult) {
      setIsSaving(true);
      try {
        await fetch('/api/symptoms/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            finalResponse: localResult,
            duration: durationDays,
            severity,
            pathway,
            language
          })
        });
      } catch (err) {
        console.error("Failed to save", err);
      }
    }
    router.push("/");
  };

  if (isLoading || !localResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <PulseRing size={200} />
          <div className="font-display font-bold text-primary-500 text-xl relative z-10">
            {t("result.analyzing")}
          </div>
        </div>
        <LiveRegion message={isLoading ? t("result.analyzing") : "Analysis complete"} />
        <AnimatePresence mode="wait">
          <MotionDiv
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-text-secondary text-lg text-center max-w-sm"
          >
            {loadingMessages[msgIndex]}
          </MotionDiv>
        </AnimatePresence>
      </div>
    );
  }

  const getRiskUI = () => {
    if (localResult.risk_label === "worth-attention") {
      return { icon: ShieldAlert, color: "text-alert-500", bg: "bg-alert-500/10 border-alert-500/30", label: t("result.worthAttention") };
    }
    if (localResult.risk_label === "moderate") {
      return { icon: HeartPulse, color: "text-accent-500", bg: "bg-accent-500/10 border-accent-500/30", label: t("result.moderate") };
    }
    return { icon: ShieldCheck, color: "text-primary-500", bg: "bg-primary-500/10 border-primary-500/30", label: t("result.lowRisk") };
  };

  const riskUI = getRiskUI();

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full">
      <section className="mb-8" aria-label="Your symptom analysis result">
        <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full font-medium text-sm mb-6 ${riskUI.bg} ${riskUI.color}`}>
          <riskUI.icon className="w-4 h-4" /> {riskUI.label}
        </div>
        <h1 id="result-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
          {t("result.title")}
        </h1>
        <div aria-labelledby="result-heading" className="bg-surface-800 border border-surface-700 rounded-2xl p-6 text-lg text-text-secondary leading-relaxed">
          {localResult.primary_message}
        </div>
      </section>

      <div className="space-y-4 flex-1">
        {/* Mechanics (Why am I feeling this way?) */}
        {localResult.mechanics && (
          <Accordion title={t("result.whyFeeling")} icon={Activity} defaultOpen={true}>
            <p className="leading-relaxed pt-2">{localResult.mechanics}</p>
          </Accordion>
        )}

        {/* Diagnostic Possibilities */}
        {localResult.possible_reasons && localResult.possible_reasons.length > 0 && (
          <Accordion title={t("result.possibleConditions")} icon={Stethoscope} defaultOpen={true}>
            <ul className="space-y-3 pt-2">
              {localResult.possible_reasons.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Lifestyle & Diet Advice */}
        {localResult.lifestyle_advice && localResult.lifestyle_advice.length > 0 && (
          <Accordion title={t("result.lifestyleAdvice")} icon={Apple}>
            <ul className="space-y-3 pt-2">
              {localResult.lifestyle_advice.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Doctor Questions */}
        {localResult.doctor_questions && localResult.doctor_questions.length > 0 && (
          <Accordion title={t("result.doctorQuestions")} icon={MessageCircleQuestion}>
            <p className="text-sm text-text-tertiary mb-4">
              {t("result.doctorQuestionsDesc")}
            </p>
            <ul className="space-y-3">
              {localResult.doctor_questions.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 bg-surface-900/50 p-3 rounded-lg border border-surface-700/50">
                  <span className="font-display font-bold text-primary-500 shrink-0">Q.</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-surface-800 flex items-center justify-between">
        <div 
          role="progressbar" 
          aria-valuenow={3} 
          aria-valuemin={1} 
          aria-valuemax={3} 
          aria-label={`${t("step")} 3 ${t("of")} 3`}
          className="text-text-tertiary text-sm font-mono"
        >
          {t("step")} 3 {t("of")} 3
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToDashboard}
            className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            {t("result.backToHome")} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Save Results Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-y-auto max-h-[85dvh] bg-surface-800 border border-surface-700 rounded-3xl p-6 md:p-8 shadow-2xl text-center"
            >
              <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                {t("saveModal.title")}
              </h2>
              <p className="text-text-secondary mb-8">
                {t("saveModal.subtitle")}
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleSaveResult(true)}
                  disabled={isSaving}
                  className="w-full bg-primary-500 hover:bg-primary-400 text-surface-900 font-bold px-6 py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : t("saveModal.save")}
                </button>
                <button 
                  onClick={() => handleSaveResult(false)}
                  disabled={isSaving}
                  className="w-full bg-surface-700 hover:bg-surface-600 text-text-primary font-medium px-6 py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {t("saveModal.dontSave")}
                </button>
                <button 
                  onClick={() => setIsSaveModalOpen(false)}
                  disabled={isSaving}
                  className="w-full mt-2 text-text-tertiary hover:text-text-primary font-medium px-6 py-2 rounded-xl transition-all disabled:opacity-50"
                >
                  {t("nextSteps.close")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

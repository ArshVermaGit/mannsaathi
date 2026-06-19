"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function HowItWorksPage() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-display font-bold text-5xl md:text-6xl text-center mb-6">
        {t("howItWorks.title")}
      </h1>
      <p className="text-text-secondary text-xl text-center mb-20 max-w-2xl mx-auto">
        {t("howItWorks.subtitle")}
      </p>

      <div className="space-y-16">
        {[
          { step: "01", title: t("how.s1.title"), desc: t("how.s1.desc") },
          { step: "02", title: t("how.s2.title"), desc: t("how.s2.desc") },
          { step: "03", title: t("how.s3.title"), desc: t("how.s3.desc") },
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-surface-800 border border-surface-700 p-8 md:p-12 rounded-3xl">
            <div className="text-primary-500 font-display font-bold text-7xl leading-none opacity-50">
              {item.step}
            </div>
            <div>
              <h3 className="font-display font-bold text-3xl mb-4">{item.title}</h3>
              <p className="text-text-secondary text-lg leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <Link 
          href="/check" 
          className="inline-flex bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-10 py-5 rounded-xl transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98] text-xl items-center gap-3"
        >
          {t("cta.btn")} <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}

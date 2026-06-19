"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Zap, HeartHandshake, ShieldCheck, Globe } from "lucide-react";

export function FeaturesGrid() {
  const { t } = useTranslation();

  const features = [
    {
      id: "fast",
      icon: <Zap className="w-8 h-8 text-primary-400 mb-4" />,
      titleKey: "features.fast.title" as const,
      descKey: "features.fast.desc" as const,
    },
    {
      id: "free",
      icon: <HeartHandshake className="w-8 h-8 text-accent-400 mb-4" />,
      titleKey: "features.free.title" as const,
      descKey: "features.free.desc" as const,
    },
    {
      id: "anonymous",
      icon: <ShieldCheck className="w-8 h-8 text-alert-400 mb-4" />,
      titleKey: "features.anonymous.title" as const,
      descKey: "features.anonymous.desc" as const,
    },
    {
      id: "cultural",
      icon: <Globe className="w-8 h-8 text-purple-400 mb-4" />,
      titleKey: "features.cultural.title" as const,
      descKey: "features.cultural.desc" as const,
    },
  ];

  return (
    <section className="py-24 bg-surface-950 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-4xl mb-16 text-center">
          {t("features.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-surface-900 border border-surface-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-surface-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <h1 className="font-display font-bold text-4xl text-text-primary">{t("privacy.title")}</h1>
      <p className="text-text-secondary">{t("privacy.lastUpdated")}</p>
      
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">{t("privacy.s1.title")}</h2>
          <p>
            {t("privacy.s1.text")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">{t("privacy.s2.title")}</h2>
          <p>
            {t("privacy.s2.text")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">{t("privacy.s3.title")}</h2>
          <p>
            {t("privacy.s3.text")}
          </p>
        </section>
      </div>
    </div>
  );
}

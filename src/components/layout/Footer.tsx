"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-surface-950 border-t border-surface-800 py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-surface-700">
                <Image src="/logo.png" alt="MannSaathi Logo" fill className="object-cover" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary">
                Mann<span className="text-primary-500">Saathi</span>
              </span>
            </Link>
            <p className="text-text-secondary max-w-xs text-sm">
              {t("footer.description")}
            </p>
            <div className="text-xs text-surface-500 font-mono mt-4">
              {t("footer.builtFor")}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/check" className="hover:text-primary-400 transition-colors">{t("footer.symptomChecker")}</Link></li>
              <li><Link href="/" className="hover:text-primary-400 transition-colors">{t("footer.aiCompanion")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href="https://github.com/ArshVermaGit/mannsaathi" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  {t("footer.github")}
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/ArshVerma/mannsaathi-symptom-classifier-large" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  {t("footer.aiModel")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

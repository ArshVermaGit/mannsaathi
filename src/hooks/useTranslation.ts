"use client";

import { useUserStore } from "@/store/userStore";
import { t, type TranslationKey, type Locale } from "@/lib/i18n";

export function useTranslation() {
  const language = useUserStore((state) => state.language) as Locale;

  return {
    t: (key: TranslationKey) => t(key, language),
    locale: language,
  };
}

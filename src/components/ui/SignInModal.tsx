"use client";

import { ArrowRight, Lock, X } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { signInWithGoogle } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-surface-800 border border-surface-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-y-auto max-h-[85dvh] text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-surface-500 hover:text-text-primary bg-surface-700/50 hover:bg-surface-600 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pt-6">
              <h1 className="font-display font-bold text-2xl md:text-3xl mb-4 px-6">{t("signIn.title")}</h1>
              <p className="text-text-secondary text-sm md:text-base mb-6">
                {t("signIn.subtitle")}
              </p>

              <div className="space-y-6">
                <Link 
                  href="/check"
                  onClick={onClose}
                  className="w-full bg-surface-700 hover:bg-surface-600 text-text-primary font-medium px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Continue without account <ArrowRight className="w-5 h-5" />
                </Link>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-surface-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface-800 text-text-tertiary">{t("signIn.or")}</span>
                  </div>
                </div>

                <form
                  action={async () => {
                    await signInWithGoogle();
                  }}
                >
                  <button 
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-400 text-surface-900 font-bold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    {t("signIn.continueGoogle")}
                  </button>
                </form>

                <p className="text-sm text-text-tertiary flex items-center justify-center gap-1.5 mt-8">
                  <Lock className="w-4 h-4" /> {t("signIn.privacy")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

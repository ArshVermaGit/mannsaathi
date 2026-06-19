"use client";

import { signOut } from "next-auth/react";
import { LogOut, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export function SignOutButton() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-700 bg-surface-800 text-text-secondary hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all ml-2"
        title={t("logoutModal.title")}
      >
        <LogOut className="w-4 h-4" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="bg-surface-800 border border-surface-700 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-y-auto max-h-[85dvh] text-center"
              >
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-surface-500 hover:text-text-primary bg-surface-700/50 hover:bg-surface-600 rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <LogOut className="w-8 h-8" />
                  </div>
                  
                  <h1 className="font-display font-bold text-2xl md:text-3xl mb-4 px-6">{t("logoutModal.title")}</h1>
                  <p className="text-text-secondary text-sm md:text-base mb-8">
                    {t("logoutModal.subtitle")}
                  </p>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-4 rounded-xl transition-all shadow-lg"
                    >
                      {t("logoutModal.confirm")}
                    </button>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="w-full bg-surface-700 hover:bg-surface-600 text-text-primary font-medium px-6 py-4 rounded-xl transition-all"
                    >
                      {t("logoutModal.cancel")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

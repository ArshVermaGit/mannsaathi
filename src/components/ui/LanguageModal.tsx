"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X } from "lucide-react";

export function LanguageModal() {
  const { hasSelectedLanguage, setLanguage, setHasSelectedLanguage } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSelectLanguage = (lang: "en" | "hi") => {
    setLanguage(lang);
    setHasSelectedLanguage(true);
  };

  const handleClose = () => {
    setHasSelectedLanguage(true);
  };

  return (
    <AnimatePresence>
      {!hasSelectedLanguage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-surface-800 border border-surface-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-y-auto max-h-[95vh]"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-surface-500 hover:text-text-primary bg-surface-800 hover:bg-surface-700 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
            
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-surface-800 rounded-full flex items-center justify-center mx-auto border border-surface-700">
                <Globe className="w-8 h-8 text-primary-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="font-display font-bold text-2xl text-text-primary">Choose Your Language</h2>
                <h2 className="font-display font-bold text-2xl text-text-primary">अपनी भाषा चुनें</h2>
              </div>
              
              <p className="text-text-secondary text-sm">
                You can always change this later from the menu.<br/>
                आप इसे बाद में मेनू से बदल सकते हैं।
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => handleSelectLanguage("en")}
                  className="bg-surface-800 hover:bg-surface-700 border border-surface-600 hover:border-primary-500 text-text-primary font-display font-semibold py-4 rounded-xl transition-all flex flex-col items-center gap-1"
                >
                  <span className="text-xl">English</span>
                </button>
                <button 
                  onClick={() => handleSelectLanguage("hi")}
                  className="bg-surface-800 hover:bg-surface-700 border border-surface-600 hover:border-primary-500 text-text-primary font-display font-semibold py-4 rounded-xl transition-all flex flex-col items-center gap-1"
                >
                  <span className="text-xl">हिंदी</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

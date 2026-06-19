"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Globe, X } from "lucide-react";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { SignInModal } from "@/components/ui/SignInModal";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarClientProps {
  user: any;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const { t, locale } = useTranslation();
  const setLanguage = useUserStore((state) => state.setLanguage);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(locale === "en" ? "hi" : "en");
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-surface-700 bg-surface-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-1 flex justify-start z-50">
            <Link href="/" className="inline-flex items-center gap-3 group" onClick={closeMenu}>
              <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border border-surface-700 group-hover:border-primary-500 transition-colors bg-surface-800">
                <Image src="/logo.png" alt="MannSaathi Logo" fill className="object-cover" />
                <div className="absolute inset-0 pulse-ring rounded-full opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-primary hidden sm:inline-block">
                Mann<span className="text-primary-500">Saathi</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <Link href="/how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              {t("nav.howItWorks")}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary px-2 py-1 rounded-md hover:bg-surface-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'en' ? 'हिं' : 'EN'}</span>
            </button>
            
            {user ? (
              <>
                <Link 
                  href="/check" 
                  className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98]"
                >
                  {t("nav.newCheck")}
                </Link>
                <Link href="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-700 hover:border-primary-500 transition-all ml-2" title="Dashboard">
                  <Image 
                    src={user.image || "/default-avatar.png"} 
                    alt="User Profile" 
                    width={40} 
                    height={40} 
                    className="object-cover"
                  />
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link 
                  href="/check" 
                  className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98]"
                >
                  {t("nav.startAnonymous")}
                </Link>
                <button 
                  onClick={() => setShowSignInModal(true)}
                  className="text-sm font-medium text-text-primary hover:text-primary-400 border border-surface-700 bg-surface-800 px-4 py-2 rounded-lg transition-all hover:bg-surface-700 ml-2"
                >
                  {t("nav.signIn")}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center justify-end flex-1 z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-surface-700 bg-surface-900 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-6">
                <Link 
                  href="/how-it-works" 
                  onClick={closeMenu}
                  className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors block w-full text-center"
                >
                  {t("nav.howItWorks")}
                </Link>
                
                <div className="h-px w-full bg-surface-800" />
                
                {user ? (
                  <div className="flex flex-col items-center gap-4">
                    <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-3 w-full justify-center p-2 rounded-lg hover:bg-surface-800">
                      <Image 
                        src={user.image || "/default-avatar.png"} 
                        alt="User Profile" 
                        width={32} 
                        height={32} 
                        className="rounded-full object-cover border border-surface-700"
                      />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link 
                      href="/check" 
                      onClick={closeMenu}
                      className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-4 py-3 rounded-lg transition-all w-full text-center"
                    >
                      {t("nav.newCheck")}
                    </Link>
                    <div className="flex w-full justify-center mt-2">
                      <SignOutButton />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Link 
                      href="/check" 
                      onClick={closeMenu}
                      className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-4 py-3 rounded-lg transition-all w-full text-center"
                    >
                      {t("nav.startAnonymous")}
                    </Link>
                    <button 
                      onClick={() => { setShowSignInModal(true); closeMenu(); }}
                      className="text-base font-medium text-text-primary border border-surface-700 bg-surface-800 px-4 py-3 rounded-lg w-full text-center"
                    >
                      {t("nav.signIn")}
                    </button>
                  </div>
                )}
                
                <div className="h-px w-full bg-surface-800" />
                
                <button 
                  onClick={() => { toggleLanguage(); closeMenu(); }}
                  className="flex items-center justify-center gap-2 text-base font-medium text-text-secondary hover:text-text-primary py-2"
                >
                  <Globe className="w-5 h-5" />
                  <span>Language: {locale === 'en' ? 'English' : 'हिंदी'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  );
}

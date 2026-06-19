"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Globe } from "lucide-react";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { SignInModal } from "@/components/ui/SignInModal";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";

interface NavbarClientProps {
  user: any;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const { t, locale } = useTranslation();
  const setLanguage = useUserStore((state) => state.setLanguage);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const toggleLanguage = () => {
    setLanguage(locale === "en" ? "hi" : "en");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-surface-700 bg-surface-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="inline-flex items-center gap-3 group">
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

        {/* Actions */}
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
        <button className="md:hidden p-2 text-text-secondary hover:text-text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>

    <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
  </>
  );
}

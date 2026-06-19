"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckFlow = pathname?.startsWith("/check");
  const isChat = pathname?.startsWith("/chat");

  if (isCheckFlow) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-surface-900">
        <header className="h-16 flex items-center px-4 md:px-8 border-b border-surface-800">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Exit to Home
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="bg-accent-500/10 text-accent-500 border border-accent-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              100% Anonymous
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  if (isChat) {
    return (
      <div className="flex flex-col h-[100dvh] bg-surface-900 overflow-hidden">
        <header className="h-16 flex items-center px-4 md:px-8 border-b border-surface-800 shrink-0">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <div className="mx-auto flex items-center gap-2 font-display font-semibold text-text-primary">
            <div className="relative w-6 h-6 overflow-hidden rounded-full">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            MannSaathi <span className="text-primary-500">AI</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    );
  }

  // Default App Shell for Community, Resources, Moments, Bhai Mode
  return (
    <div className="flex flex-col min-h-[100dvh] bg-surface-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}

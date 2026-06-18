import Link from "next/link";
import Image from "next/image";
import { Menu, Globe } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-surface-700 bg-surface-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border border-surface-700 group-hover:border-primary-500 transition-colors bg-surface-800">
            <Image src="/logo.png" alt="MannSaathi Logo" fill className="object-cover" />
            <div className="absolute inset-0 pulse-ring rounded-full opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-text-primary hidden sm:inline-block">
            Mann<span className="text-primary-500">Saathi</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/stories" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Stories
          </Link>
          <Link href="/resources" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Resources
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary px-2 py-1 rounded-md hover:bg-surface-800 transition-colors">
            <Globe className="w-4 h-4" />
            <span>EN | हिं</span>
          </button>
          
          <Link 
            href="/check" 
            className="bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98]"
          >
            Start (Anonymous)
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-text-secondary hover:text-text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

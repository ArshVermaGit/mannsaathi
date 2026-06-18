import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-950 border-t border-surface-800 py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-500" />
              <span className="font-display font-bold text-xl text-text-primary">
                Mann<span className="text-primary-500">Saathi</span>
              </span>
            </Link>
            <p className="text-text-secondary max-w-xs text-sm">
              A behavioral companion that understands human hesitation and transforms it into confident, timely health action.
            </p>
            <div className="text-xs text-surface-500 font-mono mt-4">
              Built for DesignVerse 2026
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/check" className="hover:text-primary-400 transition-colors">Symptom Checker</Link></li>
              <li><Link href="/chat" className="hover:text-primary-400 transition-colors">AI Companion</Link></li>
              <li><Link href="/moments" className="hover:text-primary-400 transition-colors">Health Moments</Link></li>
              <li><Link href="/bhai-mode" className="hover:text-primary-400 transition-colors">Bhai Mode</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/resources" className="hover:text-primary-400 transition-colors">Free Care Finder</Link></li>
              <li><Link href="/community" className="hover:text-primary-400 transition-colors">Community Pulse</Link></li>
              <li><Link href="/stories" className="hover:text-primary-400 transition-colors">Real Stories</Link></li>
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
          <p>© 2026 MannSaathi. 100% Anonymous.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

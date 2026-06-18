import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CostComparison() {
  return (
    <section className="py-24 bg-surface-950 border-y border-surface-800">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-display font-bold text-4xl mb-12">Can't afford it? Think again.</h2>
        
        <div className="grid sm:grid-cols-2 gap-8 items-center max-w-2xl mx-auto mb-12">
          <div className="bg-surface-800 p-8 rounded-2xl border border-surface-700">
            <div className="text-text-secondary mb-2">Monthly Mobile Data</div>
            <div className="font-display font-bold text-4xl">₹299</div>
          </div>
          <div className="bg-primary-500/10 p-8 rounded-2xl border border-primary-500/30 relative">
            <div className="absolute -top-3 -left-3 sm:-left-6 sm:top-1/2 sm:-translate-y-1/2 bg-surface-900 border border-surface-700 rounded-full px-4 py-1 text-sm font-mono text-text-secondary">VS</div>
            <div className="text-primary-400 mb-2">Blood Pressure Check</div>
            <div className="font-display font-bold text-4xl text-primary-500">₹0 <span className="text-sm font-body font-normal text-text-secondary">via Ayushman</span></div>
          </div>
        </div>
        
        <Link href="/resources" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Find free care near me <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

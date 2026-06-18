import Link from "next/link";
import { ArrowRight, HeartPulse, Users, Activity, IndianRupee, Clock, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";
import { BarrierCards } from "@/components/landing/BarrierCards";
import { CostComparison } from "@/components/landing/CostComparison";

export default function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <BarrierCards />

      {/* How It Works */}
      <section className="py-24" id="how-it-works">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-bold text-4xl">One step at a time.</h2>
            <p className="text-text-secondary text-lg">We never overwhelm you with choices.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us how you're feeling", desc: "Tap symptoms or describe them in your own words. No medical jargon required." },
              { step: "02", title: "We listen without judgment", desc: "Our AI analyzes your symptoms calmly, without alarmist language." },
              { step: "03", title: "We show you what's possible", desc: "Real options, from 5-minute home relief to free local clinics." },
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-surface-800/50 border border-surface-700/50">
                <div className="text-primary-500/20 font-display font-bold text-7xl absolute top-4 right-6">{item.step}</div>
                <div className="relative z-10 pt-12">
                  <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CostComparison />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[30rem] h-[30rem] pulse-ring opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-wide leading-tight">
            Be the reason you choose your health today.
          </h2>
          <Link 
            href="/check" 
            className="inline-flex bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-10 py-5 rounded-xl transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98] text-xl items-center gap-3"
          >
            Start Anonymous Check <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}

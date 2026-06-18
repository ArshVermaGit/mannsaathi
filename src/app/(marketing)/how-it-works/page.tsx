import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How It Works | MannSaathi",
};

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-display font-bold text-5xl md:text-6xl text-center mb-6">
        How Mann<span className="text-primary-500">Saathi</span> Works
      </h1>
      <p className="text-text-secondary text-xl text-center mb-20 max-w-2xl mx-auto">
        Taking the first step shouldn't be the hardest part of healthcare. We've designed a 3-step process to get you from uncertainty to action.
      </p>

      <div className="space-y-16">
        {[
          { step: "01", title: "Tell us how you're feeling", desc: "Start by selecting your general area of concern—Mind, Body, or Energy. Then, tap on the symptoms you're experiencing or describe them in your own words. We never use confusing medical jargon." },
          { step: "02", title: "We listen without judgment", desc: "Our AI, trained specifically for empathy and clarity, analyzes your symptoms. It never gives you a scary diagnosis. Instead, it offers possible reasons and gentle reassurances to ease your mind." },
          { step: "03", title: "We show you what's possible", desc: "Based on the analysis, we give you actionable next steps. Whether it's a 5-minute breathing exercise you can do right now, or finding a free government clinic near you for tomorrow, you are in control." },
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-surface-800 border border-surface-700 p-8 md:p-12 rounded-3xl">
            <div className="text-primary-500 font-display font-bold text-7xl leading-none opacity-50">
              {item.step}
            </div>
            <div>
              <h3 className="font-display font-bold text-3xl mb-4">{item.title}</h3>
              <p className="text-text-secondary text-lg leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <Link 
          href="/check" 
          className="inline-flex bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-10 py-5 rounded-xl transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98] text-xl items-center gap-3"
        >
          Try the Symptom Checker <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}

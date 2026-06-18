import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Real Stories | MannSaathi",
};

export default function StoriesPage() {
  const stories = [
    {
      name: "Ravi, 29",
      location: "Kanpur",
      quote: "I kept ignoring the tight feeling in my chest because I thought I was too young for heart issues. MannSaathi didn't panic me, but it gave me the push to visit the free clinic. I caught my high BP just in time.",
      tag: "Physical Health"
    },
    {
      name: "Anjali, 34",
      location: "Lucknow",
      quote: "I was exhausted every day but felt guilty complaining. I used the anonymous checker and realized it was severe burnout. The daily 'Moments' helped me rebuild my routine.",
      tag: "Mental Health"
    },
    {
      name: "Vikram, 42",
      location: "Varanasi",
      quote: "As a provider, you don't want to show weakness. Bhai Mode really spoke to me. It reframed my health as 'maintenance' for my family. I finally went for a full checkup after 8 years.",
      tag: "Bhai Mode"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="text-center mb-20 space-y-4">
        <h1 className="font-display font-bold text-5xl md:text-6xl">Real Stories</h1>
        <p className="text-text-secondary text-xl max-w-2xl mx-auto">
          You are not the first person to feel hesitant, and you are not the first person to overcome it. Read stories from people who took the first step.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <div key={i} className="bg-surface-800 border border-surface-700 p-8 rounded-3xl hover:border-primary-500/50 transition-colors flex flex-col">
            <div className="bg-primary-500/10 text-primary-400 text-xs font-medium px-3 py-1 rounded-full w-fit mb-6">
              {story.tag}
            </div>
            <p className="text-text-primary text-lg italic flex-1 mb-8">
              "{story.quote}"
            </p>
            <div className="border-t border-surface-700 pt-6">
              <div className="font-display font-semibold text-text-primary">{story.name}</div>
              <div className="text-text-secondary text-sm">{story.location}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center bg-surface-800 border border-surface-700 p-12 rounded-3xl">
        <h2 className="font-display font-bold text-3xl mb-4">Ready to write your own story?</h2>
        <p className="text-text-secondary mb-8">It takes less than 5 minutes, and it's 100% anonymous.</p>
        <Link 
          href="/check" 
          className="inline-flex bg-primary-500 hover:bg-primary-400 text-surface-900 font-display font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-glow-primary active:scale-[0.98] items-center gap-3"
        >
          Take the first step <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

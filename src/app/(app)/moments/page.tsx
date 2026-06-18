import { Wind, SmilePlus, Droplets, ScanFace, Flame } from "lucide-react";

export const metadata = {
  title: "Health Moments | MannSaathi",
};

export default function MomentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-800 border border-surface-700 p-8 rounded-3xl">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">5-Minute Health Moments</h1>
          <p className="text-text-secondary">Small daily actions that compound into massive results.</p>
        </div>
        <div className="bg-surface-900 border border-surface-700 px-6 py-4 rounded-2xl flex flex-col items-center justify-center shrink-0">
          <div className="flex items-center gap-2 text-primary-500 font-display font-bold text-2xl">
            <Flame className="w-6 h-6" /> 3 Days
          </div>
          <div className="text-text-secondary text-sm">Current Streak</div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { title: "2-Minute Breathing", desc: "Lower your heart rate and reset your nervous system.", icon: Wind, color: "text-accent-400", bg: "bg-accent-400/10" },
          { title: "Quick Mood Check", desc: "A 3-question reflection to build emotional awareness.", icon: SmilePlus, color: "text-primary-400", bg: "bg-primary-400/10" },
          { title: "Hydration Check", desc: "Log your water intake and stay energized.", icon: Droplets, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Body Scan", desc: "Guided attention exercise to release hidden tension.", icon: ScanFace, color: "text-purple-400", bg: "bg-purple-400/10" },
        ].map((moment, i) => (
          <div key={i} className="group bg-surface-800 border border-surface-700 hover:border-surface-600 p-6 rounded-2xl cursor-pointer transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${moment.bg}`}>
              <moment.icon className={`w-6 h-6 ${moment.color}`} />
            </div>
            <h3 className="font-display font-semibold text-xl text-text-primary mb-2">{moment.title}</h3>
            <p className="text-text-secondary text-sm mb-6">{moment.desc}</p>
            <div className="text-sm font-medium text-text-primary group-hover:text-primary-400 transition-colors">
              Start moment →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

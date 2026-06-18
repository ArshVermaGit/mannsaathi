import { MapPin, TrendingUp, Users } from "lucide-react";

export const metadata = {
  title: "Community Pulse | MannSaathi",
};

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-4xl text-text-primary mb-2">You're not alone.</h1>
          <p className="text-text-secondary text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" /> Health trends in <strong className="text-text-primary">Uttar Pradesh</strong>
          </p>
        </div>
        <button className="text-primary-400 text-sm hover:underline underline-offset-4 self-start md:self-auto">
          Change Location
        </button>
      </header>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
          <div className="text-text-secondary text-sm mb-2">People seeking help this month</div>
          <div className="font-display font-bold text-4xl text-text-primary">12,847</div>
          <div className="text-accent-500 text-sm flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" /> +14% from last month
          </div>
        </div>
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
          <div className="text-text-secondary text-sm mb-2">Most common concern</div>
          <div className="font-display font-bold text-2xl text-text-primary">Fatigue & Burnout</div>
        </div>
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
          <div className="text-text-secondary text-sm mb-2">Found free care nearby</div>
          <div className="font-display font-bold text-4xl text-primary-500">4,203</div>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2">
          <Users className="w-6 h-6 text-primary-500" /> Someone near you said...
        </h2>
        <div className="space-y-4">
          {[
            "I finally went to a doctor after 3 weeks of ignoring my chest pain. Turned out to be manageable anxiety.",
            "Found out the Jan Aushadhi store has my BP meds for 80% less. Feel so relieved.",
            "Taking the 5-minute symptom check gave me the confidence to actually book the appointment."
          ].map((quote, i) => (
            <div key={i} className="bg-surface-800/50 border border-surface-700/50 p-6 rounded-2xl text-text-primary italic">
              "{quote}"
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

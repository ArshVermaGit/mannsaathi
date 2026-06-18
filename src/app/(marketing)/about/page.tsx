export const metadata = {
  title: "About Us | MannSaathi",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="font-display font-bold text-5xl md:text-6xl text-center mb-12">
        About Mann<span className="text-primary-500">Saathi</span>
      </h1>
      
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-xl text-text-secondary leading-relaxed mb-8 text-center">
          MannSaathi was built for DesignVerse 2026 with a singular mission: to bridge the gap between human hesitation and healthcare action.
        </p>

        <div className="bg-surface-800 border border-surface-700 p-8 rounded-3xl my-12">
          <h2 className="text-primary-500 font-display text-2xl font-bold mt-0 mb-4">The Problem We Solve</h2>
          <p className="text-text-secondary mb-0">
            Millions of people avoid doctors every day. Not because care doesn't exist, but because taking the first step feels impossible. Fear of diagnosis, social stigma, masculinity norms, and cost concerns paralyze people until their minor symptoms become major emergencies.
          </p>
        </div>

        <h3 className="font-display text-2xl font-bold text-text-primary mb-4">Our Philosophy: Warmth Inside Urgency</h3>
        <p className="text-text-secondary mb-8">
          We intentionally avoided the clinical "hospital white and blue" aesthetic. Those colors invoke fear. Instead, MannSaathi uses a dark, intimate canvas with warm amber tones. We want to be a companion (Saathi) to your mind (Mann) — offering a safe, anonymous space to explore your symptoms without judgment.
        </p>

        <h3 className="font-display text-2xl font-bold text-text-primary mb-4">Privacy First</h3>
        <p className="text-text-secondary mb-8">
          We don't require an account to use the symptom checker or the AI companion. We don't ask for your name, and we don't sell your data. We believe trust is the prerequisite to healthcare.
        </p>
      </div>
    </div>
  );
}

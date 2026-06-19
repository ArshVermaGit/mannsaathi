export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <h1 className="font-display font-bold text-4xl text-text-primary">Terms of Service</h1>
      <p className="text-text-secondary">Last updated: June 2026</p>
      
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">1. Not Medical Advice</h2>
          <p>
            MannSaathi is a behavioral companion and AI triage tool designed to help you overcome hesitation. It is <strong>NOT</strong> a replacement for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">2. Emergency Situations</h2>
          <p>
            If you think you may have a medical emergency, call your doctor, go to the nearest hospital emergency department, or call emergency services immediately. Do not rely on electronic communications or this software for immediate, urgent medical needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">3. Account Responsibilities</h2>
          <p>
            If you choose to create an account, you are responsible for maintaining the confidentiality of your login credentials via your Google account. We are not liable for any unauthorized access to your health history resulting from compromised Google credentials.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <h1 className="font-display font-bold text-4xl text-text-primary">Privacy Policy</h1>
      <p className="text-text-secondary">Last updated: June 2026</p>
      
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">1. Absolute Anonymity Guarantee</h2>
          <p>
            If you use MannSaathi without logging in, we absolutely guarantee that zero medical or behavioral data is saved to our databases. Your session data lives entirely in your browser and vanishes the moment you leave the site. We do not track IPs, we do not drop persistent cookies for anonymous users, and we do not sell data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">2. Authenticated Users</h2>
          <p>
            If you actively choose to log in via Google to track your health history, we securely save your basic profile information (Name, Email, Avatar) and the historical symptom logs you generate. This data is strictly encrypted at rest using industry-standard protocols. 
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-3">3. AI Processing</h2>
          <p>
            The symptom text you enter is processed securely by our backend AI models. No personally identifiable information (PII) is ever sent to the AI unless you explicitly type it into the symptom box. The AI retains zero memory of your queries.
          </p>
        </section>
      </div>
    </div>
  );
}

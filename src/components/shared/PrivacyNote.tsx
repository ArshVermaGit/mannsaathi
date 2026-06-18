import React from "react";
import { ShieldCheck } from "lucide-react";

export function PrivacyNote() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-text-tertiary text-sm mt-8 p-4">
      <ShieldCheck className="w-4 h-4 text-accent-500" />
      <span>Your data stays on your device unless you choose to save it.</span>
      <a href="/privacy" className="underline underline-offset-4 hover:text-text-secondary transition-colors">
        Privacy Policy
      </a>
    </div>
  );
}

"use client";

import React, { useState } from "react";

export interface LanguageToggleProps {
  current?: "en" | "hi";
  onChange?: (lang: "en" | "hi") => void;
}

export function LanguageToggle({ current = "en", onChange }: LanguageToggleProps) {
  const [active, setActive] = useState<"en" | "hi">(current);

  const toggle = () => {
    const next = active === "en" ? "hi" : "en";
    setActive(next);
    onChange?.(next);
  };

  return (
    <button 
      onClick={toggle}
      className="flex items-center bg-surface-800 border border-surface-700 rounded-full p-1 text-sm font-medium transition-colors hover:border-surface-600"
    >
      <div className={`px-3 py-1 rounded-full transition-colors ${active === "en" ? "bg-primary-500 text-surface-900" : "text-text-secondary"}`}>
        EN
      </div>
      <div className={`px-3 py-1 rounded-full transition-colors ${active === "hi" ? "bg-primary-500 text-surface-900" : "text-text-secondary"}`}>
        हिं
      </div>
    </button>
  );
}

import React from 'react';

export default function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-surface-900 px-4 py-2 rounded-lg z-[100] font-medium transition-all"
    >
      Skip to main content
    </a>
  );
}

import React from "react";

export interface ProgressBarProps {
  value: number; // 0-100
  color?: "primary" | "accent" | "alert";
  animated?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = "primary",
  animated = false,
  label,
  showValue = false,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const colors = {
    primary: "bg-primary-500",
    accent: "bg-accent-500",
    alert: "bg-alert-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-sm font-medium text-text-secondary">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-surface-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color]} ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

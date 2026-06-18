import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300 bg-surface-800";
  
  const variants = {
    default: "border border-surface-700",
    elevated: "border border-surface-700 shadow-lg",
    outlined: "border-2 border-surface-600 bg-transparent",
    glow: "border border-surface-700 shadow-glow-primary/10",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const interactiveStyles = interactive 
    ? "cursor-pointer hover:bg-surface-700 hover:border-primary-500/30 hover:shadow-glow-primary/10 active:scale-[0.99]" 
    : "";

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

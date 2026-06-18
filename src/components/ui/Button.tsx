import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "full";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-display transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-900 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 min-h-[44px] min-w-[44px]";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-400 text-surface-900 font-semibold hover:shadow-glow-primary focus:ring-primary-500",
    secondary: "bg-transparent border border-surface-600 hover:border-primary-500 text-text-primary font-medium focus:ring-surface-600",
    ghost: "bg-transparent hover:bg-surface-800 text-primary-400 hover:text-primary-300 font-medium focus:ring-surface-800",
    danger: "bg-alert-600 hover:bg-alert-500 text-surface-900 font-semibold focus:ring-alert-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    full: "w-full px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

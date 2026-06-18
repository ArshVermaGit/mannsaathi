import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "anonymous";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "sm",
  icon,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full border";
  
  const variants = {
    default: "bg-surface-700 text-text-primary border-surface-600",
    success: "bg-accent-500/10 text-accent-500 border-accent-500/20",
    warning: "bg-alert-500/10 text-alert-500 border-alert-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    anonymous: "bg-primary-500/10 text-primary-400 border-primary-500/30",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}

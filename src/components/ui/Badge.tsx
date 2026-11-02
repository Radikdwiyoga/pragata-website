import * as React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant?: "default" | "cyan" | "navy" | "outline" | "chip";
  readonly size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-medium transition-colors select-none";

  const variantClasses = {
    default: "bg-surface text-body border border-line",
    cyan: "bg-cyan-100 text-cyan-600 border border-cyan/20",
    navy: "bg-navy-800 text-on-navy-muted border border-navy-700",
    outline: "border border-line text-body bg-transparent",
    chip: "bg-white text-navy border border-line rounded-[4px] font-semibold tracking-tight shadow-2xs",
  };

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 rounded-[4px]",
    md: "text-xs px-2.5 py-1 rounded-[4px]",
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}

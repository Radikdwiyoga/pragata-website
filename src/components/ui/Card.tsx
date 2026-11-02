import * as React from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly hoverEffect?: boolean;
  readonly as?: "div" | "article" | "section";
}

export function Card({
  className,
  children,
  hoverEffect = false,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[8px] bg-white border border-line shadow-card transition-all duration-200",
        hoverEffect && "hover:-translate-y-0.5 hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

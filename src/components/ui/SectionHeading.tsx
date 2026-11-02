import * as React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtext?: string;
  readonly centered?: boolean;
  readonly light?: boolean;
  readonly className?: string;
  readonly id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtext,
  centered = false,
  light = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-14",
        centered && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-2.5",
            light ? "text-cyan" : "text-cyan"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-2xl sm:text-3xl lg:text-[34px] font-bold leading-tight tracking-tight",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {subtext && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-on-navy-muted" : "text-body"
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}

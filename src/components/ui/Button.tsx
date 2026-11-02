"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "primary" | "outline" | "outline-white" | "ghost";
  readonly size?: "sm" | "md" | "lg";
  readonly href?: string;
  readonly isExternal?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-[4px]";

  const variantClasses = {
    primary:
      "bg-cyan text-white hover:bg-cyan-600 active:bg-cyan-600 font-semibold shadow-xs",
    outline:
      "border border-line bg-transparent text-navy hover:bg-surface hover:border-body/30",
    "outline-white":
      "border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/60",
    ghost: "bg-transparent text-navy hover:bg-surface text-body hover:text-navy",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
    md: "text-sm px-4 py-2.5 h-10 gap-2",
    lg: "text-base px-6 py-3 h-12 gap-2.5",
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    if (href.startsWith("#")) {
      const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (props.onClick) {
          props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
        const targetId = href.slice(1);
        const elem = document.getElementById(targetId);
        if (elem) {
          e.preventDefault();
          elem.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      };

      return (
        <a
          href={href}
          className={combinedClasses}
          onClick={handleAnchorClick}
          aria-label={props["aria-label"]}
        >
          {children}
        </a>
      );
    }

    if (isExternal || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal || href.startsWith("http") ? "_blank" : undefined}
          rel={isExternal || href.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          aria-label={props["aria-label"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

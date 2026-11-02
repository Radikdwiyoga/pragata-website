import * as React from "react";
import { siteContent, type SiteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";

interface CtaBandProps {
  content?: SiteContent["ctaBand"];
}

export function CtaBand({ content }: CtaBandProps = {}) {
  const ctaBand = content || siteContent.ctaBand;

  return (
    <section className="bg-navy py-14 lg:py-20 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan/10 blur-[100px] rounded-full"
      />

      <div className="container-site relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Text Left */}
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-bold text-white leading-tight tracking-tight">
              {ctaBand.h2}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-navy-muted leading-relaxed">
              {ctaBand.subtext}
            </p>
          </div>

          {/* Action Right */}
          <div className="shrink-0 w-full sm:w-auto">
            <Button
              href={ctaBand.cta.href}
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              {ctaBand.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import * as React from "react";
import { siteContent, type SiteContent } from "@/content/site";

interface StatsProps {
  content?: SiteContent["stats"];
}

export function Stats({ content }: StatsProps = {}) {
  const stats = content || siteContent.stats;

  return (
    <section className="bg-navy py-12 lg:py-16 text-white border-y border-navy-800" aria-label="Statistik Perusahaan">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.items.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 ${
                index !== 0 ? "lg:border-l lg:border-[#1E3A5C]" : ""
              }`}
            >
              <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-[13px] text-on-navy-dim font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

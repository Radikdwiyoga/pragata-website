import * as React from "react";
import Image from "next/image";
import { siteContent, type SiteContent } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface WhyUsProps {
  content?: SiteContent["whyUs"];
}

export function WhyUs({ content }: WhyUsProps = {}) {
  const whyUs = content || siteContent.whyUs;

  return (
    <section id="kapabilitas" className="py-16 lg:py-24 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: List of 4 points */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={whyUs.label}
              title={whyUs.h2}
              className="mb-8 lg:mb-10"
            />

            <div className="space-y-6 sm:space-y-7">
              {whyUs.points.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  {/* Cyan bullet indicator */}
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan mt-1.5 shrink-0 shadow-2xs" />
                  <div>
                    <h3 className="font-display text-base font-bold text-navy leading-snug">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-body">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 480x340 Image with Caption */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[480px] rounded-[8px] overflow-hidden border border-line shadow-card bg-surface p-2.5">
              <div className="relative aspect-[480/340] w-full rounded-[6px] overflow-hidden bg-navy-800">
                <Image
                  src={whyUs.image || "/images/why-us-team.jpg"}
                  alt="Tim pelaksana PT Pragata Makmur Persada di lapangan"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className="object-cover object-center"
                />
              </div>
              <p className="mt-2.5 text-center text-xs text-body font-medium italic">
                {whyUs.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

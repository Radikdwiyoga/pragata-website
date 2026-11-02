import * as React from "react";
import Image from "next/image";
import { siteContent, type SiteContent, type PartnerItem } from "@/content/site";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  content?: SiteContent["hero"];
}

export function Hero({ content }: HeroProps = {}) {
  const hero = content || siteContent.hero;
  const partnersList: readonly PartnerItem[] = (hero.partners && hero.partners.length > 0)
    ? hero.partners
    : (siteContent.hero.partners || []);

  // Duplicate partner list for seamless infinite marquee scroll
  const marqueeItems = [...partnersList, ...partnersList];

  return (
    <section
      id="tentang"
      className="relative bg-navy text-white overflow-hidden py-16 sm:py-20 lg:py-[120px]"
    >
      {/* Decorative ambient circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[15%] w-[520px] h-[520px] rounded-full bg-[#122f55] opacity-50 blur-[90px]"
      />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 7/12 Desktop */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan mb-4">
              {hero.eyebrow}
            </span>

            {/* H1 */}
            <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.15] text-white tracking-tight">
              {hero.h1}
            </h1>

            {/* Subtext */}
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-relaxed text-on-navy-muted max-w-[560px]">
              {hero.subtext}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="outline-white"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Trust line with Continuous Running Auto-slide Marquee */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-navy-700/60 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-on-navy-dim font-medium tracking-wide">
                  {hero.trustLabel}
                </p>
                <span className="text-[10px] text-cyan font-medium hidden sm:inline tracking-wider uppercase">
                  Mitra & Klien
                </span>
              </div>

              {/* Running Marquee Container with edge gradients */}
              <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="animate-marquee-scroll flex items-center gap-3 sm:gap-3.5">
                  {marqueeItems.map((partner: PartnerItem, index: number) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="h-10 px-4 rounded-[6px] border border-white/12 bg-white/6 hover:bg-white/12 hover:border-cyan/50 transition-all duration-200 flex items-center gap-2.5 shrink-0 shadow-2xs group/partner cursor-default"
                      title={partner.name}
                    >
                      {partner.logo ? (
                        <div className="relative h-6 w-24 flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={96}
                            height={24}
                            className="max-h-6 w-auto object-contain filter brightness-90 group-hover/partner:brightness-100 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan group-hover/partner:scale-125 transition-transform shrink-0" />
                          <span className="text-xs font-semibold tracking-wider text-white/90 whitespace-nowrap group-hover/partner:text-white">
                            {partner.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5/12 Desktop Visual Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] rounded-[12px] border border-[#24507F] bg-navy-800/80 p-3.5 shadow-2xl backdrop-blur-xs">
              <div className="relative aspect-[440/320] w-full rounded-[8px] overflow-hidden bg-navy-900">
                <Image
                  src={hero.image || "/images/hero-fiber-optic.jpg"}
                  alt={hero.visualCaption.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="mt-3.5 px-1 pb-1">
                <p className="text-xs font-semibold text-white">
                  {hero.visualCaption.title}
                </p>
                <p className="text-[11px] font-medium text-cyan tracking-wider mt-0.5 uppercase">
                  {hero.visualCaption.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

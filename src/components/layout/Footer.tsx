"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteContent, type SiteContent } from "@/content/site";

interface FooterProps {
  content?: SiteContent["footer"];
  contactInfo?: SiteContent["contact"]["info"];
}

export function Footer({ content, contactInfo }: FooterProps = {}) {
  const footer = content || siteContent.footer;
  const info = contactInfo || siteContent.contact.info;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <footer className="bg-navy-900 text-[#8FA3B6] border-t border-navy-800">
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Identity & Address (4/12) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-cyan"
              aria-label="PT Pragata Makmur Persada - Beranda"
            >
              <div className="relative w-10 h-10 shrink-0 rounded-[6px] bg-white p-0.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/Logo-pragata.jpg"
                  alt="Logo PT Pragata Makmur Persada"
                  width={38}
                  height={38}
                  className="w-full h-full object-contain rounded-[4px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-base leading-tight tracking-[0.08em]">
                  {footer.wordmark}
                </span>
                <span className="text-[10px] text-cyan font-medium leading-none tracking-[0.16em] uppercase">
                  MAKMUR PERSADA
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs font-semibold text-white/90">
              {footer.companyName}
            </p>

            <div className="mt-3 text-xs leading-relaxed text-[#8FA3B6] space-y-0.5">
              {footer.addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <div className="pt-2">
                <a
                  href={
                    info.mapsUrl ||
                    "https://maps.google.com/?q=Epicentrum+Walk+Kuningan+Jakarta+Selatan"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan hover:underline"
                >
                  📍 Buka di Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Perusahaan (2/12) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white mb-4">
              {footer.columns.company.title}
            </p>
            <ul className="space-y-2.5 text-xs">
              {footer.columns.company.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="hover:text-cyan transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Layanan (3/12) */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white mb-4">
              {footer.columns.services.title}
            </p>
            <ul className="space-y-2.5 text-xs">
              {footer.columns.services.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="hover:text-cyan transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak (3/12) */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white mb-4">
              {footer.columns.contact.title}
            </p>
            <ul className="space-y-2.5 text-xs">
              {footer.columns.contact.links.map((link) => {
                const isLinkedIn = link.label.toLowerCase().includes("linkedin");
                const href = isLinkedIn
                  ? info.linkedIn || link.href
                  : link.href;
                return (
                  <li key={link.label}>
                    <a
                      href={href}
                      onClick={(e) => handleAnchorClick(e, href)}
                      className="hover:text-cyan transition-colors"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{footer.copyright}</p>
          <p className="text-[#8FA3B6]/80">{footer.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}

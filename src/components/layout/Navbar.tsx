"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteContent, type SiteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface NavbarProps {
  content?: SiteContent["nav"];
  wordmark?: string;
}

export function Navbar({ content, wordmark }: NavbarProps = {}) {
  const nav = content || siteContent.nav;
  const brandWordmark = wordmark || siteContent.footer.wordmark;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[76px] w-full bg-white border-b border-line transition-shadow duration-200",
        isScrolled && "shadow-xs"
      )}
    >
      <div className="container-site h-full flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-cyan"
          aria-label="PT Pragata Makmur Persada - Beranda"
        >
          <div className="relative w-10 h-10 shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/Logo-pragata.jpg"
              alt="Logo PT Pragata Makmur Persada"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-[4px]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-navy text-[15px] leading-tight tracking-[0.08em]">
              {brandWordmark}
            </span>
            <span className="text-[10px] text-body font-medium leading-none tracking-[0.16em] uppercase">
              MAKMUR PERSADA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Navigasi Utama"
        >
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-body hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-cyan py-1 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button href={nav.cta.href} size="sm">
            {nav.cta.label}
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-navy hover:text-cyan transition-colors focus-visible:outline-2 focus-visible:outline-cyan cursor-pointer"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-x-0 top-[76px] bottom-0 bg-navy/60 backdrop-blur-xs z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full bg-white border-b border-line p-6 flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-3" aria-label="Navigasi Mobile">
              {nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-base font-medium text-navy hover:text-cyan py-2 border-b border-line/50 transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2">
              <Button
                href={nav.cta.href}
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                {nav.cta.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

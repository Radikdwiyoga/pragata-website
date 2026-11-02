"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, ArrowRight, X, MessageSquare } from "lucide-react";
import { siteContent, type NewsSection, type NewsItem } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface NewsProps {
  content?: NewsSection;
}

export function News({ content }: NewsProps) {
  const newsData = content || siteContent.news;
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedNews) {
        setSelectedNews(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNews]);

  // Lock body scroll when modal open
  React.useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedNews]);

  if (!newsData || !newsData.items || newsData.items.length === 0) {
    return null;
  }

  const handleContactScroll = () => {
    setSelectedNews(null);
    const contactElem = document.getElementById("kontak");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="berita" className="py-16 lg:py-24 bg-white border-b border-line">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-4">
          <SectionHeading
            eyebrow={newsData.label}
            title={newsData.h2}
            subtext={newsData.subtext}
            className="mb-0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsData.items.map((item: NewsItem) => (
            <Card
              key={item.id}
              hoverEffect
              as="article"
              onClick={() => setSelectedNews(item)}
              className="overflow-hidden bg-surface border-line flex flex-col group h-full cursor-pointer transition-all duration-200 hover:shadow-card-hover"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-800">
                <Image
                  src={item.image || "/images/project-fiber-optic.jpg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="cyan" size="sm" className="font-semibold shadow-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-body mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-navy leading-snug group-hover:text-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-body line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-line/60">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNews(item);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:text-cyan-600 transition-colors group/link cursor-pointer"
                  >
                    <span>Informasi Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* POP-UP WINDOW / MODAL BERITA */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-news-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-line overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] w-full shrink-0 bg-navy-900 overflow-hidden">
              <Image
                src={selectedNews.image || "/images/project-fiber-optic.jpg"}
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
              
              {/* Close Button top-right */}
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                aria-label="Tutup jendela berita"
                className="absolute top-4 right-4 p-2 rounded-full bg-navy/80 hover:bg-navy text-white transition-colors cursor-pointer focus-visible:outline-cyan"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <Badge variant="cyan" size="sm" className="mb-2">
                  {selectedNews.category}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-on-navy-muted">
                  <Calendar className="w-3.5 h-3.5 text-cyan" />
                  <span>{selectedNews.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <h2
                id="modal-news-title"
                className="font-display text-xl sm:text-2xl font-bold text-navy leading-snug"
              >
                {selectedNews.title}
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-body leading-relaxed">
                {(selectedNews.content || selectedNews.summary)
                  .split("\n\n")
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-line text-xs font-semibold text-body hover:text-navy hover:bg-surface transition-colors cursor-pointer text-center"
                >
                  Tutup Jendela
                </button>

                <button
                  type="button"
                  onClick={handleContactScroll}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-cyan hover:bg-cyan-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasikan Kebutuhan Proyek</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

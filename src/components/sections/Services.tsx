"use client";

import * as React from "react";
import {
  ArrowRight,
  X,
  CheckCircle2,
  FileCheck,
  Wrench,
  MessageSquare,
  Cable,
  Radio,
  Compass,
  Server,
  Network,
} from "lucide-react";
import { siteContent, type SiteContent, type ServiceItem } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

interface ServicesProps {
  content?: SiteContent["services"];
}

function getServiceIcon(id: string, className = "w-6 h-6") {
  switch (id) {
    case "01":
      return <Cable className={className} />;
    case "02":
      return <Radio className={className} />;
    case "03":
      return <Compass className={className} />;
    case "04":
      return <Server className={className} />;
    default:
      return <Network className={className} />;
  }
}

export function Services({ content }: ServicesProps = {}) {
  const services = content || siteContent.services;
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedService) {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  // Lock body scroll when modal open
  React.useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  const handleConsultService = (serviceTitle: string) => {
    setSelectedService(null);
    const selectElem = document.getElementById("form-job-type") as HTMLSelectElement | null;
    if (selectElem) {
      for (let i = 0; i < selectElem.options.length; i++) {
        if (
          selectElem.options[i].value.toLowerCase().includes(serviceTitle.toLowerCase()) ||
          serviceTitle.toLowerCase().includes(selectElem.options[i].value.toLowerCase())
        ) {
          selectElem.selectedIndex = i;
          selectElem.dispatchEvent(new Event("change", { bubbles: true }));
          break;
        }
      }
    }
    const contactElem = document.getElementById("kontak");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="layanan" className="py-16 lg:py-24 bg-white border-b border-line">
      <div className="container-site">
        <SectionHeading
          eyebrow={services.label}
          title={services.h2}
          subtext={services.subtext}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((service) => (
            <Card
              key={service.id}
              hoverEffect
              as="article"
              onClick={() => setSelectedService(service)}
              className="p-6 bg-surface flex flex-col justify-between h-full border-line cursor-pointer group transition-all duration-300 hover:shadow-card-hover hover:border-cyan/40"
            >
              <div>
                {/* Modern Symbol Icon Box */}
                <div className="w-12 h-12 rounded-[10px] bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan shadow-2xs group-hover:bg-cyan group-hover:text-white group-hover:scale-105 group-hover:border-cyan transition-all duration-300">
                  {getServiceIcon(service.id, "w-6 h-6")}
                </div>

                {/* Title */}
                <h3 className="mt-5 font-display text-lg font-bold text-navy leading-snug group-hover:text-cyan transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-[13px] leading-relaxed text-body">
                  {service.description}
                </p>
              </div>

              {/* Action Link Button */}
              <div className="mt-6 pt-4 border-t border-line/60">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:text-cyan-600 transition-colors group/btn cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* POP-UP WINDOW / MODAL DETAIL LAYANAN */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-line overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-navy p-6 text-white relative shrink-0">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Tutup jendela layanan"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-[8px] bg-cyan/20 border border-cyan/40 text-cyan flex items-center justify-center">
                  {getServiceIcon(selectedService.id, "w-5 h-5")}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cyan">
                  PAKET PEKERJAAN
                </span>
              </div>

              <h2
                id="modal-service-title"
                className="font-display text-2xl font-bold text-white tracking-tight"
              >
                {selectedService.title}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-body mb-2">
                  Uraian Teknis
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed text-navy font-medium">
                  {selectedService.fullDescription || selectedService.description}
                </p>
              </div>

              {/* Details List */}
              {selectedService.details && selectedService.details.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-body mb-3 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-cyan" />
                    <span>Ruang Lingkup & Metode Kerja</span>
                  </h3>
                  <div className="space-y-2.5">
                    {selectedService.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-body">
                        <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables List */}
              {selectedService.deliverables && selectedService.deliverables.length > 0 && (
                <div className="p-4 rounded-lg bg-surface border border-line">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-cyan" />
                    <span>Laporan & Deliverables Hasil Pekerjaan</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-body list-disc list-inside">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-line text-xs font-semibold text-body hover:text-navy hover:bg-surface transition-colors cursor-pointer text-center"
                >
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={() => handleConsultService(selectedService.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-cyan hover:bg-cyan-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasikan Paket Ini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

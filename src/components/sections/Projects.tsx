"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, X, Briefcase, Calendar, MessageSquare, CheckCircle2 } from "lucide-react";
import { siteContent, type SiteContent, type ProjectItem } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ProjectsProps {
  content?: SiteContent["projects"];
}

export function Projects({ content }: ProjectsProps = {}) {
  const projects = content || siteContent.projects;
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // Lock body scroll when modal open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleConsultProject = (projectTitle: string) => {
    setSelectedProject(null);
    const messageElem = document.getElementById("form-message") as HTMLTextAreaElement | null;
    if (messageElem && !messageElem.value) {
      messageElem.value = `Halo PT Pragata Makmur Persada, kami tertarik untuk mendiskusikan lingkup proyek serupa dengan "${projectTitle}". Mohon informasi pendekatan teknis dan estimasinya.`;
      messageElem.dispatchEvent(new Event("input", { bubbles: true }));
    }
    const contactElem = document.getElementById("kontak");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactScroll = () => {
    const contactElem = document.getElementById("kontak");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="proyek" className="py-16 lg:py-24 bg-surface border-b border-line">
      <div className="container-site">
        {/* Header with Title on Left and Link on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan block mb-2">
              {projects.label}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-navy leading-tight tracking-tight">
              {projects.h2}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleContactScroll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan hover:text-cyan-600 transition-colors group focus-visible:outline-2 focus-visible:outline-cyan cursor-pointer text-left self-start md:self-end"
          >
            <span>{projects.linkAll.label.replace(" →", "")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.items.map((project) => (
            <Card
              key={project.id}
              hoverEffect
              as="article"
              onClick={() => setSelectedProject(project)}
              className="overflow-hidden bg-white border-line flex flex-col cursor-pointer group transition-all duration-200 hover:shadow-card-hover"
            >
              {/* Image 16:9 */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-800">
                <Image
                  src={project.image}
                  alt={`Proyek: ${project.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="cyan" size="sm" className="font-semibold shadow-xs">
                    {project.tag}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-[17px] font-bold text-navy leading-snug group-hover:text-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-body font-medium">
                    {project.clientMeta}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-line/60">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:text-cyan-600 transition-colors group/link cursor-pointer"
                  >
                    <span>Konsultasi Proyek Serupa</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* POP-UP WINDOW / MODAL DETAIL PROYEK */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-line overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full shrink-0 bg-navy-900 overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup jendela proyek"
                className="absolute top-4 right-4 p-2 rounded-full bg-navy/80 hover:bg-navy text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <Badge variant="cyan" size="sm" className="mb-2">
                  {selectedProject.tag}
                </Badge>
                <p className="text-xs text-white/90 font-medium">
                  {selectedProject.clientMeta}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <h2
                id="modal-project-title"
                className="font-display text-xl sm:text-2xl font-bold text-navy leading-snug"
              >
                {selectedProject.title}
              </h2>

              <p className="text-sm leading-relaxed text-body">
                Paket pekerjaan infrastruktur telekomunikasi ini dieksekusi oleh tim teknis PT Pragata Makmur Persada dengan kepatuhan terhadap spesifikasi teknis, standar keselamatan K3, dan tenggat waktu pelaksanaan yang ditetapkan oleh pemilik proyek.
              </p>

              <div className="p-4 rounded-lg bg-surface border border-line space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                  Keunggulan Eksekusi
                </h3>
                <div className="space-y-1.5 text-xs text-body">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Dikerjakan dengan SDM bersertifikasi dan peralatan milik sendiri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Pengawasan harian dan pelaporan progres berkala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Hasil uji kelayakan teknis memenuhi standar operator nasional</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-line text-xs font-semibold text-body hover:text-navy hover:bg-surface transition-colors cursor-pointer text-center"
                >
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={() => handleConsultProject(selectedProject.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-cyan hover:bg-cyan-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Diskusikan Proyek Serupa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

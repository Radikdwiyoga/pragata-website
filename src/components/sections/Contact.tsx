"use client";

import * as React from "react";
import { siteContent, type SiteContent } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MapPin, Mail, Phone, Briefcase, Send, CheckCircle2 } from "lucide-react";

interface ContactProps {
  content?: SiteContent["contact"];
  careers?: SiteContent["careers"];
}

export function Contact({ content, careers: careersProp }: ContactProps = {}) {
  const contact = content || siteContent.contact;
  const careers = careersProp || siteContent.careers;
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    jobType: "Fiber Optik",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="py-16 lg:py-24 bg-surface">
      <div className="container-site">
        <SectionHeading
          eyebrow="KONTAK"
          title={contact.title}
          subtext={contact.subtext}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form: 7/12 Desktop */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white border-line">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 text-cyan mb-3" />
                  <h3 className="font-display text-xl font-bold text-navy">
                    Permintaan Terkirim
                  </h3>
                  <p className="mt-2 text-sm text-body max-w-md">
                    Terima kasih telah menghubungi PT Pragata Makmur Persada.
                    Tim kami akan segera mempelajari lingkup pekerjaan Anda dan menghubungi kembali.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-name"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Nama Lengkap <span className="text-cyan">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Contoh: Budi Santoso"
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="form-company"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Perusahaan
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Nama instansi / PT"
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Email Bisnis <span className="text-cyan">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="budi@perusahaan.com"
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="form-phone"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Nomor Telepon
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+62 812..."
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-job-type"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Jenis Pekerjaan
                      </label>
                      <select
                        id="form-job-type"
                        value={formData.jobType}
                        onChange={(e) =>
                          setFormData({ ...formData, jobType: e.target.value })
                        }
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors cursor-pointer"
                      >
                        {contact.serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="form-location"
                        className="block text-xs font-semibold text-navy mb-1.5"
                      >
                        Lokasi Proyek
                      </label>
                      <input
                        id="form-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Kota / Provinsi pelaksanaan"
                        className="w-full h-10 px-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="form-message"
                      className="block text-xs font-semibold text-navy mb-1.5"
                    >
                      Ringkasan Lingkup Pekerjaan <span className="text-cyan">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Jelaskan volume, target waktu, dan detail spesifikasi pekerjaan..."
                      className="w-full p-3 text-sm rounded-[4px] border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy transition-colors placeholder:text-muted resize-y"
                    />
                  </div>

                  <Button type="submit" size="md" className="w-full sm:w-auto mt-2">
                    <Send className="w-4 h-4 mr-1.5" />
                    {contact.submitButton}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Details & Career Card: 5/12 Desktop */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Contact Details Card */}
            <Card className="p-6 bg-white border-line">
              <h3 className="font-display text-base font-bold text-navy mb-4">
                Informasi Kantor Pusat
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan mt-1 shrink-0" />
                  <p className="text-body leading-relaxed">{contact.info.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan shrink-0" />
                  <a
                    href={`mailto:${contact.info.email}`}
                    className="text-body hover:text-navy transition-colors font-medium"
                  >
                    {contact.info.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan shrink-0" />
                  <a
                    href={`tel:${contact.info.phone.replace(/\s+/g, "")}`}
                    className="text-body hover:text-navy transition-colors font-medium"
                  >
                    {contact.info.phone}
                  </a>
                </div>
              </div>
            </Card>

            {/* Careers Section Card */}
            <div id="karier">
              <Card className="p-6 bg-navy text-white border-navy-700">
                <div className="flex items-center gap-2 text-cyan mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    KARIER
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {careers.h2}
                </h3>
                <p className="text-xs text-on-navy-muted leading-relaxed mb-5">
                  {careers.subtext}
                </p>
                <Button
                  href={careers.cta.href}
                  isExternal
                  variant="outline-white"
                  size="sm"
                  className="w-full justify-center"
                >
                  {careers.cta.label}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

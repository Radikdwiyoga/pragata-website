"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Save,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Building2,
  Layers,
  Briefcase,
  Newspaper,
  BarChart3,
  Image as ImageIcon,
  Eye,
  ShieldCheck,
  ChevronRight,
  Cable,
  Radio,
  Compass,
  Server,
  Handshake,
} from "lucide-react";
import type { SiteContent, ProjectItem, NewsItem, ServiceItem, StatItem, WhyUsPoint, PartnerItem } from "@/content/site";

type TabKey = "hero" | "partners" | "news" | "projects" | "services" | "whyUs" | "contact";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<TabKey>("hero");
  const [content, setContent] = React.useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{ text: string; type: "success" | "error" } | null>(null);
  const [uploadingField, setUploadingField] = React.useState<string | null>(null);

  // Check auth on load
  React.useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadContent();
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      } catch {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function loadContent() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (e) {
      console.error(e);
      showNotification("Gagal memuat data konten", "error");
    } finally {
      setIsLoading(false);
    }
  }

  function showNotification(text: string, type: "success" | "error" = "success") {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadContent();
      } else {
        setAuthError(data.message || "Kata sandi salah");
      }
    } catch {
      setAuthError("Gagal terhubung ke server");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setPasswordInput("");
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSave() {
    if (!content) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Semua perubahan konten berhasil disimpan!", "success");
      } else {
        showNotification(data.message || "Gagal menyimpan konten", "error");
      }
    } catch {
      showNotification("Terjadi kesalahan jaringan saat menyimpan", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleResetDefault() {
    if (!confirm("Apakah Anda yakin ingin mengembalikan semua isi konten ke pengaturan awal? Perubahan kustom akan di-reset.")) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setContent(data.content);
        showNotification("Konten berhasil di-reset ke nilai default awal!", "success");
      }
    } catch {
      showNotification("Gagal me-reset konten", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void, fieldId: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldId);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onComplete(data.url);
        showNotification("Foto berhasil diunggah!", "success");
      } else {
        showNotification(data.message || "Gagal upload gambar", "error");
      }
    } catch {
      showNotification("Terjadi kesalahan saat upload", "error");
    } finally {
      setUploadingField(null);
    }
  }

  // --- LOGIN SCREEN ---
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-line">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-xl bg-navy/5 mb-3">
              <Image
                src="/images/Logo-pragata.jpg"
                alt="Logo PT Pragata Makmur Persada"
                width={56}
                height={56}
                className="rounded-md object-contain"
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Panel Pengelola Konten
            </h1>
            <p className="text-xs text-body mt-1">
              PT Pragata Makmur Persada — Content Management
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Kata Sandi Admin
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Masukkan kata sandi..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full h-11 px-3.5 pl-10 text-sm rounded-md border border-line bg-surface focus:bg-white focus:outline-2 focus:outline-cyan text-navy"
                />
                <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-body mt-1.5">
                Default sandi: <code className="bg-surface px-1 py-0.5 rounded font-mono text-navy font-semibold">pragata2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-11 bg-cyan hover:bg-cyan-600 text-white font-semibold text-sm rounded-md shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoggingIn ? "Memeriksa..." : "Masuk ke Panel Admin"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-line text-center">
            <Link
              href="/"
              className="text-xs text-body hover:text-cyan transition-colors inline-flex items-center gap-1"
            >
              ← Kembali ke Beranda Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-cyan animate-spin mx-auto mb-2" />
          <p className="text-sm font-medium text-navy">Memuat Panel Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-navy text-white shadow-md border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-md bg-white p-0.5 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/Logo-pragata.jpg"
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wide text-white">
                  PRAGATA CMS
                </span>
                <span className="text-[10px] bg-cyan/20 text-cyan border border-cyan/40 px-2 py-0.5 rounded font-semibold uppercase">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-on-navy-muted hidden sm:block">
                Edit Konten Website & Foto Secara Langsung
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pratinjau</span> Website
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-cyan hover:bg-cyan-600 rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-on-navy-dim hover:text-white transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold transition-all ${
            statusMessage.type === "success"
              ? "bg-navy text-white border-l-4 border-cyan"
              : "bg-red-600 text-white"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-cyan" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-grow flex flex-col md:flex-row gap-6">
        {/* Left Navigation Sidebar / Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg border border-line p-2 shadow-xs sticky top-22">
            <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
              Navigasi Konten
            </p>
            <nav className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("hero")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "hero"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Banner Hero & Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("partners")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "partners"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Handshake className="w-4 h-4 shrink-0" />
                  <span>Partner & Klien</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan/20 text-cyan">
                  {content.hero.partners?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("news")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "news"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Newspaper className="w-4 h-4 shrink-0" />
                  <span>Berita & Update</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan/20 text-cyan">
                  {content.news?.items?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Portofolio Proyek</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan/20 text-cyan">
                  {content.projects.items.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "services"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Lini Layanan (4)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("whyUs")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "whyUs"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>Statistik & Keunggulan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeTab === "contact"
                    ? "bg-navy text-white"
                    : "text-body hover:bg-surface hover:text-navy"
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Info Kantor & Kontak</span>
              </button>
            </nav>

            <div className="mt-4 pt-3 border-t border-line">
              <button
                type="button"
                onClick={handleResetDefault}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset ke Default</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Editor Workspace */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: HERO & BANNER */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <h2 className="font-display text-lg font-bold text-navy mb-1 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-cyan" />
                  Banner Hero Utama
                </h2>
                <p className="text-xs text-body mb-6">
                  Ubah teks judul besar, deskripsi, dan foto utama yang tampil di bagian atas website.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">
                      Teks Eyebrow (Label Kecil di Atas Judul)
                    </label>
                    <input
                      type="text"
                      value={content.hero.eyebrow}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, eyebrow: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 text-sm rounded border border-line bg-surface text-navy focus:bg-white focus:outline-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">
                      Judul Utama (H1)
                    </label>
                    <textarea
                      rows={2}
                      value={content.hero.h1}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, h1: e.target.value },
                        })
                      }
                      className="w-full p-3 text-sm rounded border border-line bg-surface text-navy focus:bg-white focus:outline-cyan font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">
                      Subteks / Deskripsi Hero
                    </label>
                    <textarea
                      rows={3}
                      value={content.hero.subtext}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, subtext: e.target.value },
                        })
                      }
                      className="w-full p-3 text-sm rounded border border-line bg-surface text-navy focus:bg-white focus:outline-cyan"
                    />
                  </div>

                  <div className="pt-4 border-t border-line">
                    <label className="block text-xs font-bold text-navy mb-2">
                      Foto Utama Hero
                    </label>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="relative aspect-[16/10] w-48 rounded-lg overflow-hidden bg-navy-800 border border-line shrink-0">
                        <Image
                          src={content.hero.image || "/images/hero-fiber-optic.jpg"}
                          alt="Hero Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <label className="block text-[11px] font-medium text-body mb-1">
                            URL Gambar atau Path
                          </label>
                          <input
                            type="text"
                            value={content.hero.image || "/images/hero-fiber-optic.jpg"}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                hero: { ...content.hero, image: e.target.value },
                              })
                            }
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy font-mono"
                          />
                        </div>
                        <div>
                          <label className="inline-flex items-center gap-2 px-3 py-2 bg-navy text-white text-xs font-semibold rounded cursor-pointer hover:bg-navy-800 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {uploadingField === "hero-img" ? "Mengunggah..." : "Upload Foto Baru"}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url) =>
                                    setContent({
                                      ...content,
                                      hero: { ...content.hero, image: url },
                                    }),
                                  "hero-img"
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Caption Foto (Judul)
                      </label>
                      <input
                        type="text"
                        value={content.hero.visualCaption.title}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              visualCaption: {
                                ...content.hero.visualCaption,
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Caption Foto (Subjudul / Lokasi)
                      </label>
                      <input
                        type="text"
                        value={content.hero.visualCaption.subtitle}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              visualCaption: {
                                ...content.hero.visualCaption,
                                subtitle: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PARTNER & KLIEN */}
          {activeTab === "partners" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-line">
                  <div>
                    <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                      <Handshake className="w-5 h-5 text-cyan" />
                      Partner, Operator Telekomunikasi & Klien
                    </h2>
                    <p className="text-xs text-body mt-0.5">
                      Kelola daftar mitra dan logo perusahaan. Jika jumlahnya banyak, daftar akan bergeser otomatis (running marquee).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newPartner: PartnerItem = {
                        id: `partner-${Date.now()}`,
                        name: "Nama Partner Baru",
                        logo: "",
                      };
                      const currentPartners = content.hero.partners || [];
                      setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          partners: [...currentPartners, newPartner],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-navy hover:bg-navy-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Partner Baru</span>
                  </button>
                </div>

                {/* Trust Label input */}
                <div className="mb-6 p-4 rounded-lg bg-surface border border-line">
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Teks Label Pengantar Partner (Trust Label)
                  </label>
                  <input
                    type="text"
                    value={content.hero.trustLabel}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustLabel: e.target.value },
                      })
                    }
                    className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-medium"
                    placeholder="Contoh: Dipercaya oleh operator telekomunikasi, ISP, dan pemilik proyek"
                  />
                  <p className="text-[11px] text-muted mt-1">
                    Teks ini muncul di atas barisan logo partner di halaman beranda.
                  </p>
                </div>

                {/* Partners List (Vertical Downward Flow for smooth mobile & desktop view) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Daftar Logo & Nama Partner ({content.hero.partners?.length || 0})
                    </h3>
                    <span className="text-[11px] text-muted">
                      Tersusun ke bawah untuk tampilan rapi di semua layar
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {(content.hero.partners || []).map((partner, index) => (
                      <div
                        key={partner.id}
                        className="p-4 sm:p-5 rounded-lg border border-line bg-surface/60 flex flex-col gap-3.5 relative group hover:border-cyan/40 transition-colors shadow-2xs"
                      >
                        <div className="flex items-center justify-between pb-2.5 border-b border-line/60">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold text-navy bg-white border border-line px-2.5 py-0.5 rounded shadow-2xs">
                              Partner #{index + 1}
                            </span>
                            <span className="text-xs font-semibold text-body truncate max-w-[200px] sm:max-w-md">
                              {partner.name || "Belum ada nama"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus partner "${partner.name}"?`)) {
                                const updated = (content.hero.partners || []).filter((_, i) => i !== index);
                                setContent({
                                  ...content,
                                  hero: { ...content.hero, partners: updated },
                                });
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded transition-colors cursor-pointer"
                            title="Hapus Partner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-medium hidden sm:inline">Hapus</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Nama Partner: 5/12 */}
                          <div className="md:col-span-5">
                            <label className="block text-[11px] font-bold text-navy mb-1">
                              Nama Partner / Operator
                            </label>
                            <input
                              type="text"
                              value={partner.name}
                              onChange={(e) => {
                                const updated = [...(content.hero.partners || [])];
                                updated[index] = { ...updated[index], name: e.target.value };
                                setContent({
                                  ...content,
                                  hero: { ...content.hero, partners: updated },
                                });
                              }}
                              className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-semibold focus:outline-cyan"
                              placeholder="Contoh: Telkom Indonesia"
                            />
                          </div>

                          {/* Logo Partner: 7/12 */}
                          <div className="md:col-span-7">
                            <label className="block text-[11px] font-bold text-navy mb-1">
                              Logo / Gambar Partner
                            </label>
                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                              {partner.logo ? (
                                <div className="relative w-14 h-9 rounded border border-line bg-navy/90 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                                  <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={48}
                                    height={26}
                                    className="max-h-7 w-auto object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="w-14 h-9 rounded border border-line bg-white flex items-center justify-center text-[10px] text-muted font-bold shrink-0 shadow-2xs">
                                  Teks
                                </div>
                              )}

                              <input
                                type="text"
                                value={partner.logo || ""}
                                onChange={(e) => {
                                  const updated = [...(content.hero.partners || [])];
                                  updated[index] = { ...updated[index], logo: e.target.value };
                                  setContent({
                                    ...content,
                                    hero: { ...content.hero, partners: updated },
                                  });
                                }}
                                placeholder="Path gambar / upload logo..."
                                className="flex-1 min-w-[140px] h-9 px-2.5 text-xs rounded border border-line bg-white text-navy font-mono focus:outline-cyan"
                              />

                              <label className="shrink-0 px-3 py-2 bg-cyan hover:bg-cyan-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      e,
                                      (url) => {
                                        const updated = [...(content.hero.partners || [])];
                                        updated[index] = { ...updated[index], logo: url };
                                        setContent({
                                          ...content,
                                          hero: { ...content.hero, partners: updated },
                                        });
                                      },
                                      `partner-logo-${index}`
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Preview of Marquee */}
                <div className="mt-8 pt-6 border-t border-line">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy mb-3">
                    Pratinjau Animasi Ticker Auto-Slide di Beranda
                  </h3>
                  <div className="p-4 rounded-xl bg-navy text-white overflow-hidden">
                    <p className="text-xs text-on-navy-dim mb-3 font-medium">
                      {content.hero.trustLabel}
                    </p>
                    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                      <div className="animate-marquee-scroll flex items-center gap-3">
                        {[...(content.hero.partners || []), ...(content.hero.partners || [])].map((p, idx) => (
                          <div
                            key={idx}
                            className="h-9 px-3.5 rounded border border-white/12 bg-white/6 flex items-center gap-2 shrink-0"
                          >
                            {p.logo ? (
                              <div className="relative h-5 w-20 flex items-center justify-center">
                                <Image
                                  src={p.logo}
                                  alt={p.name}
                                  width={80}
                                  height={20}
                                  className="max-h-5 w-auto object-contain brightness-90"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan shrink-0" />
                                <span className="text-[11px] font-semibold tracking-wider text-white whitespace-nowrap">
                                  {p.name}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BERITA & UPDATE */}
          {activeTab === "news" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-cyan" />
                      Berita, Publikasi & Update Proyek
                    </h2>
                    <p className="text-xs text-body">
                      Tambah, ubah, atau hapus artikel dan berita terkini perusahaan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newNews: NewsItem = {
                        id: `news-${Date.now()}`,
                        title: "Judul Berita Baru",
                        date: new Date().toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                        category: "Update Proyek",
                        summary: "Ringkasan informasi atau pencapaian terbaru proyek...",
                        image: "/images/project-fiber-optic.jpg",
                      };
                      setContent({
                        ...content,
                        news: {
                          ...content.news,
                          items: [newNews, ...(content.news?.items || [])],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-navy hover:bg-navy-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Berita Baru</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {content.news?.items?.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-lg border border-line bg-surface/60 space-y-4 relative"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-navy bg-white border border-line px-2.5 py-1 rounded">
                          Berita #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Hapus berita ini?")) {
                              const updated = content.news.items.filter((_, i) => i !== index);
                              setContent({
                                ...content,
                                news: { ...content.news, items: updated },
                              });
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Judul Berita
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...content.news.items];
                              updated[index] = { ...updated[index], title: e.target.value };
                              setContent({ ...content, news: { ...content.news, items: updated } });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Kategori (Tag)
                          </label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => {
                              const updated = [...content.news.items];
                              updated[index] = { ...updated[index], category: e.target.value };
                              setContent({ ...content, news: { ...content.news, items: updated } });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Tanggal Rilis
                          </label>
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const updated = [...content.news.items];
                              updated[index] = { ...updated[index], date: e.target.value };
                              setContent({ ...content, news: { ...content.news, items: updated } });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Foto Berita
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) => {
                                const updated = [...content.news.items];
                                updated[index] = { ...updated[index], image: e.target.value };
                                setContent({ ...content, news: { ...content.news, items: updated } });
                              }}
                              className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-mono"
                            />
                            <label className="shrink-0 px-2.5 py-1.5 bg-cyan hover:bg-cyan-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1">
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    e,
                                    (url) => {
                                      const updated = [...content.news.items];
                                      updated[index] = { ...updated[index], image: url };
                                      setContent({
                                        ...content,
                                        news: { ...content.news, items: updated },
                                      });
                                    },
                                    `news-img-${index}`
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1">
                          Ringkasan Isi Berita (Tampil di Kartu Depan)
                        </label>
                        <textarea
                          rows={2}
                          value={item.summary}
                          onChange={(e) => {
                            const updated = [...content.news.items];
                            updated[index] = { ...updated[index], summary: e.target.value };
                            setContent({ ...content, news: { ...content.news, items: updated } });
                          }}
                          className="w-full p-2.5 text-xs rounded border border-line bg-white text-navy"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1">
                          Konten Artikel Lengkap (Tampil di Pop-up Window Selengkapnya)
                        </label>
                        <textarea
                          rows={4}
                          value={item.content || item.summary}
                          onChange={(e) => {
                            const updated = [...content.news.items];
                            updated[index] = { ...updated[index], content: e.target.value };
                            setContent({ ...content, news: { ...content.news, items: updated } });
                          }}
                          placeholder="Tulis artikel lengkap di sini. Gunakan baris baru dua kali untuk memisahkan paragraf..."
                          className="w-full p-2.5 text-xs rounded border border-line bg-white text-navy font-normal"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PORTOFOLIO PROYEK */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-cyan" />
                      Portofolio Pelaksanaan Proyek
                    </h2>
                    <p className="text-xs text-body">
                      Kelola proyek-proyek yang dipamerkan di halaman depan, lengkap dengan foto site.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newProject: ProjectItem = {
                        id: `p-${Date.now()}`,
                        title: "Proyek Telekomunikasi Baru",
                        clientMeta: "Klien: Operator Telekomunikasi · 2026",
                        tag: "Fiber Optik",
                        image: "/images/project-fiber-optic.jpg",
                      };
                      setContent({
                        ...content,
                        projects: {
                          ...content.projects,
                          items: [...content.projects.items, newProject],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-navy hover:bg-navy-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Proyek</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {content.projects.items.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-lg border border-line bg-surface/60 space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-navy bg-white border border-line px-2.5 py-1 rounded">
                          Proyek #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Hapus proyek ini?")) {
                              const updated = content.projects.items.filter((_, i) => i !== idx);
                              setContent({
                                ...content,
                                projects: { ...content.projects, items: updated },
                              });
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Nama Proyek
                          </label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...content.projects.items];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setContent({
                                ...content,
                                projects: { ...content.projects, items: updated },
                              });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Kategori (Tag)
                          </label>
                          <input
                            type="text"
                            value={proj.tag}
                            onChange={(e) => {
                              const updated = [...content.projects.items];
                              updated[idx] = { ...updated[idx], tag: e.target.value };
                              setContent({
                                ...content,
                                projects: { ...content.projects, items: updated },
                              });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Klien & Tahun Pelaksanaan
                          </label>
                          <input
                            type="text"
                            value={proj.clientMeta}
                            onChange={(e) => {
                              const updated = [...content.projects.items];
                              updated[idx] = { ...updated[idx], clientMeta: e.target.value };
                              setContent({
                                ...content,
                                projects: { ...content.projects, items: updated },
                              });
                            }}
                            className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy mb-1">
                            Foto Proyek
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => {
                                const updated = [...content.projects.items];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                setContent({
                                  ...content,
                                  projects: { ...content.projects, items: updated },
                                });
                              }}
                              className="w-full h-9 px-3 text-xs rounded border border-line bg-white text-navy font-mono"
                            />
                            <label className="shrink-0 px-2.5 py-1.5 bg-cyan hover:bg-cyan-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1">
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    e,
                                    (url) => {
                                      const updated = [...content.projects.items];
                                      updated[idx] = { ...updated[idx], image: url };
                                      setContent({
                                        ...content,
                                        projects: { ...content.projects, items: updated },
                                      });
                                    },
                                    `proj-img-${idx}`
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LAYANAN */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <h2 className="font-display text-lg font-bold text-navy mb-1 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan" />
                  Empat Lini Layanan Pekerjaan
                </h2>
                <p className="text-xs text-body mb-6">
                  Sesuaikan judul dan uraian lingkup teknis untuk setiap lini pekerjaan telekomunikasi.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {content.services.items.map((svc, i) => (
                    <div
                      key={svc.id}
                      className="p-5 rounded-lg border border-line bg-surface/40 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan text-xs">
                          {svc.id === "01" && <Cable className="w-4 h-4" />}
                          {svc.id === "02" && <Radio className="w-4 h-4" />}
                          {svc.id === "03" && <Compass className="w-4 h-4" />}
                          {svc.id === "04" && <Server className="w-4 h-4" />}
                        </span>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const updated = [...content.services.items];
                            updated[i] = { ...updated[i], title: e.target.value };
                            setContent({
                              ...content,
                              services: { ...content.services, items: updated },
                            });
                          }}
                          className="flex-1 h-9 px-3 text-xs font-bold rounded border border-line bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-body mb-1">
                          Deskripsi Layanan
                        </label>
                        <textarea
                          rows={3}
                          value={svc.description}
                          onChange={(e) => {
                            const updated = [...content.services.items];
                            updated[i] = { ...updated[i], description: e.target.value };
                            setContent({
                              ...content,
                              services: { ...content.services, items: updated },
                            });
                          }}
                          className="w-full p-2.5 text-xs rounded border border-line bg-white text-navy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STATISTIK & KEUNGGULAN */}
          {activeTab === "whyUs" && (
            <div className="space-y-6">
              {/* Statistik */}
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <h2 className="font-display text-lg font-bold text-navy mb-1 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan" />
                  Statistik & Pencapaian
                </h2>
                <p className="text-xs text-body mb-6">
                  Angka-angka pencapaian yang tampil di bar biru navy tengah.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {content.stats.items.map((stat, i) => (
                    <div key={i} className="p-4 rounded border border-line bg-surface space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-body uppercase">
                          Nilai #{i + 1}
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...content.stats.items];
                            updated[i] = { ...updated[i], value: e.target.value };
                            setContent({
                              ...content,
                              stats: { ...content.stats, items: updated },
                            });
                          }}
                          className="w-full h-9 px-2.5 text-sm font-bold rounded border border-line bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-body uppercase">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...content.stats.items];
                            updated[i] = { ...updated[i], label: e.target.value };
                            setContent({
                              ...content,
                              stats: { ...content.stats, items: updated },
                            });
                          }}
                          className="w-full h-8 px-2 text-xs rounded border border-line bg-white text-navy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mengapa Kami */}
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <h3 className="font-display text-base font-bold text-navy mb-1">
                  Keunggulan Procurement (Mengapa Kami)
                </h3>
                <p className="text-xs text-body mb-4">
                  4 Alasan Utama Tim Pengadaan Memilih PT Pragata Makmur Persada.
                </p>

                <div className="space-y-4">
                  {content.whyUs.points.map((pt, i) => (
                    <div key={i} className="p-4 rounded border border-line bg-surface space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan text-white text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <input
                          type="text"
                          value={pt.title}
                          onChange={(e) => {
                            const updated = [...content.whyUs.points];
                            updated[i] = { ...updated[i], title: e.target.value };
                            setContent({
                              ...content,
                              whyUs: { ...content.whyUs, points: updated },
                            });
                          }}
                          className="flex-1 h-8 px-2.5 text-xs font-bold rounded border border-line bg-white text-navy"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={pt.description}
                        onChange={(e) => {
                          const updated = [...content.whyUs.points];
                          updated[i] = { ...updated[i], description: e.target.value };
                          setContent({
                            ...content,
                            whyUs: { ...content.whyUs, points: updated },
                          });
                        }}
                        className="w-full p-2.5 text-xs rounded border border-line bg-white text-navy"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-line">
                  <label className="block text-xs font-bold text-navy mb-2">
                    Foto Lapangan Mengapa Kami
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={content.whyUs.image || "/images/why-us-team.jpg"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyUs: { ...content.whyUs, image: e.target.value },
                        })
                      }
                      className="flex-1 h-9 px-3 text-xs rounded border border-line bg-surface text-navy font-mono"
                    />
                    <label className="px-3 py-2 bg-cyan hover:bg-cyan-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(
                            e,
                            (url) =>
                              setContent({
                                ...content,
                                whyUs: { ...content.whyUs, image: url },
                              }),
                            "whyus-img"
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INFO KANTOR & KONTAK */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-line shadow-xs">
                <h2 className="font-display text-lg font-bold text-navy mb-1 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan" />
                  Informasi Perusahaan & Kontak Resmi
                </h2>
                <p className="text-xs text-body mb-6">
                  Kelola alamat kantor pusat, email bisnis, nomor telepon, dan teks footer.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">
                      Alamat Kantor Pusat
                    </label>
                    <textarea
                      rows={2}
                      value={content.contact.info.address}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            info: { ...content.contact.info, address: e.target.value },
                          },
                        })
                      }
                      className="w-full p-2.5 text-xs rounded border border-line bg-surface text-navy"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        value={content.contact.info.email}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            contact: {
                              ...content.contact,
                              info: { ...content.contact.info, email: e.target.value },
                            },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        value={content.contact.info.phone}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            contact: {
                              ...content.contact,
                              info: { ...content.contact.info, phone: e.target.value },
                            },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Teks Hak Cipta (Copyright Footer)
                      </label>
                      <input
                        type="text"
                        value={content.footer.copyright}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, copyright: e.target.value },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">
                        Catatan Legal Footer
                      </label>
                      <input
                        type="text"
                        value={content.footer.legalNote}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, legalNote: e.target.value },
                          })
                        }
                        className="w-full h-9 px-3 text-xs rounded border border-line bg-surface text-navy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


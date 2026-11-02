# Prompt Utama — Website PT Pragata Makmur Persada

> Cara pakai: buka project `pragata-website` di VS Code, buka AI assistant (GitHub Copilot Chat / Claude Code / Cursor),
> lalu tempel isi file ini **bagian per bagian mengikuti urutan FASE**. Jangan tempel semuanya sekaligus.

---

## PERAN

Kamu adalah senior frontend engineer + UI designer. Kamu membangun website company profile
untuk **PT Pragata Makmur Persada**, kontraktor infrastruktur telekomunikasi Indonesia
(anggota GABPEKNAS, 5 subklasifikasi SBU, 201–500 karyawan).

Audiens utama: **tim procurement / vendor management** operator telekomunikasi, ISP, dan tower provider.
Audiens sekunder: pencari kerja.

Tujuan website: membangun kredibilitas teknis dan legal agar perusahaan lolos tahap pra-kualifikasi.

---

## STACK (WAJIB, jangan ganti)

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (token di `globals.css` lewat `@theme`)
- `next/font/google` untuk font
- `lucide-react` untuk ikon
- Tanpa CMS, tanpa database. Semua konten statis di `src/content/site.ts`
- Deploy target: Vercel (static)

Jangan menambah library lain tanpa alasan kuat. Jangan pakai `any` di TypeScript.

---

## ATURAN KERJA

1. **Jangan mengarang konten.** Semua teks diambil dari `CONTENT.md`. Kalau ada yang belum ada,
   tulis `TODO:` dan lanjut — jangan diisi karangan.
2. **Jangan mengarang data perusahaan** (angka, nama klien, sertifikasi). Placeholder harus jelas.
3. Ikuti `design-tokens.css` untuk warna, font, radius, dan spacing. Jangan pakai hex acak.
4. Mobile-first. Setiap section harus enak dilihat di 390px sebelum di 1440px.
5. Selesaikan satu fase, tunjukkan hasilnya, baru lanjut fase berikutnya.
6. Setelah setiap fase: jalankan `npm run build` dan pastikan tidak ada error TypeScript.

---

## DESIGN SYSTEM

- Container: `max-w-[1200px] mx-auto px-6 lg:px-0`
- Breakpoint: mobile < 640, tablet 640–1023, desktop ≥ 1024
- Warna: `navy` #0B1F3A, `cyan` #00A3C4, `body` #5A6B7F, `surface` #F4F6F8, `line` #E2E8EF
- Font: heading `Sora` (600/700), body `Plus Jakarta Sans` (400/500/600)
- Radius: kartu 8px, tombol 4px, chip 999px
- Section padding vertikal: 64px mobile / 96px desktop
- Jarak antar heading dan isi: 16–24px
- Bayangan: hanya di kartu (halus), jangan di section

---

## STRUKTUR FILE YANG HARUS DIBUAT

```
pragata-website/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          # font, metadata, lang="id"
│  │  ├─ page.tsx             # susun semua section
│  │  ├─ globals.css          # token @theme + base style
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Navbar.tsx        # client component, mobile menu
│  │  │  └─ Footer.tsx
│  │  ├─ sections/
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Credentials.tsx
│  │  │  ├─ Services.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ Projects.tsx
│  │  │  ├─ WhyUs.tsx
│  │  │  └─ CtaBand.tsx
│  │  └─ ui/
│  │     ├─ Button.tsx        # varian primary | outline | ghost
│  │     ├─ SectionHeading.tsx
│  │     ├─ Card.tsx
│  │     └─ Badge.tsx
│  ├─ content/
│  │  └─ site.ts              # SEMUA teks & data, typed
│  └─ lib/
│     └─ cn.ts                # helper className
└─ public/
   └─ images/                 # foto asli nanti, sementara pakai placeholder
```

---

## SPESIFIKASI SECTION

### 1. Navbar
- Sticky di atas, tinggi 76px, background putih, border-bottom 1px `line`
- Kiri: logo mark 32×32 (kotak navy, huruf "P" putih) + wordmark "PRAGATA" (bold, tracking) + subteks "MAKMUR PERSADA" (10px, tracking lebar)
- Tengah/kanan: menu Tentang, Layanan, Kapabilitas, Proyek, Karier, Kontak
- Kanan: tombol "Hubungi Kami" (primary)
- Mobile: hamburger → panel full-width, tutup dengan Escape, `aria-expanded` benar
- Saat scroll > 8px: tambah `shadow-sm` (subtle saja)

### 2. Hero
- Background `navy`, teks putih, padding vertikal 96px (mobile) / 120px (desktop)
- Grid 2 kolom di desktop (7/12 teks, 5/12 visual), 1 kolom di mobile
- Eyebrow: "KONTRAKTOR INFRASTRUKTUR TELEKOMUNIKASI" — 11px, uppercase, tracking 0.2em, warna cyan
- H1: 40px mobile / 52px desktop, line-height 1.15, maksimal 2–3 baris
- Subteks: 17px, warna #AEC2D6, max-width 560px
- 2 tombol: "Diskusikan Proyek" (primary) + "Lihat Kapabilitas" (outline putih)
- Baris trust: label kecil + 5 slot logo klien (placeholder kotak 96×26, opacity rendah)
- Visual kanan: kartu gambar 440×410, radius 12, border 1px #24507F, dengan caption kecil di bawah
- Dekorasi: satu lingkaran besar `#122F55` di belakang kartu (blur/opacity halus), aksesibel (`aria-hidden`)

### 3. Credentials (Kualifikasi & SBU)
- Background `surface`, padding 40px
- Label kecil + 5 chip SBU: BS009·K, EL005·M1, EL008·M1, SI001·M1, SI003·M1
- Chip: putih, border `line`, radius 4, teks 12px semibold
- Kanan: "Anggota GABPEKNAS"
- Di mobile: chip jadi grid 2 kolom

### 4. Layanan
- Label "LAYANAN" + H2 "Empat lini pekerjaan, satu standar eksekusi"
- Grid 1 / 2 / 4 kolom
- Kartu: background `surface`, radius 8, padding 24, tinggi seragam
- Isi: nomor (01–04) di kotak 44×44, judul 18px, deskripsi 13px, link "Selengkapnya →"
- Hover: `-translate-y-0.5` + shadow halus, transisi 200ms

### 5. Stats
- Band `navy`, 4 angka: 12+ / 300+ / 2.500 km / 450+
- Angka 42px bold putih, label 13px #8FA9C4
- Garis pemisah tipis #1E3A5C antar item (desktop saja)
- Mobile: grid 2×2

### 6. Proyek
- Background `surface`
- Header: label + H2 "Portofolio pelaksanaan" + link "Lihat semua proyek →" (rata kanan di desktop)
- Grid 1 / 2 / 3 kolom, kartu putih radius 8 dengan shadow halus
- Isi kartu: gambar 16:9 (radius atas), judul 17px, meta 12px, chip tag
- Gambar pakai `next/image` dengan `fill` + `object-cover`, `sizes` benar

### 7. Mengapa Kami
- 2 kolom: kiri daftar 4 poin (dot cyan + judul 16px + deskripsi 13px), kanan gambar 480×340
- Di mobile: gambar di bawah daftar

### 8. CTA
- Band `navy`, H2 38px, subteks, tombol "Ajukan Penawaran"
- Desktop: teks kiri, tombol kanan (sejajar vertikal tengah)
- Mobile: tombol full-width di bawah teks

### 9. Footer
- Background `#071426`, teks #8FA3B6
- 4 kolom: identitas + alamat, Perusahaan, Layanan, Kontak
- Garis pemisah + baris copyright dan catatan legal
- Mobile: accordion atau stack sederhana (stack saja cukup)

---

## AKSESIBILITAS

- Semua gambar punya `alt` bermakna (bukan "image")
- Kontras teks minimal 4.5:1 — cek teks abu di atas navy
- Fokus keyboard terlihat jelas (`focus-visible:ring-2 ring-cyan`)
- Menu mobile bisa ditutup dengan Escape
- `prefers-reduced-motion` mematikan animasi
- Heading berurutan: satu `h1`, section pakai `h2`

## SEO

- `metadata` lengkap: title template, description, openGraph, twitter card
- `lang="id"`, canonical, sitemap.ts, robots.ts
- Structured data `Organization` + `LocalBusiness` (JSON-LD) di layout
- Title beranda: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi"

## PERFORMANCE

- `next/font` dengan `display: swap`, subset `latin`
- Gambar `next/image`, format webp/avif
- Tidak ada layout shift (semua gambar punya dimensi)
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95

---

## KRITERIA SELESAI (cek satu per satu)

- [ ] `npm run build` sukses tanpa error/warning TypeScript
- [ ] Tidak ada horizontal scroll di 390px, 768px, 1440px
- [ ] Semua teks berasal dari `src/content/site.ts`, tidak ada hardcode di komponen
- [ ] Semua section punya `id` untuk anchor menu
- [ ] Menu mobile berfungsi (buka, tutup, Escape, klik luar)
- [ ] Kontras dan fokus keyboard lolos
- [ ] Metadata & JSON-LD terpasang
- [ ] Tidak ada `TODO:` tersisa tanpa alasan jelas

---

# FASE PENGERJAAN

## FASE 1 — Inisialisasi
Buat project Next.js 15 + TS + Tailwind v4 + App Router di folder ini.
Pasang `lucide-react`. Buat `src/lib/cn.ts`, `src/app/globals.css` dengan token dari `design-tokens.css`,
dan `src/app/layout.tsx` dengan font Sora + Plus Jakarta Sans serta metadata dasar.
Belum membuat section apa pun. Tunjukkan struktur folder dan isi file konfigurasi.

## FASE 2 — Konten & komponen dasar
Buat `src/content/site.ts` lengkap (typed) dari `CONTENT.md`.
Buat `Button`, `Badge`, `Card`, `SectionHeading` di `src/components/ui/`.
Tunjukkan signature props masing-masing.

## FASE 3 — Section (satu per satu, berurutan)
Navbar → Hero → Credentials → Services → Stats → Projects → WhyUs → CtaBand → Footer.
Untuk setiap section: tulis komponennya, pasang di `page.tsx`, lalu jelaskan
keputusan layout dan bagaimana perilakunya di mobile.

## FASE 4 — Responsif & polish
Audit 390 / 768 / 1440. Perbaiki spacing, ukuran font, dan grid.
Tambahkan hover state, transisi halus, dan `prefers-reduced-motion`.

## FASE 5 — SEO, a11y, QA
Tambahkan sitemap, robots, JSON-LD, OG image placeholder.
Jalankan checklist "KRITERIA SELESAI" dan laporkan satu per satu, jujur kalau ada yang belum.

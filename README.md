# PT Pragata Makmur Persada — Official Corporate Website & CMS

<p align="center">
  <img src="public/images/Logo-pragata.jpg" alt="Logo PT Pragata Makmur Persada" width="120" style="border-radius: 8px;" />
</p>

<p align="center">
  <strong>Membangun Tulang Punggung Jaringan Telekomunikasi Indonesia</strong><br />
  Kontraktor Infrastruktur Telekomunikasi: Fiber Optik, Menara BTS, Survey & Design Jaringan, dan Managed Services.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GABPEKNAS-Member-0B1F3A?style=for-the-badge" alt="GABPEKNAS" />
</p>

---

## 📌 Sekilas Perusahaan

**PT Pragata Makmur Persada** adalah perusahaan kontraktor infrastruktur telekomunikasi yang berfokus pada pekerjaan penggelaran jaringan serat optik (*backbone*, distribusi, FTTH), konstruksi menara telekomunikasi & instalasi BTS, survei rute & desain jaringan (*DED/BoQ*), serta layanan pemeliharaan jaringan (*Managed Services*).

Perusahaan merupakan anggota resmi **GABPEKNAS** dengan 5 subklasifikasi Sertifikat Badan Usaha (SBU) aktif:
* **BS009** — Konstruksi Sentral Telekomunikasi (Grade K)
* **EL005** — Konstruksi Jaringan Transmisi Telekomunikasi (Grade M1)
* **EL008** — Instalasi Jaringan Distribusi Telekomunikasi (Grade M1)
* **SI001** — Konstruksi Saluran Air, Pelabuhan, Dam (Grade M1)
* **SI003** — Konstruksi Jalan Raya (Grade M1)

---

## ✨ Fitur Utama Website

### 1. Desain Modern & Identitas Visual Perusahaan
* Palet warna korporat berkelas: **Navy (#0b1f3a)** dipadukan dengan aksen modern **Cyan (#00a3c4)**.
* Tipografi terkurasi: **Sora** untuk *display headers* dan **Plus Jakarta Sans** untuk teks isi berdaya baca tinggi.
* Optimasi tata letak penuh (*responsive layout*) untuk pengalaman mulus di smartphone, tablet, maupun layar desktop lebar.

### 2. Simbol Ikonografi Layanan Modern
Penggantian nomor urut konvensional dengan simbol ikonografi berteknologi tinggi pada 4 lini layanan:
* 🌐 **Instalasi Fiber Optik** (`Cable`) — Penggelaran kabel bawah tanah & udara, *fusion splicing*, dan uji OTDR.
* 📡 **Menara & BTS** (`Radio`) — Pondasi sipil, *tower erection*, pemasangan antena sektoral, RRU, dan *grounding*.
* 🧭 **Survey & Design** (`Compass`) — Survei rute, uji sondir tanah, *Line of Sight (LoS)*, dan *Detailed Engineering Design (DED)*.
* 🖥️ **Managed Services** (`Server`) — Pemeliharaan preventif, penanganan darurat *fiber cut*, dan SLA jaringan 24/7.

### 3. Pop-Up Window Interaktif (Modal View)
* **Pop-Up Detail Berita**: Mengklik kartu berita atau tombol *"Informasi Lengkap →"* membuka jendela pop-up interaktif berisi banner gambar, kategori, tanggal, dan narasi lengkap artikel proyek.
* **Pop-Up Detail Layanan**: Mengklik kartu layanan atau tombol *"Selengkapnya →"* membuka jendela pop-up berisi uraian teknis, ruang lingkup metode kerja, daftar dokumen *deliverables*, serta tombol konsultasi langsung.
* **Pop-Up Detail Proyek**: Tampilan modal foto proyek resolusi tinggi dengan spesifikasi eksekusi.
* Dilengkapi kontrol keyboard (tombol `ESC`), *backdrop blur*, dan penonaktifan *body scroll* saat modal terbuka.

### 4. Continuous Running Marquee (Auto-Slide Ticker)
* Barisan logo operator telekomunikasi & ISP (*Telkom Indonesia, Indosat, XL Axiata, Smartfren, Tower Bersama, Protelindo, dsb.*) bergerak otomatis secara halus (*infinite loop*).
* **Hover-to-Pause**: Animasi otomatis berhenti saat kursor diarahkan ke logo untuk memudahkan inspeksi.
* *Edge gradient mask* modern untuk transisi fade halus di tepi kiri dan kanan layar.

### 5. Content Management System (CMS) Tersembunyi (`/admin` & `/root`)
Portal manajemen konten mandiri tanpa dependensi backend eksternal:
* **Otentikasi Kata Sandi**: Akses aman dengan session cookie HTTP-only (Password default: `pragata2026`).
* **Pengecualian Mesin Pencari**: Rute `/admin`, `/root`, dan `/api/admin` dikecualikan di `robots.txt`.
* **Manajemen Konten Lengkap**:
  * Edit teks H1, subteks, eyebrow, dan foto hero banner.
  * Tambah/edit/hapus berita dan teks artikel pop-up.
  * Tambah/edit/hapus portofolio proyek dan foto site.
  * Tambah/edit/hapus partner dan upload logo mitra.
  * Edit teks 4 lini layanan, statistik pencapaian, dan informasi kontak kantor.
* **Upload Foto Langsung**: Unggah gambar langsung dari komputer/HP (disimpan otomatis ke `public/images/uploads/`).
* **Penyimpanan Persisten**: Perubahan disimpan ke `src/data/site-content.json` dan langsung tayang seketika (*real-time preview*) tanpa perlu build ulang.

---

## 📂 Struktur Proyek

```text
pragata-website/
├── public/
│   ├── images/
│   │   ├── uploads/            # Direktori file upload dari panel admin
│   │   ├── Logo-pragata.jpg    # Logo resmi perusahaan
│   │   ├── hero-fiber-optic.jpg# Sampel visual hero banner
│   │   ├── project-*.jpg       # Sampel visual proyek FO, BTS, FTTH
│   │   └── why-us-team.jpg     # Sampel foto tim lapangan K3
│   └── favicon / icon.png
├── src/
│   ├── app/
│   │   ├── admin/page.tsx      # Portal Admin CMS
│   │   ├── root/page.tsx       # Alias rute redirect ke /admin
│   │   ├── api/admin/
│   │   │   ├── auth/route.ts   # Endpoint login/logout session
│   │   │   ├── content/route.ts# Endpoint baca & simpan konten JSON
│   │   │   └── upload/route.ts # Endpoint upload file gambar
│   │   ├── globals.css         # Styling Tailwind, font, dan keyframe marquee
│   │   ├── layout.tsx          # Root layout & metadata SEO
│   │   ├── page.tsx            # Halaman utama (Homepage)
│   │   ├── robots.ts           # Konfigurasi robots.txt
│   │   └── sitemap.ts          # Sitemap XML otomatis
│   ├── components/
│   │   ├── layout/             # Navbar & Footer
│   │   ├── sections/           # Hero, Layanan, Proyek, Berita, WhyUs, Kontak
│   │   └── ui/                 # Button, Badge, Card, SectionHeading
│   ├── content/
│   │   └── site.ts             # Definisi skema tipe TypeScript & default data
│   ├── data/
│   │   └── site-content.json   # Penyimpanan data konten dinamis CMS
│   └── lib/
│       ├── cn.ts               # Utility class merging
│       └── server-content.ts   # Helper baca/tulis JSON di server
├── package.json
└── README.md
```

---

## 💻 Memulai Pengembangan Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18.18 atau yang lebih baru.
- npm, yarn, atau pnpm.

### 1. Kloning Repositori
```bash
git clone https://github.com/Radikdwiyoga/pragata-website.git
cd pragata-website
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

---

## 🔐 Panduan Panel Admin CMS

1. Buka URL rahasia: **`http://localhost:3000/admin`** (atau `http://localhost:3000/root`).
2. Masukkan kata sandi admin default:
   ```text
   pragata2026
   ```
3. *(Opsional)* Ubah kata sandi melalui environment variable di file `.env.local`:
   ```bash
   ADMIN_PASSWORD=kata_sandi_baru_anda
   ```
4. Pilih tab konten di panel kiri, lakukan pengeditan teks atau upload foto baru, lalu klik **"Simpan Perubahan"**.

---

## 🚀 Kompilasi Produksi & Deployment

Untuk menguji build produksi secara lokal:
```bash
npm run build
npm run start
```

### Deployment ke Vercel / Cloud:
Proyek ini sepenuhnya kompatibel untuk dideploy langsung ke [Vercel](https://vercel.com) atau VPS berbasis Node.js/Docker dengan konfigurasi standar Next.js App Router.

---

## 📞 Kontak & Informasi Resmi

* **Perusahaan**: PT Pragata Makmur Persada
* **Alamat Kantor**: Epicentrum Walk Lt. 5, Suite South 529A, Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan 12940
* **Email**: info@pragata.co.id
* **Keanggotaan**: Asosiasi GABPEKNAS

---

## 📄 Hak Cipta

© 2026 **PT Pragata Makmur Persada**. Seluruh hak cipta dilindungi undang-undang.

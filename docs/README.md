# Brief — Website PT Pragata Makmur Persada

Paket ini berisi semua yang dibutuhkan untuk membangun website di VS Code dengan bantuan AI.

## Isi folder

| File | Fungsi |
|---|---|
| `PROMPT.md` | Prompt utama + spesifikasi lengkap (tempel ke AI assistant, per fase) |
| `CONTENT.md` | Semua teks & data — sumber kebenaran, AI tidak boleh mengarang |
| `design-tokens.css` | Token warna, font, radius, shadow untuk Tailwind v4 |
| `README.md` | File ini — langkah eksekusi |

---

## Langkah 1 — Buat project

Buka terminal VS Code di `C:\Users\Radik Dwiyoga\Documents`, lalu:

```powershell
npx create-next-app@latest pragata-website --typescript --tailwind --app --src-dir --eslint --import-alias "@/*" --no-turbopack
cd pragata-website
npm i lucide-react
code .
```

## Langkah 2 — Masukkan brief ke project

```powershell
mkdir docs
copy ..\pragata-website-brief\*.md docs\
copy ..\pragata-website-brief\design-tokens.css docs\
```

Sekarang AI assistant di VS Code bisa membaca `docs/PROMPT.md` dan `docs/CONTENT.md`.

## Langkah 3 — Referensi visual

Mockup beranda ada di:

```
C:\Users\Radik Dwiyoga\Documents\pragata-beranda-mockup.png
```

Simpan juga ke `docs/mockup-beranda.png` supaya AI bisa melihatnya
(Copilot Chat & Cursor bisa attach gambar; Claude Code bisa baca path).

## Langkah 4 — Jalankan prompt per fase

Buka Copilot Chat (`Ctrl+Alt+I`) atau Claude Code, lalu tempel **satu fase per pesan**:

1. Fase 1 — inisialisasi + token + layout
2. Fase 2 — `site.ts` + komponen UI dasar
3. Fase 3 — section (boleh dipecah 2–3 pesan)
4. Fase 4 — responsif & polish
5. Fase 5 — SEO, a11y, QA

Contoh pesan pembuka:

```
Baca docs/PROMPT.md dan docs/CONTENT.md.
Kerjakan FASE 1 saja. Jangan lanjut ke fase berikutnya sebelum saya minta.
```

## Langkah 5 — Cek hasil

```powershell
npm run dev      # http://localhost:3000
npm run build    # harus sukses sebelum lanjut fase
```

---

## Urutan kerja yang disarankan

```
Setup → Layout + token → Konten (site.ts) → UI dasar
   → Navbar → Hero → Credentials → Services → Stats
   → Projects → WhyUs → CTA → Footer
   → Responsif → SEO/a11y → Deploy
```

## Aturan penting saat prompting

- **Satu fase per pesan.** Prompt raksasa menghasilkan kode setengah jadi.
- **Selalu minta AI membaca `docs/CONTENT.md`** sebelum menulis teks.
- Kalau hasilnya melenceng: `Batalkan perubahan terakhir dan ulangi, ikuti docs/PROMPT.md bagian X.`
- Setelah tiap section, minta: `Tunjukkan bagaimana ini tampil di 390px.`

## Checklist sebelum deploy

- [ ] Alamat & telepon resmi sudah dikonfirmasi
- [ ] Angka statistik sudah diverifikasi
- [ ] Foto asli sudah menggantikan placeholder
- [ ] Tidak ada nama/logo klien tanpa izin
- [ ] Domain dibeli & email domain disiapkan
- [ ] `npm run build` bersih, Lighthouse dicek

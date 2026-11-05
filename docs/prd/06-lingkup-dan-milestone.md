# 06. Lingkup dan Milestone

## MVP (rilis mata kuliah)

Masuk: FR-01 sampai FR-08 (FR-08 sebagai tautan WhatsApp) dan FR-09 sebagian (deskripsi rasa dan alergen bila data tersedia).

Tidak masuk: pemesanan dalam situs, status pesanan, akun pengguna, menulis ulasan, rekomendasi personal, filter jarak berbasis GPS, info nutrisi.

## Fase 2 (bila proyek dilanjutkan)

- Pemesanan dan status pesanan dalam situs (D8 4,00 mendukung tetapi terlemah dari enam asumsi awal; alasan penundaan: butuh backend dan mitra)
- Pin lokasi yang dapat disesuaikan dan pelacakan (keluhan R1, R6)
- Menulis ulasan dengan foto (lanjutan FR-03)
- Rekomendasi sesuai selera (usulan R3, R9, R13)

## Milestone

| Milestone | Isi | Keluaran | Definisi selesai |
|---|---|---|---|
| M0 Fondasi | merapikan repo dan konfigurasi | `app/layout.jsx`, `app/page.jsx`, token warna di `globals.css`, jsconfig, ESLint, Vitest | `npm run build`, `lint`, `test` semuanya lulus; halaman kosong tampil |
| M1 Data dan skema | skema Zod, seed [DATA CONTOH] 6-8 restoran, util format | `lib/schemas.js`, `data/restaurants.js`, `lib/format.js` | seed lolos validasi skema; unit test format lulus |
| M2 Halaman inti | beranda, `/cari`, kartu restoran, filter, chip status | `app/page.jsx`, `app/cari/page.jsx`, komponen kartu | klik semua kontrol tercatat; state kosong bekerja; keyboard berurutan |
| M3 Detail restoran | menu, ulasan, rating, peta, tombol WhatsApp | `app/restoran/[slug]/page.jsx` dan komponen pendukung | 404 bekerja; semua foto berdimensi; tautan wa.me membuka dengan benar |
| M4 Perbaikan dan gate | aksesibilitas, kontras, uji usability, performa gambar | laporan rilis dengan catatan uji klik | gate rilis di `09-panduan-pengembangan.md` lulus; uji 5 pengguna tercatat |

Urutan pengerjaan per anggota boleh paralel, tetapi M1 harus selesai sebelum M2 dan M3 dimulai (komponen butuh tipe dan seed).

## Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data contoh terlihat seperti klaim nyata | merusak kepercayaan, melanggar aturan kejujuran | badge "Data contoh (prototipe)" wajib (NFR-04) |
| Foto asli tidak tersedia untuk prototipe | FR-03 sebagai fitur inti tampak kosong | foto makanan milik kelompok sendiri bila memungkinkan; bila tidak, placeholder berlabel dengan rasio tetap |
| Waktu kelompok terbatas | milestone tergeser | potong dari bawah: FR-09 dulu, lalu FR-07 |
| Embed peta butuh koneksi | halaman detail terasa berat | dimensi tetap, dimuat lazy, alamat teks selalu ada |
| Satu responden saja basis persona | kebutuhan persona bisa meleset | uji usability 5 pengguna pada M4 memverifikasi; pertanyaan terbuka di bawah |

## Pertanyaan terbuka (dijawab pemilik proyek)

1. Nama situs (sekarang [NAMA SITUS]; title sementara "Website Kuliner").
2. Sumber foto: milik kelompok sendiri, atau placeholder berlabel.
3. Nomor WhatsApp untuk tombol pesan selama prototipe (nomor kelompok, dengan label data contoh).
4. Tempat deploy: Vercel, hosting statis, atau hanya lokal untuk presentasi mata kuliah.

# 05. Alur Pengguna dan Layar

Turunan langsung langkah 5.4 laporan riset (susun user flow untuk Nadia dan Raka, lalu wireframe).

## Alur Nadia: pesan cepat

1. Buka beranda di HP.
2. Ketik nama restoran di pencarian, atau pilih kartu dari daftar.
3. Di halaman detail: cek menu dan harga, lihat foto asli pengunjung, pastikan status buka dan tidak sibuk.
4. Tekan "Pesan lewat WhatsApp"; pesan awal sudah terisi nama restoran.
5. Lanjutkan percakapan di WhatsApp. (Pelacakan pesanan: fase 2.)

## Alur Raka: jelajah lalu datang

1. Buka `/cari`.
2. Set filter: harga maksimum, jenis masakan, halal.
3. Bandingkan kartu: harga, status, jarak bila tersedia.
4. Buka halaman detail: cek jam buka, foto lokasi, peta, dan petunjuk arah.
5. Berangkat ke lokasi, atau pesan lewat WhatsApp.

## Inventaris layar

| Route | Tujuan | Komponen utama | State wajib |
|---|---|---|---|
| `/` | titik masuk, pencarian, sorotan | SearchBar, RestaurantCard, StatusBadge | memuat, kosong, siap; error lewat `error.tsx` |
| `/cari` | hasil pencarian dan filter | FilterPanel, SearchBar, RestaurantCard | memuat, kosong hasil filter (dengan saran), siap |
| `/restoran/[slug]` | detail satu restoran | MenuList, ReviewList, RatingStars, MapEmbed, JamBuka, tombol WhatsApp | 404 slug tak dikenal, memuat, siap |
| halaman 404 | slug atau halaman tak dikenal | pesan singkat dan tautan kembali ke beranda | - |
| halaman error | galat tak tertangani | penyebab dan tombol coba lagi | - |

Catatan teknis: dengan seed statis, state memuat tetap diimplementasi lewat `Suspense` fallback supaya komponennya teruji dan siap ketika sumber data berganti ke API.

## Wireframe yang harus dibuat sebelum M2

- Beranda: baris pencarian, chip filter cepat, daftar kartu, satu bagian sorotan
- Hasil cari: panel filter yang dapat dilipat di HP, daftar hasil, state kosong
- Detail restoran: kepala (nama, status, jam), daftar menu, ulasan, peta, tombol pesan

Sketsa tangan cukup; simpan di `docs/prd/assets/` bila ada. Alasan wireframe tangan dulu: cepat diubah saat uji alur dengan anggota kelompok sebelum dikerjakan di kode.

# 04. Kebutuhan Nonfungsional

NFR adalah syarat kualitas, bukan pelengkap. Item yang gagal pada pemeriksaan milestone berarti milestone belum selesai.

### NFR-01 Mobile-first

- Tanpa scroll horizontal pada rentang lebar 360px sampai 1920px
- Target sentuh minimum 44x44px
- Teks basis 16px; zoom 200% tidak memotong konten

Bukti: 12 dari 13 responden memakai HP.

### NFR-02 Aksesibilitas (target WCAG 2.2 AA)

- Kontras teks normal minimal 4,5:1, teks besar minimal 3:1; setiap pasangan dihitung, bukan diklaim (tabel rasio ada di `../../DESIGN.md`)
- Semua kontrol dapat dijangkau dan dijalankan dengan keyboard; fokus terlihat jelas
- Status tidak pernah warna saja: selalu ada teks dan ikon
- Setiap input punya label; setiap gambar punya alt (kosong bila dekoratif)
- `<html lang="id">`; satu h1 per halaman tanpa level terlewat

Alasan: UI dipakai orang dengan mata, tangan, dan perangkat beragam; pengguna sasaran memakai HP dalam kondisi terang luar ruang.

### NFR-03 Performa gambar

- Semua `img` dan `iframe` punya width/height atau aspect-ratio; tanpa pergeseran tata letak saat dimuat
- Gambar utama atas layar dimuat dengan prioritas tinggi dan tidak lazy; gambar di bawah layar lazy
- Memakai `next/image` untuk optimasi otomatis
- Angka performa (LCP, CLS, dan sejenisnya) hanya dilaporkan setelah diukur dengan alat (misal Lighthouse) pada M4; sebelum itu statusnya "belum diukur"

Alasan: foto adalah konten inti kepercayaan (FR-03) sekaligus aset terberat halaman.

### NFR-04 Kejujuran data

- Selama memakai seed: badge "Data contoh (prototipe)" tampil di beranda dan halaman detail
- Tidak ada rating agregat, jumlah pesanan, atau statistik popularitas tanpa data
- Setiap tampilan data disertai tanggal pembaruan
- Kutipan responden riset (R1-R13) hanya dipakai sebagai bukti riset, tidak diperlakukan sebagai testimoni pelanggan
- Foto placeholder tidak menyamar sebagai foto nyata; tanpa foto, tampil blok placeholder berlabel

Alasan: klaim tanpa sumber menghancurkan kepercayaan, satu-satunya diferensiasi produk ini (temuan C6).

### NFR-05 Bahasa dan format

- UI berbahasa Indonesia
- Harga memakai `Intl.NumberFormat("id-ID")`, Rupiah tanpa desimal
- Jam format 24 jam gaya Indonesia (09.00-21.00); tanggal format Indonesia

### NFR-06 State tampilan data

- Setiap tampilan data menangani state memuat, kosong, dan error, dipaksa di level tipe lewat `DataState<T>` (`08-model-data.md`)
- Setiap state punya teks penyebab dan aksi lanjut ("belum ada restoran yang cocok, hapus filter harga"), bukan sekadar "no data"

### NFR-07 Kualitas kode TypeScript

- `tsconfig`: `strict: true`, `allowJs: false`, `noUncheckedIndexedAccess: true`
- Semua komponen dan route berekstensi `.tsx`; modul non-UI `.ts`; `.js` dan `.jsx` dilarang (keputusan pemilik proyek)
- Tanpa `any` baru; tipe props eksplisit pada semua komponen

### NFR-08 Ketahanan

- `app/error.tsx` dan `app/not-found.tsx` tersedia dan berfungsi
- Semua tautan navigasi menuju halaman yang benar-benar ada; tanpa kontrol mati

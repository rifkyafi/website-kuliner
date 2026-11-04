# DESIGN.md

Arah desain untuk [NAMA SITUS], website kuliner proyek mata kuliah Desain Web (Kelompok 1). Dokumen ini adalah sumber tunggal arah visual: perubahan arah ditulis di sini dulu, baru dikode.

Status: v0.1, 4 November 2026. Disusun dari jawaban pemilik proyek pada sesi perencanaan; pemilik proyek adalah penulis arah, dokumen ini menerimanya.

## Identitas

- Nama produk: [NAMA SITUS], belum ditentukan. Title halaman sementara: "Website Kuliner".
- Logo: teks nama produk dalam Plus Jakarta Sans Bold. Tidak ada logo gambar sampai nama resmi ditetapkan.
- Satu kalimat posisi: katalog kuliner mobile-first untuk mahasiswa; keunggulannya informasi lengkap dan bisa dipercaya, bukan pemesanan penuh.

## Suasana

Hangat dan ramah, tetapi rapi. Nuansa kuliner yang mengundang, dengan harga, status buka, dan ulasan sebagai fokus utama setiap layar.

Alasan: riset pengguna (BAB III) menunjukkan keluhan terbesar ada pada isi informasi (C2 3,23; C6 3,08), bukan pada tampilan (C4 2,23; C5 2,08). Suasana hangat mengundang selera; kerapian menjaga kepercayaan.

## Palet

Dua warna inti + satu aksen + netral. Semua rasio di bawah dihitung dengan formula WCAG 2.x saat dokumen ini ditulis, bukan perkiraan mata.

| Peran | Warna | Hex | Rasio terverifikasi | Status |
|---|---|---|---|---|
| Latar utama | Krem | #FAF5EF | dasar | - |
| Permukaan kartu | Putih | #FFFFFF | dasar | - |
| Teks utama | Cokelat gelap | #3D2C23 | 12,2:1 pada krem; 13,3:1 pada putih | lolos AA |
| Aksen (tombol utama) | Oranye bata | #B5542B | teks putih di atasnya 4,9:1 | lolos AA |
| Aksen teks dan tautan kecil | Oranye bata gelap | #8F3E1F | 6,7:1 pada krem | lolos AA |
| Garis kartu dan input | Cokelat muda | #C9B8A3 | batas komponen, target 3:1 | verifikasi saat implementasi |

Aturan pakai:

- Teks oranye bata (#B5542B) langsung di atas krem hanya untuk teks besar (minimal 24px, atau 18px tebal). Teks kecil selalu #8F3E1F atau cokelat gelap.
- Tombol utama: latar #B5542B dengan teks putih. Tombol sekunder: latar putih, garis #C9B8A3, teks cokelat gelap.
- Status buka, tutup, sibuk memakai chip dengan ikon dan teks, tidak pernah warna saja:
  - buka: teks #14532D pada latar #E7F4EC (8,0:1)
  - tutup: teks #7F1D1D pada latar #FDE8E8 (8,5:1)
  - sibuk: teks #7C4A03 pada latar #FBEFD5 (6,5:1)
- Pasangan warna baru apa pun wajib dihitung rasionya sebelum dipakai. Yang belum dihitung tidak dipakai.

## Tipografi

Plus Jakarta Sans (Tokotype, open source, identitas Indonesia), satu keluarga untuk semua teks.

- Bobot 400 untuk teks isi, 600 untuk subjudul dan label, 700 untuk judul.
- Hierarki lewat bobot dan ukuran, bukan menambah keluarga font baru.
- Ukuran basis 16px; teks harus bisa dizoom 200% tanpa terpotong.
- Alasan: humanis dan ramah, sangat terbaca di ukuran kecil pada HP, dan bukan pilihan bawaan generator.

## Dials

ENERGY 2 / RHYTHM 2 / MOTION 1.

- ENERGY 2: menyapa hangat tetapi tidak berteriak; satu titik fokus per layar.
- RHYTHM 2: konsisten dengan beberapa variasi; bagian sorotan boleh berbeda komposisi dari daftar biasa.
- MOTION 1: gerak hanya pada hover, focus, dan transisi halus; tanpa loop, tanpa parallax; menghormati `prefers-reduced-motion`.

## Motif identitas

Penanda kepercayaan dengan gaya konsisten: chip status buka/tutup/sibuk, baris "Diperbarui [tanggal]" pada data, dan lencana "foto asli pengunjung" pada foto ulasan. Alasan: diferensiasi produk adalah kepercayaan informasi (temuan BAB III), jadi penanda kepercayaan adalah motif yang diulang di seluruh halaman.

## Tema terang

Tema terang dipilih karena identitas hangat dan konteks kuliner: foto makanan lebih menggugah di latar terang. Toggle gelap bukan prioritas MVP; bila suatu saat ditambahkan, keduanya harus berfungsi penuh dan diverifikasi terpisah.

## Batas

- Tanpa glassmorphism, glow, gradien biru-ungu, grid dekoratif, emoji di UI, dan badge kapsul tanpa isi nyata.
- Bayangan hanya untuk elevasi beralasan (kartu saat hover, modal), bukan semua komponen.
- Sudut membulat konsisten: 8px untuk elemen kecil (chip, tombol sekunder), 12px untuk kartu.

## Hubungan dengan dokumen lain

- Kebutuhan produk dan panduan pengembangan: folder `docs/prd/`, mulai dari `docs/prd/README.md`.
- Saringan kualitas UI saat implementasi: aturan antislop yang aktif pada sesi pengembangan. Dokumen ini memberi arah; antislop menyaring.

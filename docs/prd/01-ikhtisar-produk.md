# 01. Ikhtisar Produk

Status: draf v0.1 (2026-11-04). Semua bukti merujuk `02-pengguna-dan-temuan.md`.

## Latar

Website kuliner yang membantu pengguna mencari dan memesan makanan dengan informasi lengkap, terbaru, dan dapat dipercaya (menu, harga, foto asli, lokasi, jam buka, ulasan). Sasaran utama: mahasiswa 17-22 tahun yang mengakses internet lewat HP (12 dari 13 responden riset).

## Masalah yang diselesaikan

Tiga masalah terbesar calon pengguna (BAB III, Tabel E.2):

1. Informasi tidak lengkap atau tidak diperbarui. Bukti: C2 rata-rata 3,23 (7 dari 13 setuju); kebutuhan responden tertinggi justru jam buka dan status terbaru (D6 4,54).
2. Keaslian diragukan. Foto dan ulasan tidak sesuai kenyataan (C6 3,08; keluhan terbuka R3, R7, R10).
3. Harga, ongkir, dan promo tidak jelas. Harga adalah faktor penentu nomor satu (peringkat 1-2 pada 8 dari 13 responden; keluhan R6, R9, R12).

Yang bukan masalah: tampilan dan kemudahan memakai di HP (C4 2,23; C5 2,08, dua skor terendah). Karena itu energi pengembangan diarahkan ke isi dan kepercayaan informasi, bukan ke ornamen visual.

## Tujuan produk

1. Membantu pengguna menjawab "makan apa dan di mana" dalam satu tempat: menu, harga, foto, status buka, lokasi, dan ulasan.
2. Membuat perbandingan harga cepat dan jujur: harga per item, urutan dan filter harga, tanpa biaya tersembunyi di antarmuka.
3. Menghubungkan ke pemesanan yang benar-benar berfungsi (tautan WhatsApp) tanpa mengaku sebagai aplikasi pesan-antar.

## Non-tujuan (di luar cakupan)

- Bukan aplikasi pesan-antar (kurir, pembayaran, paylater). Pemesanan penuh hanya fase 2 bila proyek dilanjutkan.
- Bukan media sosial kuliner.
- Tidak menampilkan statistik, rating agregat, atau label "populer" tanpa data nyata.

## Prinsip desain

| Prinsip | Alasan satu baris |
|---|---|
| Mobile-first | 12 dari 13 responden memakai HP |
| Kepercayaan lebih dulu | pain point terbesar ada pada isi informasi, bukan tampilan (C2, C6) |
| Alur familiar seperti aplikasi pesan-antar | kenyamanan memakai situs baru hanya 3,38 dari 5; jangan paksa pengguna belajar pola baru |
| Jujur soal data | selama prototipe semua data berlabel [DATA CONTOH]; tanpa angka tanpa sumber |
| Setiap tampilan data punya state kosong, memuat, error | UI yang hanya dirancang untuk kondisi ideal belum siap dipakai |



Semua metrik harus diukung sungguhan sebelum dilaporkan; yang belum diukur dinyatakan "belum diukur".

1. Uji usability pada sekitar 5 pengguna (langkah riset 5.4): tugas "temukan menu termurah beserta harga dan status restoran" selesai tanpa bantuan; waktu dan kegagalan dicatat per peserta.
2. Uji klik seluruh kontrol pada setiap rilis milestone, tercatat dengan format di `09-panduan-pengembangan.md`.
3. Pemeriksaan aksesibilitas: seluruh pasangan warna dihitung rasionya, navigasi keyboard dicoba, hasilnya dicatat.

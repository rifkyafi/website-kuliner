# PRD: Website Kuliner (Kelompok 1)

Paket dokumen kebutuhan produk dan panduan pengembangan website kuliner. Diturunkan dari Laporan Riset Pengguna; BAB III adalah sumber utama bukti.

Sumber riset: `Desain Web_Riset Pengguna_Kelompok 1.md` di root repo. Semua angka pada dokumen ini merujuk ke laporan itu; tidak ada angka yang dikarang.

## Daftar dokumen

| File | Isi | Untuk siapa |
|---|---|---|
| 01-ikhtisar-produk.md | masalah, tujuan, non-tujuan, prinsip, Design Read | semua anggota |
| 02-pengguna-dan-temuan.md | persona dan seluruh bukti BAB III | semua anggota |
| 03-kebutuhan-fungsional.md | FR-01 sampai FR-09 dengan kriteria terima | semua anggota |
| 04-kebutuhan-nonfungsional.md | NFR mobile, aksesibilitas, performa, kejujuran data | developer, QA |
| 05-alur-dan-layar.md | alur pengguna dan inventaris layar beserta state wajibnya | developer, desainer |
| 06-lingkup-dan-milestone.md | MVP, fase 2, milestone M0 sampai M4, risiko | semua anggota |
| 07-arsitektur-typescript.md | stack, struktur folder, aturan .tsx, testing | developer |
| 08-model-data.md | skema Zod, tipe, seed [DATA CONTOH], util format | developer |
| 09-panduan-pengembangan.md | langkah M0, alur git, definisi selesai, gate rilis | developer |

Arah visual: `DESIGN.md` di root repo.

## Aturan pakai

1. Baca 01 sampai 06 untuk memahami apa yang dibangun dan alasannya.
2. Pakai 07 sampai 09 saat menulis kode. Keduanya adalah panduan kerja, bukan sekadar rencana.
3. Setiap perubahan kebutuhan: ubah dokumen PRD dulu (beserta alasannya), baru ubah kode. Kode yang menyimpang dari PRD adalah utang, bukan penyelesaian.
4. Setiap keputusan desain baru harus punya alasan satu baris, dan merujuk bukti (kode responden atau skor butir) bila relevan.

## Status

| Versi | Tanggal | Perubahan |
|---|---|---|
| 0.1 | 2026-11-04 | draf awal dari hasil riset dan sesi keputusan (data seed statis, pemesanan via tautan WhatsApp, aturan .tsx, struktur 10 file) |

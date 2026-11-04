# 03. Kebutuhan Fungsional

Setiap FR memuat: prioritas (mengikuti Tabel E.2 laporan riset), bukti (merujuk `02-pengguna-dan-temuan.md`), kriteria terima (checklist QA), dan catatan teknis. Semua FR di bawah adalah cakupan MVP kecuali yang ditandai fase 2.

### FR-01 Halaman detail restoran dengan menu dan harga lengkap

- Prioritas: tinggi (pain point no. 1)
- Bukti: C2 3,23; D3 4,23; keluhan R1, R12

Kriteria terima:

- [ ] Menampilkan nama, jenis masakan, alamat, dan jam buka restoran
- [ ] Setiap item menu menampilkan nama, harga dalam Rupiah, foto bila ada, deskripsi singkat bila ada
- [ ] Item tanpa harga menampilkan "harga belum tersedia", bukan angka kosong atau nol
- [ ] Tanggal pembaruan data tampil di halaman
- [ ] Route `/restoran/[slug]`; slug tak dikenal menampilkan halaman 404

Catatan teknis: server component dengan `generateStaticParams`; data lewat adapter (`08-model-data.md`).

### FR-02 Status buka, tutup, sibuk yang jelas dan terbarui

- Prioritas: tinggi (pain point no. 1)
- Bukti: D6 4,54 (kebutuhan tertinggi survei); tema waktu dan status (R13)

Kriteria terima:

- [ ] Chip status tampil di kartu daftar dan halaman detail
- [ ] Status disertai teks dan ikon, tidak pernah warna saja
- [ ] Baris "Diperbarui [tanggal]" tampil berdampingan dengan status
- [ ] Status "sibuk" menampilkan penjelasan singkat dari data (mis. "antrean panjang")

Catatan teknis: status dihitung dari jam buka hari berjalan ditambah field status operator.

### FR-03 Ulasan dan rating dengan foto asli pengunjung

- Prioritas: tinggi (pain point no. 2)
- Bukti: D7 4,38; keluhan R3, R7, R10; usulan R5, R6

Kriteria terima:

- [ ] Daftar ulasan per restoran: rating bintang, teks, foto bila ada, inisial penulis
- [ ] Foto ulasan diberi lencana "foto asli pengunjung"
- [ ] Rating agregat hanya dihitung dari ulasan yang benar-benar ada di data
- [ ] Selama prototipe: badge "Data contoh (prototipe)" tampil dekat daftar ulasan
- [ ] Menulis ulasan: fase 2

Catatan teknis: MVP hanya baca. Dilarang mengarang ulasan yang menyamar sebagai nyata (lihat NFR-04).

### FR-04 Transparansi harga, ongkir, dan promo

- Prioritas: tinggi (pain point no. 3)
- Bukti: harga peringkat 1-2 pada 8 dari 13; keluhan R6, R9, R12, R13

Kriteria terima:

- [ ] Harga item tampil pada kartu menu dengan format Rupiah
- [ ] Hasil daftar dapat diurutkan dan difilter berdasarkan harga
- [ ] Estimasi ongkir tampil bila datanya ada, dengan label "estimasi"
- [ ] Promo tampil apa adanya dari data; tanpa data promo, tidak ada elemen promo

### FR-05 Pencarian dan filter

- Prioritas: sedang (pain point no. 6)
- Bukti: D4 4,08; tema rekomendasi (R3, R9, R13); tujuan rekomendasi 4 dari 13

Kriteria terima:

- [ ] Pencarian berdasarkan nama restoran dan nama menu
- [ ] Filter: jenis masakan, harga maksimum, halal
- [ ] Hasil kosong menampilkan penyebab dan saran ("tidak ada hasil, coba hapus filter harga")
- [ ] Filter tercermin di URL sehingga bisa dibagikan dan dikembalikan
- [ ] Bagian "Sorotan" di beranda diberi label data contoh

Catatan teknis: filter jarak berbasis lokasi GPS adalah fase 2 (butuh izin geolokasi).

### FR-06 Peta lokasi dan petunjuk arah

- Prioritas: sedang (pain point no. 5)
- Bukti: D5 4,15; keluhan titik lokasi R1, R6

Kriteria terima:

- [ ] Halaman detail menampilkan peta tersemat dengan dimensi tetap (width/height)
- [ ] Alamat teks selalu tampil sebagai cadangan bila peta gagal dimuat
- [ ] Tautan petunjuk arah menuju Google Maps atau OpenStreetMap sesuai data
- [ ] Foto lokasi tampil bila datanya ada

Catatan teknis: MVP memakai embed pihak ketiga, bukan peta kustom. Pin lokasi yang bisa disesuaikan pengguna adalah fase 2.

### FR-07 Estimasi waktu dan indikator sibuk

- Prioritas: sedang (pain point no. 4)
- Bukti: usulan R2, R3, R7, R13

Kriteria terima:

- [ ] Bila data estimasi tersedia, tampil "perkiraan siap X menit" dengan label perkiraan
- [ ] Bila tidak tersedia, tampil "estimasi belum tersedia", bukan angka karangan
- [ ] Indikator sibuk menyertai chip status FR-02

### FR-08 Pemesanan lewat tautan yang berfungsi

- Prioritas: sedang (asumsi awal terlemah: D8 4,00)
- Bukti: 9 dari 13 setuju pada D8; keputusan sesi 2026-11-04: MVP memakai tautan fungsional, pemesanan penuh fase 2

Kriteria terima:

- [ ] Tombol "Pesan lewat WhatsApp" membuka `wa.me/<nomor>` dengan pesan awal terisi nama restoran
- [ ] Nomor berasal dari data; tanpa nomor, tombol tidak dirender
- [ ] Tautan jelas menuju luar situs (label dan indikasi keluar)

Catatan teknis: tautan eksternal memakai `target="_blank"` dan `rel="noopener noreferrer"`.

### FR-09 Informasi rasa, bahan, dan alergi

- Prioritas: rendah (kebutuhan minoritas)
- Bukti: usulan R7 (filter alergi), R10 (deskripsi rasa), R13 (nutrisi)

Kriteria terima:

- [ ] Deskripsi rasa tampil pada item menu bila data tersedia
- [ ] Tag alergen tampil pada item bila data tersedia
- [ ] Filter alergi dan info nutrisi: fase 2

## Matriks jejak butir riset ke FR

| Butir riset | Ditangani oleh |
|---|---|
| C1 sulit menemukan informasi | FR-01, FR-05 |
| C2 informasi tidak lengkap atau basi | FR-01, FR-02 |
| C3 proses mencari lama | FR-04 (harga di kartu), FR-05 (filter dan urutan) |
| C4, C5 tampilan dan HP | NFR-01, NFR-02, prinsip alur familiar |
| C6 keaslian diragukan | FR-03, FR-02 (tanggal pembaruan), NFR-04 |
| D1 memesan makanan | FR-08 |
| D1 mencari rekomendasi | FR-05 (bagian sorotan) |
| D1 membandingkan harga dan menu | FR-04, FR-05 |
| D1 mencari terdekat | FR-06; filter jarak nyata fase 2 |
| D3 menu lengkap | FR-01 |
| D4 pencarian dan filter | FR-05 |
| D5 peta dan arah | FR-06 |
| D6 jam dan status | FR-02 |
| D7 ulasan dan rating | FR-03 |
| D8 pemesanan langsung | FR-08 (MVP tautan), fase 2 penuh |
| Tema info bahan, alergi, rasa, nutrisi | FR-09 |

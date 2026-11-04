# 09. Panduan Pengembangan

Dokumen ini adalah panduan kerja, bukan sekadar rencana: kerjakan M0 dulu sekali, lalu ikuti alur harian dan definisi selesai untuk setiap milestone.

## M0: fondasi (sekali, sebelum fitur apa pun)

Repo saat ini masih membawa sisa setup CRA dan konfigurasi longgar. Urutan pengerjaan:

1. `package.json`: hapus skrip `test` (react-scripts) dan `eject`; hapus blok `eslintConfig` dan `browserslist`. Tambahkan skrip hasil M0 (lihat `07-arsitektur-typescript.md`).
2. Pasang alat: `npm i -D vitest @vitejs/plugin-react jsdom eslint eslint-config-next @eslint/eslintrc`
3. Buat `vitest.config.ts` dan `vitest.setup.ts` (isi di dokumen 07).
4. Ubah `tsconfig.json`: `strict: true`, `allowJs: false`, `noUncheckedIndexedAccess: true`, `baseUrl: "."`, `paths: { "@/*": ["./*"] }`.
5. Buat `eslint.config.mjs` (isi di dokumen 07); hapus blok `eslintConfig` dari package.json sudah dilakukan di langkah 1.
6. Hapus `tailwind.config.js` (Tailwind 4 mendeteksi konten otomatis; glob lama salah). Buat `app/globals.css` berisi `@import "tailwindcss"` dan token `@theme` dari DESIGN.md.
7. Hapus `app/pages/homepage.tsx` dan foldernya; buat `app/page.tsx` serta `app/layout.tsx` (font Plus Jakarta Sans lewat `next/font/google`, `lang="id"`, metadata title "Website Kuliner").
8. Komit: `M0: fondasi repo (route, tsconfig, vitest, eslint, tailwind tokens)`.

Verifikasi M0 (semua harus lulus):

```bash
npm run dev        # halaman "Website Kuliner" tampil tanpa error konsol
npm run build      # sukses
npm run typecheck  # sukses tanpa error
npm run lint       # sukses
npm run test       # sukses (belum ada test pun harus hijau)
```

## Alur kerja harian

1. Satu branch per unit kerja: `m1-model-data`, `fitur/filter-harga`.
2. Commit kecil; pesan commit menjelaskan apa yang berubah dan mengapa bila tidak jelas.
3. Sebelum mengajukan review: `npm run lint && npm run typecheck && npm run test`.
4. Satu anggota lain mereview sebelum merge ke main; reviewer memakai daftar periksa definisi selesai di bawah.
5. Banyak anggota mengerjakan bersamaan: patok urutan M1 dulu (tipe dan seed), baru M2 dan M3 paralel.

## Definisi selesai (berlaku setiap milestone)

- [ ] `lint`, `typecheck`, `test` lulus
- [ ] Semua kontrol diklik dan hasilnya dicatat (format di bawah)
- [ ] Dicek pada layar 360px: tanpa scroll horizontal, teks tidak keluar wadah
- [ ] Navigasi keyboard berurutan dan fokus terlihat
- [ ] State kosong, memuat, dan error tampil benar pada setiap tampilan data
- [ ] Tidak ada data karangan baru; seed berlabel [DATA CONTOH]
- [ ] Pasangan warna baru dihitung rasionya sebelum dipakai
- [ ] Semua gambar dan iframe berdimensi
- [ ] PRD diperbarui bila ada keputusan yang berubah

## Format catatan uji klik

Setiap rilis milestone menyertakan tabel seperti ini (bukti, bukan klaim):

| Kontrol | Aksi | Hasil tercatat |
|---|---|---|
| Tombol "Pesan lewat WhatsApp" | klik | membuka wa.me/62xxx dengan pesan terisi nama restoran |
| Filter harga maksimum | pilih nilai | daftar menyempit; URL berubah; state kosong muncul saat tidak ada hasil |
| Tautan "Lihat menu dan harga" | klik | pindah ke /restoran/[slug] yang benar |
| Slug tak dikenal | buka langsung | halaman 404 dengan tautan kembali |

## Gate rilis (dijalankan sebelum menyerahkan milestone)

Jawab semua dengan "tidak"; satu "ya" berarti milestone belum selesai:

1. Apakah ada tanda hubung panjang (em dash) di teks antarmuka?
2. Apakah ada kontrol yang tidak melakukan apa pun, atau tautan ke halaman yang tidak ada?
3. Apakah ada angka, rating, atau statistik tanpa sumber data?
4. Apakah ada pasangan warna teks yang rasionya belum dihitung?
5. Apakah ada elemen interaktif yang tidak bisa dijangkau keyboard, atau fokus tidak terlihat?
6. Apakah ada gambar atau iframe tanpa dimensi?
7. Apakah ada animasi yang berjalan terus tanpa tujuan, atau yang mengabaikan `prefers-reduced-motion`?
8. Apakah data contoh tampil tanpa badge "Data contoh (prototipe)"?

## Masalah umum dan penanganannya

- Tes gagal menemukan file: pastikan nama file berakhiran `.test.ts` atau `.test.tsx` dan berada dalam folder yang terjangkau config.
- ESLint tidak berjalan: pastikan `eslint.config.mjs` ada di root, bukan di dalam `app/`.
- Font tidak konsisten: font hanya dipasang lewat `next/font/google` di `app/layout.tsx`, jangan lewat tag `link` di komponen lain.
- `next/image` menolak gambar eksternal: daftarkan domainnya di `next.config.ts` dengan `images.remotePatterns`, atau simpan gambar di `public/`.
- Peringatan hidrasi: pastikan render pertama server dan klien identik; hindari `Date.now()` langsung di badan komponen server.

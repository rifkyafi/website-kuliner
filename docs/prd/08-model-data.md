# 08. Model Data

## Konvensi

- Proyek memakai JavaScript + JSX (tanpa TypeScript). Skema Zod tetap dipakai untuk validasi runtime saat data dimuat; hasil parse dipakai apa adanya, tanpa tipe turunan.
- Nama field dan fungsi: bahasa Inggris. Nilai enum yang tampil langsung ke pengguna: bahasa Indonesia ("buka", "tutup", "sibuk").
- Field `updatedAt` wajib ada di semua entitas data: inilah dasar baris "Diperbarui [tanggal]" (FR-02, NFR-04).

## Skema

```js
// lib/schemas.js
import { z } from "zod";

export const restaurantStatusSchema = z.enum(["buka", "tutup", "sibuk"]);

const jamSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const openingHourSchema = z.object({
  day: z.number().int().min(0).max(6),
  open: jamSchema,
  close: jamSchema,
});

export const restaurantSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  cuisine: z.string().min(1),
  priceLevel: z.number().int().min(1).max(4),
  halal: z.boolean(),
  status: restaurantStatusSchema,
  statusNote: z.string().optional(),
  updatedAt: z.string().min(10),
  hours: z.array(openingHourSchema),
  location: z.object({
    address: z.string().min(1),
    lat: z.number(),
    lng: z.number(),
    mapsUrl: z.string().url(),
  }),
  phone: z.string().regex(/^62\d{8,13}$/),
  coverPhoto: z.string().min(1),
});

export const menuItemSchema = z.object({
  id: z.string().min(1),
  restaurantId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().positive().nullable(),
  description: z.string().optional(),
  taste: z.string().optional(),
  allergens: z.array(z.string()).default([]),
  photo: z.string().optional(),
});

export const reviewPhotoSchema = z.object({
  url: z.string().min(1),
  alt: z.string().min(1),
});

export const reviewSchema = z.object({
  id: z.string().min(1),
  restaurantId: z.string().min(1),
  authorInitials: z.string().min(1).max(2),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(1),
  photos: z.array(reviewPhotoSchema).default([]),
  visitedOn: z.string().min(10),
});
```

`price` memakai `nullable()` dengan sengaja: item tanpa harga adalah kondisi nyata yang harus ditampilkan "harga belum tersedia" (FR-01), bukan disembunyikan atau diisi nol. Di JavaScript, cek dengan `item.price === null`.

## State tampilan data

Tanpa TypeScript, state tetap distandarkan sebagai bentuk objek berikut. Setiap tampilan data wajib menangani keempatnya lewat `switch` atau pemetaan yang setara:

| State | Bentuk objek |
|---|---|
| memuat | `{ status: "loading" }` |
| kosong | `{ status: "empty" }` |
| error | `{ status: "error", message: "penyebab" }` |
| siap | `{ status: "ready", data: [...] }` |

Alasan: bentuk seragam membuat penanganan state mudah diperiksa saat code review dan uji klik; NFR-06 diverifikasi lewat test perilaku dan catatan uji, bukan lewat tipe.

## Adapter dan seed

```js
// data/restaurants.js
import { restaurantSchema } from "@/lib/schemas";

// DATA CONTOH: ganti dengan data nyata sebelum rilis.
const seed = [
  /* 6-8 restoran contoh */
];

export const restaurants = restaurantSchema.array().parse(seed);

export async function getRestaurants() {
  return restaurants;
}

export async function getRestaurant(slug) {
  return restaurants.find((r) => r.slug === slug) ?? null;
}
```

Aturan seed:

1. Setiap file di `data/` diberi komentar `// DATA CONTOH: ganti dengan data nyata sebelum rilis.`
2. Badge "Data contoh (prototipe)" tampil di UI selama seed dipakai (NFR-04).
3. Isi seed boleh dari dua sumber: (a) data restoran asli yang dikumpulkan dan diverifikasi kelompok sendiri (lebih baik untuk demo), atau (b) entri yang jelas contoh (nama seperti "Warung Contoh Bu Sari"). Dilarang entri yang menyaru asli.
4. Foto: foto milik kelompok sendiri bila ada; bila tidak, placeholder berlabel dengan rasio tetap. Jangan memakai foto orang lain yang menyaru foto restoran.
5. Ulasan seed: inisial dan teks yang jelas berstatus contoh; rating agregat dihitung dari data itu dan tampil bersama badge data contoh.
6. Validasi `.parse()` dijalankan saat modul dimuat: seed yang tidak lolos skema langsung gagal di dev, bukan diam-diam di UI.

## Util format

```js
// lib/format.js
export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatTanggal(iso) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
```

## Pesan WhatsApp (FR-08)

```js
export function pesanWhatsApp(nomor, namaRestoran) {
  const teks = encodeURIComponent(
    `Halo, saya mau bertanya dan memesan dari ${namaRestoran}.`,
  );
  return `https://wa.me/${nomor}?text=${teks}`;
}
```

Nomor divalidasi skema (`62` diikuti 8-13 digit); tanpa nomor, tombol tidak dirender, tidak ada tombol mati.

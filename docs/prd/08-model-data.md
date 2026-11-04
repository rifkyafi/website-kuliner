# 08. Model Data

## Konvensi

- Nama tipe, field, dan fungsi: bahasa Inggris. Nilai enum yang tampil langsung ke pengguna: bahasa Indonesia ("buka", "tutup", "sibuk").
- Skema Zod adalah sumber tunggal tipe; tipe hasil `z.infer` diimpor, tidak ditulis dua kali.
- Field `updatedAt` wajib ada di semua entitas data: inilah dasar baris "Diperbarui [tanggal]" (FR-02, NFR-04).

## Skema

```ts
// lib/schemas.ts
import { z } from "zod";

export const restaurantStatusSchema = z.enum(["buka", "tutup", "sibuk"]);
export type RestaurantStatus = z.infer<typeof restaurantStatusSchema>;

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

export type Restaurant = z.infer<typeof restaurantSchema>;
export type OpeningHour = z.infer<typeof openingHourSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReviewPhoto = z.infer<typeof reviewPhotoSchema>;
```

`price` memakai `nullable()` dengan sengaja: item tanpa harga adalah kondisi nyata yang harus ditampilkan "harga belum tersedia" (FR-01), bukan disembunyikan atau diisi nol.

## State tampilan data

```ts
// types/index.ts
export type DataState<T> =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };
```

Alasan: union diskriminan memaksa komponen menangani keempat state lewat `switch` yang cakupannya diperiksa TypeScript. NFR-06 ditegakkan oleh tipe, bukan oleh ingatan developer.

## Adapter dan seed

```ts
// data/restaurants.ts
import { restaurantSchema, type Restaurant } from "@/lib/schemas";

// DATA CONTOH: ganti dengan data nyata sebelum rilis.
const seed: unknown = [
  /* 6-8 restoran contoh */
];

export const restaurants: Restaurant[] = restaurantSchema
  .array()
  .parse(seed);

export async function getRestaurants(): Promise<Restaurant[]> {
  return restaurants;
}

export async function getRestaurant(
  slug: string,
): Promise<Restaurant | null> {
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

```ts
// lib/format.ts
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatTanggal(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
```

## Pesan WhatsApp (FR-08)

```ts
export function pesanWhatsApp(nomor: string, namaRestoran: string): string {
  const teks = encodeURIComponent(
    `Halo, saya mau bertanya dan memesan dari ${namaRestoran}.`,
  );
  return `https://wa.me/${nomor}?text=${teks}`;
}
```

Nomor divalidasi skema (`62` diikuti 8-13 digit); tanpa nomor, tombol tidak dirender, tidak ada tombol mati.

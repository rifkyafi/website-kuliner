# 07. Arsitektur dan JSX

## Stack

| Pilihan | Alasan satu baris |
|---|---|
| Next.js 16 App Router | sudah terpasang di repo; SSR dan SEO cocok untuk katalog; `next/image` untuk foto |
| React 19 | bawaan Next 16 |
| JavaScript dan JSX | keputusan pemilik proyek: komponen `.jsx`, modul `.js`; tanpa TypeScript |
| Tailwind CSS 4 | konsistensi gaya cepat; token warna langsung dari DESIGN.md |
| Vitest + Testing Library | menggantikan sisa react-scripts (CRA); kompatibel dengan Testing Library yang sudah terpasang |
| Zod | validasi runtime saat data dimuat; tanpa tipe turunan |

## Struktur folder

```
app/
  layout.jsx
  page.jsx
  globals.css
  cari/
    page.jsx
  restoran/
    [slug]/
      page.jsx
  error.jsx
  not-found.jsx
components/
  ui/
    StatusBadge.jsx
    Chip.jsx
  restaurants/
    RestaurantCard.jsx
    MenuList.jsx
    ReviewList.jsx
    RatingStars.jsx
    MapEmbed.jsx
  search/
    SearchBar.jsx
    FilterPanel.jsx
lib/
  schemas.js
  format.js
data/
  restaurants.js
  menus.js
  reviews.js
```

## Aturan file (keputusan pemilik proyek, berlaku mutlak)

1. Semua komponen dan route berekstensi `.jsx`, tanpa pengecualian.
2. Modul tanpa JSX (lib, data, konfigurasi) berekstensi `.js`; konfigurasi yang butuh ESM murni memakai `.mjs`.
3. File `.ts` dan `.tsx` tidak dipakai. Keputusan ini menggantikan aturan `.tsx` sebelumnya (berubah pada 2026-11-04).
4. URL bahasa Indonesia (`/cari`, `/restoran/[slug]`) karena dibaca pengguna; nama kode bahasa Inggris karena mudah dicari di dokumentasi.
5. Komponen default Server Component; `"use client"` hanya untuk komponen dengan interaksi nyata (FilterPanel, SearchBar).

## Adapter data

Komponen tidak mengimpor seed secara langsung; semua lewat fungsi async di `data/`:

```js
export async function getRestaurants() { /* seluruh restoran */ }
export async function getRestaurant(slug) { /* satu restoran atau null */ }
export async function getMenu(restaurantId) { /* daftar menu */ }
export async function getReviews(restaurantId) { /* daftar ulasan */ }
```

Alasan: saat backend tersedia, isi fungsi diganti tanpa menyentuh satu komponen pun.

Halaman detail memakai params versi React 19 (berbentuk Promise):

```jsx
// app/restoran/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getRestaurant } from "@/data/restaurants";

export default async function RestaurantPage({ params }) {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);
  if (restaurant === null) notFound();
  return <main>{/* komponen detail */}</main>;
}
```

## Kerangka komponen inti (JSX murni, tanpa anotasi tipe)

```jsx
// components/ui/StatusBadge.jsx
const LABEL = {
  buka: "Buka sekarang",
  tutup: "Tutup",
  sibuk: "Sedang sibuk",
};

export function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}
```

Titik pada chip menandai status nyata (buka, tutup, sibuk), bukan dekorasi; karena itu boleh dipakai dan wajib disertai teks.

```jsx
// components/restaurants/RestaurantCard.jsx
import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function RestaurantCard({ restaurant }) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-none">
      <Image
        src={restaurant.coverPhoto}
        alt={`Foto ${restaurant.name}`}
        width={640}
        height={360}
        className="h-40 w-full rounded-lg object-cover"
      />
      <div className="mt-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-cocoa">{restaurant.name}</h3>
        <StatusBadge status={restaurant.status} />
      </div>
      <p className="text-sm text-cocoa">
        {restaurant.cuisine}
        {restaurant.halal ? " · Halal" : ""}
      </p>
      <Link
        href={`/restoran/${restaurant.slug}`}
        className="mt-2 inline-block font-semibold text-terracotta-dark"
      >
        Lihat menu dan harga
      </Link>
    </article>
  );
}
```

## Styling

Token warna didefinisikan sekali di `app/globals.css` (Tailwind 4, tanpa `tailwind.config.js`) dan identik dengan DESIGN.md:

```css
@import "tailwindcss";

@theme {
  --color-cream: #faf5ef;
  --color-cocoa: #3d2c23;
  --color-terracotta: #b5542b;
  --color-terracotta-dark: #8f3e1f;
  --color-line: #c9b8a3;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge-buka { color: #14532d; background-color: #e7f4ec; }
.status-badge-tutup { color: #7f1d1d; background-color: #fde8e8; }
.status-badge-sibuk { color: #7c4a03; background-color: #fbefd5; }

.status-badge-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: currentColor;
}
```

Alasan token di CSS: satu sumber kebenaran bersama DESIGN.md, dan Tailwind 4 mendeteksi konten otomatis tanpa konfigurasi glob.

## Gambar

- `next/image` selalu dengan `width` dan `height` (atau rasio via `aspect-ratio` pada className)
- Foto utama atas layar diberi prop `priority` (prioritas tinggi, tidak lazy)
- Daftar kartu: dimuat lazy otomatis oleh `next/image` untuk yang di bawah fold

## Testing

```js
// vitest.config.mjs
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
```

```js
// vitest.setup.js
import "@testing-library/jest-dom/vitest";
```

Contoh test util:

```js
// lib/format.test.js
import { describe, expect, it } from "vitest";
import { formatRupiah } from "@/lib/format";

describe("formatRupiah", () => {
  it("memformat angka ke Rupiah tanpa desimal", () => {
    expect(formatRupiah(15000)).toBe("Rp 15.000");
  });
});
```

Contoh test komponen (memastikan status bukan warna saja):

```jsx
// components/ui/StatusBadge.test.jsx
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";

it("menampilkan teks status, bukan hanya warna", () => {
  render(<StatusBadge status="tutup" />);
  expect(screen.getByText("Tutup")).toBeInTheDocument();
});
```

## Lint dan konfigurasi

```js
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
```

Preset `next/typescript` tidak dipakai karena proyek JavaScript; aturan ekstensi file tetap ditegakkan lewat NFR-07 dan review.

Skrip `package.json` hasil M0:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Alias impor `@/*` (pengganti `paths` milik tsconfig):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".next"]
}
```

File di atas bernama `jsconfig.json`, dibaca editor dan Next.js untuk alias serta bantuan navigasi.

## Konvensi penamaan

- Komponen: PascalCase, file `.jsx`, satu komponen utama per file
- Fungsi util dan skema: camelCase, file `.js`
- Branch: `m1-model-data`, `fitur/filter-harga`; commit kecil dengan pesan menjelaskan perubahan

## Migrasi repo dari TypeScript (bagian M0)

1. Hapus `tsconfig.json` dan `next-env.d.ts`.
2. Copot dependensi TypeScript: `npm uninstall typescript @types/node @types/react`.
3. Ganti nama file `.tsx` menjadi `.jsx` dan `.ts` menjadi `.js`; mulai dari `app/pages/homepage.tsx` yang dipindah menjadi `app/page.jsx`.
4. Buat `jsconfig.json` (isi di atas).
5. Jalankan `npm run build` untuk memastikan Next.js berjalan dalam mode JavaScript tanpa sisa konfigurasi TypeScript.

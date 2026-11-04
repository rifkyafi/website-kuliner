# 07. Arsitektur dan TypeScript

## Stack

| Pilihan | Alasan satu baris |
|---|---|
| Next.js 16 App Router | sudah terpasang di repo; SSR dan SEO cocok untuk katalog; `next/image` untuk foto |
| React 19 | bawaan Next 16 |
| TypeScript strict | kesalahan tertangkap saat menulis; mendukung aturan .tsx dari pemilik proyek |
| Tailwind CSS 4 | konsistensi gaya cepat; token warna langsung dari DESIGN.md |
| Vitest + Testing Library | menggantikan sisa react-scripts (CRA); kompatibel dengan Testing Library yang sudah terpasang |
| Zod | validasi seed dan sumber tipe tunggal (lihat `08-model-data.md`) |

## Struktur folder

```
app/
  layout.tsx
  page.tsx
  globals.css
  cari/
    page.tsx
  restoran/
    [slug]/
      page.tsx
  error.tsx
  not-found.tsx
components/
  ui/
    StatusBadge.tsx
    Chip.tsx
  restaurants/
    RestaurantCard.tsx
    MenuList.tsx
    ReviewList.tsx
    RatingStars.tsx
    MapEmbed.tsx
  search/
    SearchBar.tsx
    FilterPanel.tsx
lib/
  schemas.ts
  format.ts
data/
  restaurants.ts
  menus.ts
  reviews.ts
types/
  index.ts
```

## Aturan file (keputusan pemilik proyek, berlaku mutlak)

1. Semua komponen dan route berekstensi `.tsx`, tanpa pengecualian.
2. Modul tanpa JSX (lib, data, types, konfigurasi) berekstensi `.ts`.
3. `.js` dan `.jsx` dilarang di seluruh repo; `allowJs: false` di tsconfig menjaga aturan ini secara otomatis.
4. URL bahasa Indonesia (`/cari`, `/restoran/[slug]`) karena dibaca pengguna; nama kode bahasa Inggris karena mudah dicari di dokumentasi.
5. Komponen default Server Component; `"use client"` hanya untuk komponen dengan interaksi nyata (FilterPanel, SearchBar).

## Adapter data

Komponen tidak mengimpor seed secara langsung; semua lewat fungsi async:

```ts
export async function getRestaurants(): Promise<Restaurant[]>;
export async function getRestaurant(slug: string): Promise<Restaurant | null>;
export async function getMenu(restaurantId: string): Promise<MenuItem[]>;
export async function getReviews(restaurantId: string): Promise<Review[]>;
```

Alasan: saat backend tersedia, isi fungsi diganti tanpa menyentuh satu komponen pun.

Halaman detail memakai params versi React 19 (berbentuk Promise):

```tsx
// app/restoran/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getRestaurant } from "@/data/restaurants";

type RestaurantPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);
  if (restaurant === null) notFound();
  return <main>{/* komponen detail */}</main>;
}
```

## Kerangka komponen inti (.tsx, tipe eksplisit)

```tsx
// components/ui/StatusBadge.tsx
import type { RestaurantStatus } from "@/types";

type StatusBadgeProps = {
  status: RestaurantStatus;
};

const LABEL: Record<RestaurantStatus, string> = {
  buka: "Buka sekarang",
  tutup: "Tutup",
  sibuk: "Sedang sibuk",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}
```

Titik pada chip menandai status nyata (buka, tutup, sibuk), bukan dekorasi; karena itu boleh dipakai dan wajib disertai teks.

```tsx
// components/restaurants/RestaurantCard.tsx
import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
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

- `next/image` selalu dengan `width` dan `height` (atau rasio via className dengan `aspect-ratio`)
- Foto utama atas layar diberi prop `priority` (prioritas tinggi, tidak lazy)
- Daftar kartu: dimuat lazy otomatis oleh `next/image` untuk yang di bawah fold

## Testing

```ts
// vitest.config.ts
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

Contoh test util:

```ts
// lib/format.test.ts
import { describe, expect, it } from "vitest";
import { formatRupiah } from "@/lib/format";

describe("formatRupiah", () => {
  it("memformat angka ke Rupiah tanpa desimal", () => {
    expect(formatRupiah(15000)).toBe("Rp 15.000");
  });
});
```

Contoh test komponen (memastikan status bukan warna saja):

```tsx
// components/ui/StatusBadge.test.tsx
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

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

Skrip `package.json` hasil M0:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Perubahan `tsconfig.json` pada M0:

- `strict: true` (dari `false`)
- `allowJs: false` (dari `true`)
- `noUncheckedIndexedAccess: true`
- `paths`: `"@/*": ["./*"]` dengan `baseUrl: "."`

## Konvensi penamaan

- Komponen: PascalCase, file `.tsx`, satu komponen utama per file
- Fungsi util dan skema: camelCase, file `.ts`
- Tipe: PascalCase; field bahasa Inggris; nilai enum yang tampil ke pengguna bahasa Indonesia ("buka", "tutup", "sibuk")
- Branch: `m1-model-data`, `fitur/filter-harga`; commit kecil dengan pesan menjelaskan perubahan

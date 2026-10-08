import { getProducts } from "@/lib/catalog";

/** Number of colour combinations defined in src/app/product-themes.css. */
export const PRODUCT_THEME_COUNT = 8;

/**
 * Each product gets its own colour combination from the ToyoApps palette, the
 * way every Zoho product site has its own colour. Assigned in catalog order so
 * neighbouring products (same category) never share a combination.
 */
export function productThemeClass(slug: string): string {
  const i = Math.max(0, getProducts().findIndex((p) => p.slug === slug));
  return `pt pt-${i % PRODUCT_THEME_COUNT}`;
}

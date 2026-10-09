import { getProductStory } from "@/lib/product-story";

/**
 * Wrapper class for a product site: the shared product scope (.pt) plus the
 * product's look (palette + bands), chosen per product in product-story.ts.
 */
export function productThemeClass(slug: string): string {
  const s = getProductStory(slug);
  return `pt look-${s.look} ref-${s.hero}${s.serif ? " ref-serif-type" : ""}`;
}

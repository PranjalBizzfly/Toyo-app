import type { CatalogItem } from "@/components/product/CatalogBrowser";
import type { Product } from "@/content/types";
import { getCategory } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { monogram, productAccent } from "@/lib/tint";

/** Product → card data for the Zoho-style catalog listing (all products, category pages). */
export function toCatalogItem(p: Product, note?: string): CatalogItem {
  return {
    slug: p.slug,
    href: routes.product(p.slug),
    name: p.name,
    description: p.shortDescription,
    accent: productAccent(p),
    initials: monogram(p.name),
    logo: p.logo?.src,
    pending: p.status === "pending",
    note,
    keywords: [p.name, p.shortDescription, p.primaryUseCase, getCategory(p.category)?.name, ...(p.audience ?? []), ...(p.features ?? []).map((f) => f.name)]
      .join(" ")
      .toLowerCase(),
  };
}

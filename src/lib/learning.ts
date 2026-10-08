import { getCategory, getProducts } from "./catalog";
import { getAvailableSections, getProductItems } from "./product-sections";
import { routes } from "./routes";
import { productAccent } from "./tint";

/** A real guide or support topic from product data, linked to its existing page. */
export interface LearningItem {
  title: string;
  summary: string;
  href: string;
  kind: "Guide" | "Support topic";
  product: string;
  productSlug: string;
  category: string;
  categorySlug: string;
  accent: string;
}

/** Every product resource and support topic already in src/content/products. */
export function getLearningItems(): LearningItem[] {
  return getProducts().flatMap((p) => {
    const sections = getAvailableSections(p);
    const category = getCategory(p.category);
    return (["resources", "support"] as const).flatMap((s) =>
      getProductItems(p, s).map((i) => ({
        title: i.name,
        summary: i.summary,
        href: i.hasPage ? routes.productItem(p.slug, s, i.slug) : sections.includes(s) ? routes.productSection(p.slug, s) : routes.product(p.slug),
        kind: s === "resources" ? ("Guide" as const) : ("Support topic" as const),
        product: p.name,
        productSlug: p.slug,
        category: category?.name ?? "Other",
        categorySlug: category?.slug ?? "other",
        accent: productAccent(p),
      })),
    );
  });
}

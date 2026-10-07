import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { comparisons, industries, integrations, resources, solutions } from "@/content/registries";
import type { Category, ContentStatus, Feature, Product, ResourceType } from "@/content/types";
import { featureHasPage } from "./rules";

/**
 * Single read API over the content layer. Pages and components never import
 * raw content arrays — they go through here so visibility rules are uniform.
 */

/** Preview mode renders placeholder/draft content (badged and noindexed). */
export const previewMode =
  process.env.TOYO_SHOW_PLACEHOLDERS === "1" ||
  (process.env.TOYO_SHOW_PLACEHOLDERS !== "0" && process.env.NODE_ENV === "development");

export function isVisible(status: ContentStatus | undefined): boolean {
  if (status === undefined || status === "live" || status === "coming-soon" || status === "pending") return true;
  return previewMode;
}

/** Only real, published content is indexable. */
export function isIndexable(status: ContentStatus | undefined): boolean {
  return status === undefined || status === "live" || status === "coming-soon";
}

const visible = <T extends { status?: ContentStatus }>(items: T[]) => items.filter((i) => isVisible(i.status));

/* Categories ---------------------------------------------------------- */

export function getCategories(): Category[] {
  return visible(categories).sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

/* Products ------------------------------------------------------------ */

export function getProducts(): Product[] {
  const order = new Map(getCategories().map((c, i) => [c.slug, i]));
  return visible(products).sort(
    (a, b) => (order.get(a.category) ?? 999) - (order.get(b.category) ?? 999) || a.name.localeCompare(b.name),
  );
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return getProducts().filter((p) => p.featured).slice(0, limit);
}

/** Every product listed in a category — primary listings first, then secondary. */
export function getProductsByCategory(categorySlug: string): Product[] {
  const all = getProducts();
  return [
    ...all.filter((p) => p.category === categorySlug),
    ...all.filter((p) => p.category !== categorySlug && p.secondaryCategories?.includes(categorySlug)),
  ];
}

/** Minimum published listings for a category page to be indexed and shown in menus. */
export const MIN_CATEGORY_LISTINGS = 2;

/** Only counts real published products, so preview mode can't change indexing. */
export function isCategoryIndexable(category: Category): boolean {
  if (!isIndexable(category.status)) return false;
  return getProductsByCategory(category.slug).filter((p) => isIndexable(p.status)).length >= MIN_CATEGORY_LISTINGS;
}

/**
 * Categories with their products for navigation: only categories that pass the
 * indexing rule (in preview, any non-empty category). Drives the mega menu,
 * footer and category explorer.
 */
export function getCatalogTree(): { category: Category; products: Product[] }[] {
  return getCategories()
    .map((category) => ({ category, products: getProductsByCategory(category.slug) }))
    .filter((g) => g.products.length > 0 && (previewMode || isCategoryIndexable(g.category)));
}

/** Related products: explicit, then stated connections, then the same categories. */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const seen = new Set([product.slug]);
  const out: Product[] = [];
  const add = (p: Product | undefined) => {
    if (p && !seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  };
  (product.relatedProducts ?? []).forEach((s) => add(getProduct(s)));
  (product.connections ?? []).forEach((c) => add(getProduct(c.product)));
  getProducts()
    .filter((p) => p.connections?.some((c) => c.product === product.slug))
    .forEach(add);
  [product.category, ...(product.secondaryCategories ?? [])].forEach((c) => getProductsByCategory(c).forEach(add));
  return out.slice(0, limit);
}

/** Connections in both directions: what this product states, and what others state about it. */
export function getConnections(product: Product): { product: Product; description: string }[] {
  const outgoing = (product.connections ?? [])
    .map((c) => ({ product: getProduct(c.product), description: c.description }))
    .filter((c): c is { product: Product; description: string } => !!c.product);
  const incoming = getProducts().flatMap((p) =>
    (p.connections ?? []).filter((c) => c.product === product.slug).map((c) => ({ product: p, description: c.description })),
  );
  return [...outgoing, ...incoming];
}

/* Features ------------------------------------------------------------ */

export function getFeatures(product: Product): Feature[] {
  return visible(product.features ?? []);
}

export { featureHasPage };

export function getFeature(product: Product, slug: string): Feature | undefined {
  return getFeatures(product).find((f) => f.slug === slug && featureHasPage(f));
}

/** Features grouped by the product's feature categories (ungrouped last). */
export function groupFeatures(product: Product) {
  const features = getFeatures(product);
  const groups = (product.featureCategories ?? [])
    .map((fc) => ({ group: fc, features: features.filter((f) => f.category === fc.slug) }))
    .filter((g) => g.features.length);
  const known = new Set(groups.flatMap((g) => g.features));
  const rest = features.filter((f) => !known.has(f));
  if (rest.length) groups.push({ group: { slug: "other", name: groups.length ? "More" : "Features" }, features: rest });
  return groups;
}

/* Registries ---------------------------------------------------------- */

export const getSolutions = () => visible(solutions);
export const getIndustries = () => visible(industries);
/** Integrations used by at least one visible product (drafts never surface an integration). */
export const getIntegrations = () =>
  visible(integrations)
    .filter((i) => i.products.some((s) => getProduct(s)))
    .sort((a, b) => a.name.localeCompare(b.name));

/** Integration detail pages exist only with written content. */
export const integrationHasPage = (i: { body?: string[] }) => !!i.body?.length;

/** Feature-group hubs exist only with written intro content and ≥ 3 features. */
export function getFeatureGroupsWithPages(product: Product) {
  return groupFeatures(product).filter((g) => !!g.group.body?.length && g.features.length >= 3);
}
export const getComparisons = () => visible(comparisons);
export const getResources = (type?: ResourceType) =>
  visible(resources)
    .filter((r) => !type || r.type === type)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Resolve a product's slug references against a registry. */
export function resolve<T extends { slug: string; status?: ContentStatus }>(slugs: string[] | undefined, pool: T[]): T[] {
  if (!slugs?.length) return [];
  return slugs.map((s) => pool.find((p) => p.slug === s)).filter((x): x is T => !!x && isVisible(x.status));
}

export function productsFor(slugs: string[]): Product[] {
  return slugs.map(getProduct).filter((p): p is Product => !!p);
}

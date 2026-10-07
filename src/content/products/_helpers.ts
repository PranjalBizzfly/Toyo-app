import type { Feature, FeatureCategory } from "@/content/types";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Build one feature group and its features in one go.
 * Each entry is `[name, summary]`; names are kept exactly as the product site
 * states them. Features have no `body`, so no detail pages are generated.
 */
export function group(
  name: string,
  items: [name: string, summary: string][],
  opts: { highlight?: number; description?: string } = {},
): { category: FeatureCategory; features: Feature[] } {
  const slug = slugify(name);
  return {
    category: { slug, name, description: opts.description },
    features: items.map(([n, summary], i) => ({
      slug: slugify(n),
      name: n,
      summary,
      category: slug,
      highlight: i < (opts.highlight ?? 0),
    })),
  };
}

/** Merge several groups into the product's featureCategories + features fields. */
export function featureSet(...groups: ReturnType<typeof group>[]) {
  return {
    featureCategories: groups.map((g) => g.category),
    features: groups.flatMap((g) => g.features),
  };
}

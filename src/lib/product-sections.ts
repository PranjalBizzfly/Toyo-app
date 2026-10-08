import type { Product } from "@/content/types";
import { getComparisons, getFeatures, getIndustries, getIntegrations, getResources, getSolutions, groupFeatures, resolve } from "./catalog";
import { productSections, type ProductSection } from "./routes";
import { entityHasPage, featureHasPage, MIN_SECURITY_ITEMS } from "./rules";

/** Features shown on a product overview before the full features hub is needed. */
export const OVERVIEW_FEATURE_LIMIT = 6;

/** Sections that can have product-scoped detail pages at /products/[p]/[section]/[item]. */
export const itemSections = ["solutions", "industries", "integrations", "compare", "resources", "support"] as const;
export type ItemSection = (typeof itemSections)[number];

/** A product-scoped entry, normalised across the six entity types. */
export interface ProductItem {
  slug: string;
  name: string;
  summary: string;
  hasPage: boolean;
  /** The raw entity, for the detail template. */
  entity: Record<string, unknown> & { slug: string; name: string; summary: string; sources: string[] };
}

/** Product-scoped entries for a section, flagged with whether each earns a page. */
export function getProductItems(product: Product, section: ItemSection): ProductItem[] {
  const raw =
    section === "solutions"
      ? product.productSolutions
      : section === "industries"
        ? product.productIndustries
        : section === "integrations"
          ? product.productIntegrations
          : section === "compare"
            ? product.productComparisons
            : section === "resources"
              ? product.productResources
              : product.supportTopics;
  return (raw ?? []).map((e) => ({
    slug: e.slug,
    name: e.name,
    summary: e.summary,
    hasPage: entityHasPage(e as never),
    entity: e as never,
  }));
}

export function getProductItem(product: Product, section: ItemSection, slug: string): ProductItem | undefined {
  return getProductItems(product, section).find((i) => i.slug === slug && i.hasPage);
}

/**
 * Which sub-pages a product actually has. A section exists only when the
 * product has real content for it — no thin pages, no dead nav links.
 */
export function getProductSectionData(product: Product) {
  return {
    features: getFeatures(product),
    solutions: resolve(product.solutions, getSolutions()),
    industries: resolve(product.industries, getIndustries()),
    integrations: resolve(product.integrations, getIntegrations()),
    compare: resolve(product.comparisons, getComparisons()),
    resources: resolve(product.resources, getResources()),
  };
}

export function getAvailableSections(product: Product): ProductSection[] {
  const d = getProductSectionData(product);
  const has_ = (s: ItemSection) => getProductItems(product, s).some((i) => i.hasPage);
  const has: Record<ProductSection, boolean> = {
    overview: true,
    // A features hub only when it adds something the overview cannot show (Zoho study §7).
    features: d.features.length > OVERVIEW_FEATURE_LIMIT || groupFeatures(product).length > 1 || d.features.some(featureHasPage),
    solutions: d.solutions.length > 0 || has_("solutions"),
    industries: d.industries.length > 0 || has_("industries"),
    integrations: d.integrations.length > 0 || has_("integrations"),
    pricing: !!product.pricing?.plans.length,
    security: (product.security?.length ?? 0) >= MIN_SECURITY_ITEMS,
    compare: d.compare.length > 0 || has_("compare"),
    resources: d.resources.length > 0 || has_("resources"),
    // A support page needs somewhere to route to, or real support topics.
    support: !!(product.supportUrl || product.docsUrl) || has_("support"),
  };
  return productSections.filter((s) => has[s]);
}

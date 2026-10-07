import type { Product } from "@/content/types";
import { getComparisons, getFeatures, getIndustries, getIntegrations, getResources, getSolutions, groupFeatures, resolve } from "./catalog";
import { productSections, type ProductSection } from "./routes";

/** Features shown on a product overview before the full features hub is needed. */
export const OVERVIEW_FEATURE_LIMIT = 6;

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
  const has: Record<ProductSection, boolean> = {
    overview: true,
    // A features hub only when it adds something the overview cannot show (Zoho study §7).
    features: d.features.length > OVERVIEW_FEATURE_LIMIT || groupFeatures(product).length > 1,
    solutions: d.solutions.length > 0,
    industries: d.industries.length > 0,
    integrations: d.integrations.length > 0,
    pricing: !!product.pricing?.plans.length,
    compare: d.compare.length > 0,
    resources: d.resources.length > 0,
    // FAQs live on the overview; a support page exists only with somewhere to route to.
    support: !!(product.supportUrl || product.docsUrl),
  };
  return productSections.filter((s) => has[s]);
}

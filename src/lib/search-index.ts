import { getCategories, getFeatureGroupsWithPages, getFeatures, getIndustries, getIntegrations, getProducts, getSolutions, isIndexable } from "./catalog";
import { getAvailableSections, getProductItems, itemSections } from "./product-sections";
import { routes, sectionLabels } from "./routes";
import { featureHasPage } from "./rules";

/** One searchable page. Built at build time from the same data that generates the pages. */
export interface SearchEntry {
  title: string;
  type: string;
  href: string;
  description: string;
  product?: string;
}

const typeOf: Record<string, string> = {
  solutions: "Solution",
  industries: "Industry",
  integrations: "Integration",
  compare: "Comparison",
  resources: "Resource",
  support: "Support",
};

/**
 * Every real page on the site that a visitor might look for: products,
 * categories, feature groups, features, product sub-pages and product-scoped
 * detail pages, plus global solutions/industries/integrations.
 */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const c of getCategories()) out.push({ title: c.name, type: "Category", href: routes.category(c.slug), description: c.tagline });
  for (const p of getProducts()) {
    if (!isIndexable(p.status) && p.status !== "pending") continue;
    out.push({ title: p.name, type: "Product", href: routes.product(p.slug), description: p.shortDescription, product: p.name });
    for (const s of getAvailableSections(p)) {
      if (s === "overview") continue;
      out.push({ title: `${p.name} ${sectionLabels[s].toLowerCase()}`, type: sectionLabels[s], href: routes.productSection(p.slug, s), description: `${sectionLabels[s]} for ${p.name}.`, product: p.name });
    }
    for (const g of getFeatureGroupsWithPages(p))
      out.push({ title: g.group.name, type: "Feature group", href: routes.featureGroup(p.slug, g.group.slug), description: g.group.description ?? `${g.features.length} ${p.name} features`, product: p.name });
    for (const f of getFeatures(p).filter(featureHasPage))
      out.push({ title: f.name, type: "Feature", href: routes.feature(p.slug, f.slug), description: f.summary, product: p.name });
    for (const s of itemSections)
      for (const i of getProductItems(p, s).filter((x) => x.hasPage))
        out.push({ title: i.name, type: typeOf[s], href: routes.productItem(p.slug, s, i.slug), description: i.summary, product: p.name });
  }
  for (const s of getSolutions()) out.push({ title: s.name, type: "Solution", href: routes.solution(s.slug), description: s.summary });
  for (const i of getIndustries()) out.push({ title: i.name, type: "Industry", href: routes.industry(i.slug), description: i.summary });
  for (const i of getIntegrations()) out.push({ title: i.name, type: "Integration", href: `${routes.integrations()}#${i.slug}`, description: i.summary });
  return out;
}

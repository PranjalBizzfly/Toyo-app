import type { Faq, Product } from "@/content/types";
import {
  getCategories,
  getCategory,
  getFeatureGroupsWithPages,
  getFeatures,
  getIndustries,
  getIntegrations,
  getProduct,
  getProducts,
  getResources,
  getSolutions,
  integrationHasPage,
  isIndexable,
  resolve,
} from "./catalog";
import { getAvailableSections, getProductItems, itemSections } from "./product-sections";
import { routes, sectionLabels } from "./routes";
import { featureHasPage } from "./rules";

export type SearchType =
  | "Product"
  | "Feature"
  | "Feature group"
  | "Solution"
  | "Industry"
  | "Integration"
  | "Resource"
  | "FAQ"
  | "Category"
  | "Support"
  | "Product page";

/** A labelled link shown under a result ("Related"). */
export interface SearchLink {
  label: string;
  href: string;
}

/**
 * One searchable item. Built at build time from the same data that generates
 * the pages, so every result points at a real page (or a real anchor on one).
 */
export interface SearchEntry {
  id: string;
  title: string;
  type: SearchType;
  href: string;
  description: string;
  /** Owning product, for product-scoped items. */
  product?: string;
  productSlug?: string;
  category?: string;
  categorySlug?: string;
  /** Filter facets, as slugs. */
  industries?: string[];
  solutions?: string[];
  integrations?: string[];
  /** Related pages shown under the result. */
  related?: SearchLink[];
  /** Extra text that is searched but not shown. */
  keywords?: string;
}

const MAX_DESC = 220;
const clip = (s: string | undefined) => {
  const t = (s ?? "").replace(/\s+/g, " ").trim();
  return t.length > MAX_DESC ? `${t.slice(0, MAX_DESC - 1).replace(/\s+\S*$/, "")}…` : t;
};

const itemType: Record<string, SearchType> = {
  solutions: "Solution",
  industries: "Industry",
  integrations: "Integration",
  compare: "Product page",
  resources: "Resource",
  support: "Support",
};

const productLink = (slug: string): SearchLink | null => {
  const p = getProduct(slug);
  return p ? { label: p.name, href: routes.product(p.slug) } : null;
};
const productLinks = (slugs: string[] | undefined) => (slugs ?? []).map(productLink).filter((l): l is SearchLink => !!l);

/** Facets every product-scoped entry inherits from its product. */
function productFacets(p: Product) {
  const category = getCategory(p.category);
  return {
    product: p.name,
    productSlug: p.slug,
    category: category?.name,
    categorySlug: category?.slug,
    industries: p.industries ?? [],
    solutions: p.solutions ?? [],
    integrations: p.integrations ?? [],
  };
}

function faqEntries(faqs: Faq[] | undefined, href: string, idBase: string, base: Partial<SearchEntry>, parent?: SearchLink): SearchEntry[] {
  return (faqs ?? []).map((f, i) => ({
    ...base,
    id: `${idBase}:faq:${i}`,
    title: f.question,
    type: "FAQ" as const,
    href,
    description: clip(f.answer),
    related: parent ? [parent] : undefined,
  }));
}

/**
 * Everything a visitor might look for: products, their features, feature
 * groups, sub-pages and FAQs; categories; solutions, industries, integrations
 * and resources; and the support pages.
 */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];

  for (const c of getCategories())
    out.push({ id: `cat:${c.slug}`, title: c.name, type: "Category", href: routes.category(c.slug), description: clip(c.tagline), category: c.name, categorySlug: c.slug });

  for (const p of getProducts()) {
    if (!isIndexable(p.status) && p.status !== "pending") continue;
    const facets = productFacets(p);
    const sections = getAvailableSections(p);
    const featuresHref = sections.includes("features") ? routes.productSection(p.slug, "features") : routes.product(p.slug);

    out.push({
      ...facets,
      id: `p:${p.slug}`,
      title: p.name,
      type: "Product",
      href: routes.product(p.slug),
      description: clip(p.shortDescription),
      keywords: [p.tagline, p.primaryUseCase, p.longDescription].filter(Boolean).join(" "),
      related: [
        ...resolve(p.solutions, getSolutions()).slice(0, 2).map((s) => ({ label: s.name, href: routes.solution(s.slug) })),
        ...resolve(p.industries, getIndustries()).slice(0, 2).map((s) => ({ label: s.name, href: routes.industry(s.slug) })),
      ],
    });

    for (const s of sections) {
      if (s === "overview") continue;
      out.push({ ...facets, id: `p:${p.slug}:${s}`, title: `${p.name} ${sectionLabels[s]}`, type: s === "support" ? "Support" : "Product page", href: routes.productSection(p.slug, s), description: `${sectionLabels[s]} for ${p.name}.` });
    }

    for (const g of getFeatureGroupsWithPages(p))
      out.push({ ...facets, id: `p:${p.slug}:g:${g.group.slug}`, title: g.group.name, type: "Feature group", href: routes.featureGroup(p.slug, g.group.slug), description: clip(g.group.description ?? `${g.features.length} ${p.name} features, including ${g.features.slice(0, 3).map((f) => f.name).join(", ")}.`) });

    for (const f of getFeatures(p)) {
      const href = featureHasPage(f) ? routes.feature(p.slug, f.slug) : featuresHref;
      out.push({ ...facets, id: `p:${p.slug}:f:${f.slug}`, title: f.name, type: "Feature", href, description: clip(f.summary) });
      if (featureHasPage(f)) out.push(...faqEntries(f.faqs, href, `p:${p.slug}:f:${f.slug}`, facets, { label: f.name, href }));
    }

    for (const s of itemSections)
      for (const i of getProductItems(p, s).filter((x) => x.hasPage))
        out.push({ ...facets, id: `p:${p.slug}:${s}:${i.slug}`, title: i.name, type: itemType[s] ?? "Product page", href: routes.productItem(p.slug, s, i.slug), description: clip(i.summary) });

    out.push(...faqEntries(p.faqs, `${routes.product(p.slug)}#faq`, `p:${p.slug}`, facets));
  }

  for (const s of getSolutions()) {
    const href = routes.solution(s.slug);
    out.push({ id: `sol:${s.slug}`, title: s.name, type: "Solution", href, description: clip(s.summary), keywords: s.problem, solutions: [s.slug], related: productLinks(s.products) });
    out.push(...faqEntries(s.faqs, href, `sol:${s.slug}`, { solutions: [s.slug] }, { label: s.name, href }));
  }
  for (const i of getIndustries()) {
    const href = routes.industry(i.slug);
    out.push({ id: `ind:${i.slug}`, title: i.name, type: "Industry", href, description: clip(i.summary), industries: [i.slug], related: productLinks(i.products) });
    out.push(...faqEntries(i.faqs, href, `ind:${i.slug}`, { industries: [i.slug] }, { label: i.name, href }));
  }
  for (const i of getIntegrations())
    out.push({
      id: `int:${i.slug}`,
      title: i.name,
      type: "Integration",
      href: integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`,
      description: clip(i.summary),
      keywords: [i.category, i.vendor].filter(Boolean).join(" "),
      integrations: [i.slug],
      related: productLinks(i.products),
    });
  for (const r of getResources())
    out.push({ id: `res:${r.type}:${r.slug}`, title: r.name, type: "Resource", href: routes.resource(r.type, r.slug), description: clip(r.summary), industries: r.industries, related: productLinks(r.products) });

  out.push(
    { id: "support", title: "Help & support", type: "Support", href: routes.support(), description: "Get help with ToyoApps and find each product's own support and documentation." },
    { id: "contact", title: "Contact ToyoApps", type: "Support", href: routes.contact(), description: "Talk to the ToyoApps team about products, listings or anything else." },
  );
  return out;
}

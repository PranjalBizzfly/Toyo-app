import type { Faq, Product } from "@/content/types";
import {
  getCategories,
  getCategory,
  getComparisons,
  getFeatureGroupsWithPages,
  getFeatures,
  getIndustries,
  getIntegrations,
  getProductsByCategory,
  getProducts,
  getResources,
  getSolutions,
  integrationHasPage,
} from "./catalog";
import { getAvailableSections, getProductItems, itemSections } from "./product-sections";
import { resourceTypes, routes, sectionLabels } from "./routes";
import { featureHasPage } from "./rules";
import type { SearchType } from "./search-score";

export type { SearchType } from "./search-score";

/**
 * One searchable item. Built at build time from the same data that generates
 * the pages, so every result points at a real page (or a real anchor on one).
 */
export interface SearchEntry {
  id: string;
  title: string;
  type: SearchType;
  href: string;
  /** Concise, at most 180 characters. */
  description: string;
  /** Owning product, for product-scoped items. */
  product?: string;
  productSlug?: string;
  category?: string;
  categorySlug?: string;
  /** Product status when it is not live (e.g. "pending"). */
  status?: string;
  /** Filter facets, as slugs. */
  industries?: string[];
  solutions?: string[];
  integrations?: string[];
  /** Extra text that is searched but not shown. */
  keywords?: string;
}

const MAX_DESC = 180;
const clip = (s: string | undefined) => {
  const t = (s ?? "").replace(/\s+/g, " ").trim();
  return t.length > MAX_DESC ? `${t.slice(0, MAX_DESC - 1).replace(/[\s,;:.]+\S*$/, "")}…` : t;
};
const kw = (...parts: (string | string[] | undefined | null | false)[]) =>
  parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, 600);

const itemType: Record<string, SearchType> = {
  solutions: "Solution",
  industries: "Industry",
  integrations: "Integration",
  compare: "Page",
  resources: "Resource",
  support: "Support",
};

/** Facets every product-scoped entry inherits from its product. */
function productFacets(p: Product) {
  const category = getCategory(p.category);
  return {
    product: p.name,
    productSlug: p.slug,
    category: category?.name,
    categorySlug: category?.slug,
    status: p.status === "live" ? undefined : p.status,
    industries: p.industries ?? [],
    solutions: p.solutions ?? [],
    integrations: p.integrations ?? [],
  };
}

function faqEntries(faqs: Faq[] | undefined, href: string, idBase: string, base: Partial<SearchEntry>): SearchEntry[] {
  return (faqs ?? []).map((f, i) => ({ ...base, id: `${idBase}:faq:${i}`, title: f.question, type: "FAQ" as const, href, description: clip(f.answer) }));
}

/** Public site pages outside the catalog (all exist as static routes). */
const sitePages: { title: string; href: string; type: SearchType; description: string; keywords: string }[] = [
  { title: "All products", href: routes.products(), type: "Page", description: "The full ToyoApps product catalog, grouped by business category.", keywords: "catalog apps software directory" },
  { title: "Solutions", href: routes.solutions(), type: "Page", description: "Start from a business goal and see which ToyoApps products help with it.", keywords: "use cases goals" },
  { title: "Industries", href: routes.industries(), type: "Page", description: "ToyoApps software matched to the sector you work in.", keywords: "sectors verticals" },
  { title: "Integrations", href: routes.integrations(), type: "Page", description: "Every tool and service ToyoApps products connect with.", keywords: "connect apps directory" },
  { title: "Compare", href: routes.compare(), type: "Page", description: "Side-by-side comparisons of ToyoApps products and alternatives.", keywords: "comparison versus vs alternatives" },
  { title: "Resources", href: routes.resources(), type: "Resource", description: "Guides, tutorials, case studies and updates from ToyoApps.", keywords: "learn guides tutorials" },
  { title: "Blog", href: routes.blog(), type: "Resource", description: "Ideas and news from the ToyoApps team.", keywords: "articles news posts" },
  { title: "Help & support", href: routes.support(), type: "Support", description: "Get help with ToyoApps and find each product's own support and documentation.", keywords: "help docs documentation" },
  { title: "Contact ToyoApps", href: routes.contact(), type: "Support", description: "Talk to the ToyoApps team about products, listings or anything else.", keywords: "contact email sales talk" },
  { title: "Company", href: routes.company(), type: "Page", description: "About ToyoApps: who we are and how the ecosystem works.", keywords: "about us team mission" },
  { title: "Careers", href: routes.careers(), type: "Page", description: "Work at ToyoApps and help build software for growing businesses.", keywords: "jobs hiring work" },
  { title: "Vendors", href: routes.vendors(), type: "Page", description: "Information for vendors and partners working with ToyoApps.", keywords: "partners suppliers" },
  { title: "Media", href: routes.media(), type: "Page", description: "News coverage and media enquiries for ToyoApps.", keywords: "press news" },
  { title: "Press kit", href: routes.pressKit(), type: "Page", description: "ToyoApps logos, brand assets and boilerplate for press use.", keywords: "brand logo assets" },
  { title: "Publish on ToyoApps", href: routes.publish(), type: "Page", description: "List your business software in the ToyoApps ecosystem.", keywords: "list submit product publish" },
];

/**
 * Everything a visitor might look for: products, their features, feature
 * groups, sub-pages and FAQs; categories; solutions, industries, integrations,
 * comparisons and resources; and the public site pages. Deduped by URL.
 */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];

  for (const c of getCategories()) {
    if (!getProductsByCategory(c.slug).length) continue; // no page without products
    out.push({ id: `cat:${c.slug}`, title: c.name, type: "Page", href: routes.category(c.slug), description: clip(c.tagline), category: c.name, categorySlug: c.slug, keywords: kw("category", c.description, c.subcategories?.map((s) => s.name)) });
  }

  for (const p of getProducts()) {
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
      keywords: kw(p.tagline, p.primaryUseCase, p.longDescription, p.seoKeywords, p.audience),
    });

    for (const s of sections) {
      if (s === "overview") continue;
      out.push({ ...facets, id: `p:${p.slug}:${s}`, title: `${p.name} ${sectionLabels[s]}`, type: s === "support" ? "Support" : "Page", href: routes.productSection(p.slug, s), description: `${sectionLabels[s]} for ${p.name}.`, keywords: kw(p.tagline) });
    }

    for (const g of getFeatureGroupsWithPages(p))
      out.push({
        ...facets,
        id: `p:${p.slug}:g:${g.group.slug}`,
        title: g.group.name,
        type: "Feature",
        href: routes.featureGroup(p.slug, g.group.slug),
        description: clip(g.group.description ?? `${g.features.length} ${p.name} features, including ${g.features.slice(0, 3).map((f) => f.name).join(", ")}.`),
        keywords: kw("feature group", g.features.map((f) => f.name)),
      });

    for (const f of getFeatures(p)) {
      const page = featureHasPage(f);
      const href = page ? routes.feature(p.slug, f.slug) : featuresHref;
      out.push({ ...facets, id: `p:${p.slug}:f:${f.slug}`, title: f.name, type: "Feature", href, description: clip(f.summary), keywords: kw(f.problem, f.capabilities?.slice(0, 6), f.seoKeywords) });
      if (page) out.push(...faqEntries(f.faqs, href, `p:${p.slug}:f:${f.slug}`, facets));
    }

    for (const s of itemSections)
      for (const i of getProductItems(p, s).filter((x) => x.hasPage))
        out.push({ ...facets, id: `p:${p.slug}:${s}:${i.slug}`, title: i.name, type: itemType[s] ?? "Page", href: routes.productItem(p.slug, s, i.slug), description: clip(i.summary), keywords: kw(sectionLabels[s as keyof typeof sectionLabels]) });

    out.push(...faqEntries(p.faqs, `${routes.product(p.slug)}#faq`, `p:${p.slug}`, facets));
  }

  for (const s of getSolutions()) {
    const href = routes.solution(s.slug);
    out.push({ id: `sol:${s.slug}`, title: s.name, type: "Solution", href, description: clip(s.summary), keywords: kw(s.problem, s.cardTitle), solutions: [s.slug] });
    out.push(...faqEntries(s.faqs, href, `sol:${s.slug}`, { solutions: [s.slug] }));
  }
  for (const i of getIndustries()) {
    const href = routes.industry(i.slug);
    out.push({ id: `ind:${i.slug}`, title: i.name, type: "Industry", href, description: clip(i.summary), keywords: kw(i.challenges), industries: [i.slug] });
    out.push(...faqEntries(i.faqs, href, `ind:${i.slug}`, { industries: [i.slug] }));
  }
  for (const i of getIntegrations())
    out.push({
      id: `int:${i.slug}`,
      title: i.name,
      type: "Integration",
      // Integrations without written content are listed in the directory only.
      href: integrationHasPage(i) ? routes.integration(i.slug) : routes.integrations(),
      description: clip(i.summary),
      keywords: kw(i.category, i.vendor),
      integrations: [i.slug],
    });
  for (const c of getComparisons()) out.push({ id: `cmp:${c.slug}`, title: c.name, type: "Page", href: routes.comparison(c.slug), description: clip(c.summary), keywords: kw("compare vs", c.subjects) });

  for (const t of resourceTypes)
    if (getResources(t.type).length) out.push({ id: `rt:${t.type}`, title: t.label, type: "Resource", href: routes.resourceType(t.type), description: t.description, keywords: "resources" });
  for (const r of getResources()) out.push({ id: `res:${r.type}:${r.slug}`, title: r.name, type: "Resource", href: routes.resource(r.type, r.slug), description: clip(r.summary), keywords: kw(r.type, r.author), industries: r.industries });

  for (const s of sitePages) out.push({ id: `site:${s.href}`, ...s });

  // Dedupe by URL. FAQs and features without their own page point at a shared
  // anchor/hub, so for those the title is part of the key.
  const seen = new Set<string>();
  return out.filter((e) => {
    const key = e.type === "FAQ" || (e.type === "Feature" && !e.href.includes("/features/")) ? `${e.href}|${e.title.toLowerCase()}` : e.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

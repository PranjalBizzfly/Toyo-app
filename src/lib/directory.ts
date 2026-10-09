import type { Industry, Integration, Product } from "@/content/types";
import { getIndustries, getIntegrations, getProducts, integrationHasPage, productsFor } from "./catalog";
import { getAvailableSections, getProductItems } from "./product-sections";
import { routes } from "./routes";

/* =====================================================================
   Industry and integration directories.

   Both hubs combine the cross-product registries (src/content/registries.ts)
   with the industries and integrations each product documents itself
   (productIndustries / productIntegrations). Nothing here adds data: the
   sector and category maps below only decide where an existing entry is
   filed. Every entry links to a page that exists — its own detail page,
   the product's item page, or the product's industries/integrations section.
   ===================================================================== */

/** Where a product link should go for a given section, falling back to the product page. */
export function productSectionHref(p: Product, section: "industries" | "integrations") {
  return getAvailableSections(p).includes(section) ? routes.productSection(p.slug, section) : routes.product(p.slug);
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/* ---------------------------- Industries ---------------------------- */

export interface Sector {
  slug: string;
  name: string;
  /** One line describing what the sector groups. */
  lead: string;
}

export const SECTORS: Sector[] = [
  { slug: "creative-media", name: "Creative, media & events", lead: "Agencies, studios, newsrooms and event teams working with large libraries of creative files." },
  { slug: "retail-commerce", name: "Retail & e-commerce", lead: "Brands selling online and in store." },
  { slug: "professional-services", name: "Professional & technology services", lead: "Firms that sell expertise: accounting, consulting, IT and recruitment." },
  { slug: "industry-operations", name: "Industry & operations", lead: "Manufacturing, construction and logistics teams with shift-based, on-site workforces." },
  { slug: "health-hospitality", name: "Healthcare & hospitality", lead: "Round-the-clock, service-led workplaces." },
  { slug: "education-nonprofit", name: "Education & nonprofits", lead: "Schools, education teams and mission-driven organisations." },
  { slug: "startups-growth", name: "Startups & growing businesses", lead: "Founders, small businesses and mid-sized companies scaling their teams." },
];

/** Filing rules: product-documented industry names → sector. */
const SECTOR_OF: Record<string, string> = {
  "creative advertising agencies": "creative-media",
  "film production": "creative-media",
  "post production": "creative-media",
  "photography teams": "creative-media",
  "newsrooms media companies": "creative-media",
  "event companies": "creative-media",
  "e commerce brands": "retail-commerce",
  "retail brands": "retail-commerce",
  retail: "retail-commerce",
  "it technology": "professional-services",
  "professional services": "professional-services",
  "staffing recruitment": "professional-services",
  "ca cs and tax practices in india": "professional-services",
  manufacturing: "industry-operations",
  construction: "industry-operations",
  "logistics warehousing": "industry-operations",
  healthcare: "health-hospitality",
  hospitality: "health-hospitality",
  "education teams": "education-nonprofit",
  education: "education-nonprofit",
  nonprofits: "education-nonprofit",
  startups: "startups-growth",
  "small business": "startups-growth",
  "small medium enterprises": "startups-growth",
};

/** Cross-product industry guides → the sector they belong to. */
const GUIDE_SECTOR: Record<string, string> = {
  "accounting-tax-practices": "professional-services",
  "media-creative-agencies": "creative-media",
  "startups-and-investors": "startups-growth",
};

export interface IndustryEntry {
  key: string;
  name: string;
  summary: string;
  product: Product;
  href: string;
  sector: string;
}

/** Industries each product documents for itself, filed by sector. */
export function getProductIndustryEntries(): IndustryEntry[] {
  return getProducts().flatMap((p) =>
    getProductItems(p, "industries").map((i) => ({
      key: `${p.slug}/${i.slug}`,
      name: i.name,
      summary: i.summary,
      product: p,
      href: i.hasPage ? routes.productItem(p.slug, "industries", i.slug) : productSectionHref(p, "industries"),
      sector: SECTOR_OF[norm(i.name)] ?? "other",
    })),
  );
}

export function sectorOfGuide(industry: Industry): Sector | undefined {
  return SECTORS.find((s) => s.slug === GUIDE_SECTOR[industry.slug]);
}

export function getIndustryDirectory() {
  const entries = getProductIndustryEntries();
  const guides = getIndustries();
  const sectors = [...SECTORS, { slug: "other", name: "Other industries", lead: "Industries documented by a single product." }]
    .map((s) => ({
      ...s,
      entries: entries.filter((e) => e.sector === s.slug),
      guides: guides.filter((g) => GUIDE_SECTOR[g.slug] === s.slug),
    }))
    .filter((s) => s.entries.length || s.guides.length);
  const products = [...new Map(entries.map((e) => [e.product.slug, e.product])).values()];
  return { guides, sectors, entries, products };
}

/* --------------------------- Integrations --------------------------- */

/** Filing rules for integrations that only a product documents (no registry entry). */
const CATEGORY_OF: Record<string, string> = {
  "microsoft teams": "Messaging",
  discord: "Messaging",
  hubspot: "Contacts & CRM",
  pipedrive: "Contacts & CRM",
  "leadconnector gohighlevel": "Contacts & CRM",
  intercom: "Customer support",
  freshdesk: "Customer support",
  activecampaign: "Marketing & email",
  mailchimp: "Marketing & email",
  mailerlite: "Marketing & email",
  convertkit: "Marketing & email",
  "instagram browser": "Marketing & email",
  stripe: "Commerce & payments",
  shopify: "Commerce & payments",
  woocommerce: "Commerce & payments",
  webflow: "Websites & CMS",
  wordpress: "Websites & CMS",
  notion: "Work management",
  airtable: "Work management",
  "monday com": "Work management",
  clickup: "Work management",
  "jira cloud": "Work management",
  linear: "Work management",
  trello: "Work management",
  todoist: "Work management",
  harvest: "Work management",
  "microsoft sharepoint": "Productivity suites",
  "microsoft excel 365": "Productivity suites",
  "google gemini": "AI models",
  openai: "AI models",
  github: "Developer & data",
  mysql: "Developer & data",
  "rest api": "Developer & data",
  webhooks: "Developer & data",
  "custom integrations": "Developer & data",
  "sso saml": "Security & admin",
  "white label": "Security & admin",
  "custom domain": "Security & admin",
  "biometric attendance devices essl matrix realtime zkteco": "Devices & hardware",
  "trackSolid pro gps tracking": "Devices & hardware",
  "tracksolid pro gps tracking": "Devices & hardware",
};

export interface IntegrationLink {
  product: Product;
  /** Where this product documents the integration. */
  href: string;
  /** Names the product uses for it, when they differ from the entry name (e.g. Gmail under Google Workspace). */
  aliases: string[];
}

export interface IntegrationEntry {
  key: string;
  name: string;
  vendor?: string;
  category: string;
  summary: string;
  /** Primary destination for the card. */
  href: string;
  /** Label for the primary link. */
  cta: string;
  /** True when the entry has its own /integrations/[slug] page. */
  hasPage: boolean;
  registry?: Integration;
  links: IntegrationLink[];
}

export function getIntegrationDirectory() {
  const registry = getIntegrations();
  const byKey = new Map<string, IntegrationEntry>();

  for (const r of registry) {
    const page = integrationHasPage(r);
    byKey.set(r.slug, {
      key: r.slug,
      name: r.name,
      vendor: r.vendor,
      category: r.category,
      summary: r.summary,
      href: page ? routes.integration(r.slug) : "",
      cta: "View integration",
      hasPage: page,
      registry: r,
      links: productsFor(r.products).map((p) => ({ product: p, href: productSectionHref(p, "integrations"), aliases: [] })),
    });
  }

  for (const p of getProducts()) {
    for (const i of getProductItems(p, "integrations")) {
      const e = i.entity as { registry?: string };
      const href = i.hasPage ? routes.productItem(p.slug, "integrations", i.slug) : productSectionHref(p, "integrations");
      const key = e.registry && byKey.has(e.registry) ? e.registry : `p:${norm(i.name)}`;
      let entry = byKey.get(key);
      if (!entry) {
        entry = { key, name: i.name, category: CATEGORY_OF[norm(i.name)] ?? "Other", summary: i.summary, href: "", cta: "", hasPage: false, links: [] };
        byKey.set(key, entry);
      }
      const link = entry.links.find((l) => l.product.slug === p.slug);
      const alias = norm(i.name) !== norm(entry.name) ? [i.name] : [];
      if (link) {
        link.aliases.push(...alias);
        // Prefer the product's own item page over its section page.
        if (i.hasPage && !link.href.includes(`/integrations/${i.slug}`) && link.href === productSectionHref(p, "integrations")) link.href = href;
      } else entry.links.push({ product: p, href, aliases: alias });
    }
  }

  const entries = [...byKey.values()].map((e) => {
    if (!e.hasPage) {
      const first = e.links[0];
      e.href = first?.href ?? routes.integrations();
      e.cta = first ? `See it in ${first.product.name}` : "View";
    }
    return e;
  });
  entries.sort((a, b) => a.name.localeCompare(b.name));

  const categories = [...new Set(entries.map((e) => e.category))]
    .sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b)))
    .map((name) => ({ name, slug: norm(name).replace(/ /g, "-"), count: entries.filter((e) => e.category === name).length }));
  const products = getProducts()
    .map((p) => ({ product: p, count: entries.filter((e) => e.links.some((l) => l.product.slug === p.slug)).length }))
    .filter((x) => x.count);
  return { entries, categories, products };
}

/** The directory entry for a registry integration (its products include those that document it themselves). */
export function getIntegrationEntry(slug: string): IntegrationEntry | undefined {
  return getIntegrationDirectory().entries.find((e) => e.key === slug);
}

/** Integrations available through any of the given products (for industry pages). */
export function integrationsForProducts(slugs: string[], limit = 8): IntegrationEntry[] {
  const { entries } = getIntegrationDirectory();
  const hits = entries.filter((e) => e.links.some((l) => slugs.includes(l.product.slug)));
  return [...hits.filter((e) => e.hasPage), ...hits.filter((e) => !e.hasPage)].slice(0, limit);
}

/** Other integrations in the same category, or sharing a product. */
export function relatedIntegrations(integration: Integration, limit = 6): IntegrationEntry[] {
  const { entries } = getIntegrationDirectory();
  const others = entries.filter((e) => e.key !== integration.slug);
  const sameCat = others.filter((e) => e.category === integration.category);
  const sameProduct = others.filter((e) => !sameCat.includes(e) && e.links.some((l) => integration.products.includes(l.product.slug)));
  const ranked = [...sameCat, ...sameProduct];
  return [...ranked.filter((e) => e.hasPage), ...ranked.filter((e) => !e.hasPage)].slice(0, limit);
}

export const initialOf = (s: string) => s.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase();

import type { ResourceType } from "@/content/types";

export type ContactTypeParam = "product" | "sales" | "support" | "vendor" | "publish" | "general" | "other";

/** Every internal URL is built here so the URL scheme can change in one place. */
export const routes = {
  home: () => "/",
  products: () => "/products",
  category: (slug: string) => `/products/category/${slug}`,
  product: (slug: string) => `/products/${slug}`,
  productSection: (slug: string, section: ProductSection) =>
    section === "overview" ? `/products/${slug}` : `/products/${slug}/${section}`,
  feature: (product: string, feature: string) => `/products/${product}/features/${feature}`,
  featureGroup: (product: string, group: string) => `/products/${product}/features/group/${group}`,
  productItem: (product: string, section: string, item: string) => `/products/${product}/${section}/${item}`,
  solutions: () => "/solutions",
  solution: (slug: string) => `/solutions/${slug}`,
  industries: () => "/industries",
  industry: (slug: string) => `/industries/${slug}`,
  integrations: () => "/integrations",
  integration: (slug: string) => `/integrations/${slug}`,
  compare: () => "/compare-products",
  comparison: (slug: string) => `/compare-products/${slug}`,
  resources: () => "/resources",
  // The blog hub lives at /blog; /resources/blog permanently redirects there (next.config.ts).
  resourceType: (type: ResourceType) => (type === "blog" ? "/blog" : `/resources/${type}`),
  resource: (type: ResourceType, slug: string) => `/resources/${type}/${slug}`,
  company: () => "/about-toyoapps",
  publish: () => "/publish-and-sell-your-saas",
  support: () => "/support",
  contact: () => "/contact-us",
  /** The one contact form, with optional preselection (read client-side by ContactForm). */
  contactForm: (opts: { type?: ContactTypeParam; product?: string | string[]; topic?: "vendor" | "careers" | "media"; role?: string } = {}) => {
    const q = new URLSearchParams();
    if (opts.type) q.set("type", opts.type);
    for (const p of ([] as string[]).concat(opts.product ?? [])) q.append("product", p);
    if (opts.topic) q.set("topic", opts.topic);
    if (opts.role) q.set("role", opts.role);
    const qs = q.toString();
    return `/contact-us${qs ? `?${qs}` : ""}`;
  },
  careers: () => "/careers",
  vendors: () => "/become-a-toyoapps-vendor",
  media: () => "/media-and-news",
  pressKit: () => "/press-kit",
  blog: () => "/blog",
  legal: (doc: "privacy" | "terms" | "cookies") => `/legal/${({ privacy: "privacy-policy", terms: "terms-of-service", cookies: "cookie-policy" } as const)[doc]}`,
};

/** Product sub-pages. Order defines the product secondary navigation. */
export const productSections = [
  "overview",
  "features",
  "solutions",
  "industries",
  "integrations",
  "pricing",
  "security",
  "compare",
  "resources",
  "support",
] as const;
export type ProductSection = (typeof productSections)[number];

export const sectionLabels: Record<ProductSection, string> = {
  overview: "Overview",
  features: "Features",
  solutions: "Solutions",
  industries: "Industries",
  integrations: "Integrations",
  pricing: "Pricing",
  security: "Security",
  compare: "Compare",
  resources: "Resources",
  support: "Support",
};

export const resourceTypes: { type: ResourceType; label: string; description: string }[] = [
  { type: "blog", label: "Blog", description: "Ideas and news from the ToyoApps team." },
  { type: "guides", label: "Guides", description: "In-depth guides to choosing and using business software." },
  { type: "tutorials", label: "Tutorials", description: "Step-by-step walkthroughs for ToyoApps products." },
  { type: "case-studies", label: "Case studies", description: "How businesses use ToyoApps products." },
  { type: "reports", label: "Reports", description: "Research and industry reports." },
  { type: "updates", label: "Product updates", description: "What's new across the ToyoApps ecosystem." },
];

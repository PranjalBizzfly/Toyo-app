import type { ResourceType } from "@/content/types";

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
  compare: () => "/compare",
  comparison: (slug: string) => `/compare/${slug}`,
  resources: () => "/resources",
  // The blog hub lives at /blog; /resources/blog permanently redirects there (next.config.ts).
  resourceType: (type: ResourceType) => (type === "blog" ? "/blog" : `/resources/${type}`),
  resource: (type: ResourceType, slug: string) => `/resources/${type}/${slug}`,
  company: () => "/company",
  publish: () => "/publish",
  support: () => "/support",
  contact: () => "/contact",
  careers: () => "/careers",
  vendors: () => "/vendors",
  media: () => "/media",
  pressKit: () => "/press-kit",
  blog: () => "/blog",
  legal: (doc: "privacy" | "terms" | "cookies") => `/legal/${doc}`,
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

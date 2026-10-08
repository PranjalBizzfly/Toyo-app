/**
 * ToyoApps content model.
 *
 * Every page, menu, card, sitemap entry and internal link is derived from these
 * types. Adding a product, feature, category, industry, integration, solution,
 * comparison or resource is a data change — never a routing or component change.
 *
 * Cross-references are by slug (string), so entities can be authored
 * independently and resolved in `src/lib/catalog.ts`.
 */

/**
 * Publication lifecycle.
 * - `placeholder`: scaffolding only. Never rendered in production, never indexed.
 * - `draft`: real content in progress. Hidden publicly, visible in preview.
 * - `coming-soon`: public teaser page, no sign-up/pricing.
 * - `live`: fully public.
 */
/**
 * - `pending`: public, badged "Pending verification", but never indexed or in the sitemap.
 */
export type ContentStatus = "placeholder" | "draft" | "pending" | "coming-soon" | "live";

export interface SeoFields {
  /** Unique <title>. Falls back to a generated title when omitted. */
  seoTitle?: string;
  /** Unique meta description. Falls back to the short description. */
  seoDescription?: string;
  seoKeywords?: string[];
  /** Override only when the canonical lives elsewhere. */
  canonicalUrl?: string;
  /** Social share image path or URL. */
  ogImage?: string;
}

export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Cta {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Taxonomy                                                            */
/* ------------------------------------------------------------------ */

export interface Category extends SeoFields {
  slug: string;
  name: string;
  /** One line used in menus and cards. */
  tagline: string;
  /** Intro paragraph for the category landing page. */
  description: string;
  /** Icon key from `components/ui/Icon`. */
  icon: IconName;
  /** Ordering in menus and grids (ascending). */
  order: number;
  status: ContentStatus;
  /** Business problems this category addresses (category page section). */
  problems?: { title: string; description: string }[];
  faqs?: Faq[];
  subcategories?: { slug: string; name: string }[];
}

/* ------------------------------------------------------------------ */
/* Products and features                                               */
/* ------------------------------------------------------------------ */

export interface FeatureCategory {
  slug: string;
  name: string;
  description?: string;
  /** Intro content for a group hub page. A hub page exists only when this is set (and ≥ 3 features). */
  body?: string[];
}

/**
 * A product capability. A product may have 0…n features; each feature gets
 * its own page only when `hasPage` is true and it has real body content.
 */
export interface Feature extends SeoFields {
  slug: string;
  name: string;
  summary: string;
  /** Slug of a FeatureCategory on the same product. */
  category?: string;
  /** "What it is" — long-form paragraphs from the official source. Required for a detail page. */
  body?: string[];
  /** The problem the feature addresses, as stated or directly described by the source. */
  problem?: string;
  /** Steps of how the feature works, in order. */
  howItWorks?: string[];
  /** Concrete capabilities of the feature. */
  capabilities?: string[];
  benefits?: string[];
  /** Who uses the feature (roles/teams named by the source). */
  audience?: string[];
  /** Situations the source describes the feature being used in. */
  useCases?: { title: string; description: string }[];
  /** Integration slugs (global registry) the source ties to this feature. */
  integrations?: string[];
  /** Feature slugs on the same product that the source connects to this one. */
  relatedFeatures?: string[];
  /** Official page(s) this feature's detail was taken from. */
  sources?: string[];
  media?: MediaAsset[];
  faqs?: Faq[];
  /** Highlight on the product overview. */
  highlight?: boolean;
  hasPage?: boolean;
  status?: ContentStatus;
}

export interface PricingPlan {
  name: string;
  /** Display string as supplied by the business, e.g. "$12" or "Custom". */
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: Cta;
  recommended?: boolean;
}

export interface Pricing {
  /** Short note, e.g. billing currency or tax statement. */
  note?: string;
  plans: PricingPlan[];
  /** ISO currency shown in plan prices, e.g. "INR", "USD". */
  currency?: string;
  /** What a price is charged per, e.g. "seat", "report", "practice". */
  unit?: string;
  /** Free-trial statement as published by the product, e.g. "14-day free trial, no card required". */
  trial?: string;
  /** Date the prices were last checked against the product's own pricing page (YYYY-MM-DD). */
  asOf: string;
  /** Where prices were taken from. */
  sourceUrl: string;
}

export type Platform = "web" | "android" | "ios" | "windows" | "mac" | "chrome";

/** A stated relationship between two ToyoApps products. */
export interface ProductConnection {
  product: string;
  description: string;
}

export interface Product extends SeoFields {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  /** Primary category slug (drives breadcrumbs and the default listing). */
  category: string;
  /** Up to two further categories the product is also listed in. */
  secondaryCategories?: string[];
  subcategory?: string;
  /** The product's own promise, quoted from its official site. */
  tagline?: string;
  /** Official product website — the primary outbound destination. */
  websiteUrl: string;
  platforms?: Platform[];
  /** Primary market, e.g. "India", "UAE", "Global". */
  market?: string;
  /** Internal: who builds/operates the product, as stated on its site. Not rendered. */
  publisher?: { name: string; firstParty?: boolean };
  /**
   * Internal: open business questions about this product. Not rendered.
   * "pending" = not yet confirmed by the business; never treat as an exclusion.
   */
  verification?: {
    relationship: "confirmed" | "pending";
    publicSale: "confirmed" | "pending";
    notes?: string;
  };
  /** Stated relationships with other ToyoApps products. */
  connections?: ProductConnection[];
  /** Public pages this record was written from (see docs/TOYOAPPS_PRODUCT_SOURCE_MAP.md). */
  sources: string[];
  /** Date the record was last checked against its sources (YYYY-MM-DD). */
  lastVerified: string;
  /** The main job the product does, shown on cards ("Main use case"). */
  primaryUseCase?: string;
  /** Who the product is for. */
  audience?: string[];
  status: ContentStatus;
  featured?: boolean;
  /** Brand accent for the product (hex). Falls back to the category tint. */
  accent?: string;
  logo?: MediaAsset;
  heroImage?: MediaAsset;
  screenshots?: MediaAsset[];
  benefits?: { title: string; description: string }[];
  howItWorks?: { title: string; description: string }[];
  /** Security and privacy measures stated by the product's official site. */
  security?: { title: string; description: string }[];
  /** Product-scoped detail pages — each generated only with enough real content. */
  productSolutions?: ProductSolution[];
  productIndustries?: ProductIndustry[];
  productIntegrations?: ProductIntegration[];
  productComparisons?: ProductComparison[];
  productResources?: ProductResource[];
  supportTopics?: ProductSupportTopic[];
  featureCategories?: FeatureCategory[];
  features?: Feature[];
  /** Concrete situations the product is used in, as described by its site. */
  useCases?: { title: string; description: string }[];
  /** Slugs into the global registries. */
  industries?: string[];
  solutions?: string[];
  integrations?: string[];
  relatedProducts?: string[];
  resources?: string[];
  comparisons?: string[];
  pricing?: Pricing;
  faqs?: Faq[];
  /** Sign-up / trial link on the product's own site. */
  appUrl?: string;
  supportUrl?: string;
  docsUrl?: string;
  /** Override CTAs on the product page. */
  primaryCta?: Cta;
}

/* ------------------------------------------------------------------ */
/* Product-scoped detail entities                                      */
/* ------------------------------------------------------------------ */

/**
 * Fields shared by every product-scoped detail page (solution, industry,
 * integration, comparison, resource, support topic). All content must come
 * from the product's official source; `sources` lists those pages.
 * A detail page exists only when it carries enough real material — see
 * `entityHasPage` in src/lib/rules.ts.
 */
interface ProductDetailBase {
  slug: string;
  name: string;
  /** One-line summary for cards and meta description. */
  summary: string;
  /** "What it is" paragraphs. */
  body?: string[];
  /** Feature slugs on the same product this page relates to. */
  features?: string[];
  faqs?: Faq[];
  /** Official source URLs the content was written from. */
  sources: string[];
}

/** A business problem the product solves (/products/[p]/solutions/[slug]). */
export interface ProductSolution extends ProductDetailBase {
  problem?: string;
  /** How the product solves it. */
  approach?: string[];
  workflow?: string[];
  benefits?: string[];
  audience?: string[];
}

/** An industry the product explicitly serves (/products/[p]/industries/[slug]). */
export interface ProductIndustry extends ProductDetailBase {
  challenges?: string[];
  /** How the product addresses those challenges. */
  howItHelps?: string[];
  useCases?: { title: string; description: string }[];
}

/** A documented integration (/products/[p]/integrations/[slug]). */
export interface ProductIntegration extends ProductDetailBase {
  /** What the integration connects, in one sentence. */
  connects?: string;
  workflow?: string[];
  benefits?: string[];
  setup?: string[];
  /** Matching entry in the global integrations registry, if any. */
  registry?: string;
}

/** A comparison published by the product itself (/products/[p]/compare/[slug]). */
export interface ProductComparison extends ProductDetailBase {
  competitor: string;
  /** Points of difference stated by the source. */
  differences?: string[];
  rows?: { criterion: string; product: string; competitor: string }[];
}

/** A real resource published by the product (/products/[p]/resources/[slug]). */
export interface ProductResource extends ProductDetailBase {
  type: "guide" | "tutorial" | "checklist" | "documentation" | "article" | "glossary" | "video" | "case-study";
  keyPoints?: string[];
  steps?: string[];
}

/** A support / documentation topic (/products/[p]/support/[slug]). */
export interface ProductSupportTopic extends ProductDetailBase {
  steps?: string[];
  keyPoints?: string[];
  links?: Cta[];
}

/* ------------------------------------------------------------------ */
/* Cross-product registries                                            */
/* ------------------------------------------------------------------ */

interface LinkedEntity extends SeoFields {
  slug: string;
  name: string;
  summary: string;
  status: ContentStatus;
  body?: string[];
  faqs?: Faq[];
}

/** Business problem → recommended approach → ToyoApps products. */
export interface Solution extends LinkedEntity {
  problem: string;
  approach: string;
  products: string[];
}

export interface Industry extends LinkedEntity {
  icon?: IconName;
  challenges?: string[];
  products: string[];
}

export interface Integration extends LinkedEntity {
  /** Directory grouping, e.g. "Storage", "Messaging". */
  category: string;
  /** Third-party vendor name, if external. */
  vendor?: string;
  logo?: MediaAsset;
  /** ToyoApps products this integration actually works with. */
  products: string[];
  docsUrl?: string;
}

export interface Comparison extends LinkedEntity {
  /** Products (ToyoApps or named alternatives) being compared. */
  subjects: string[];
  rows: { criterion: string; values: string[] }[];
}

export type ResourceType = "blog" | "guides" | "tutorials" | "case-studies" | "reports" | "updates";

export interface Resource extends LinkedEntity {
  type: ResourceType;
  publishedAt: string;
  author?: string;
  products?: string[];
  industries?: string[];
  cover?: MediaAsset;
}

export type IconName =
  | "grid"
  | "chart"
  | "megaphone"
  | "wallet"
  | "users"
  | "briefcase"
  | "headset"
  | "chat"
  | "layers"
  | "shield"
  | "code"
  | "box"
  | "spark"
  | "search"
  | "arrow-right"
  | "check"
  | "rocket"
  | "store"
  | "building";

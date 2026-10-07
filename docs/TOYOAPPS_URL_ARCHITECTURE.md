# ToyoApps URL Architecture

**Reference:** Zoho study §23 (SEO), §31 (routes), and §34 (what not to copy: `.html` suffixes, mixed conventions, tracking parameters, duplicate pricing slugs).
**Applies to:** the Next.js App Router codebase in `src/app`.

---

## 1. Rules

1. **Lowercase, hyphenated, no file extensions, no trailing slash.** For example `/products/sigchanger/pricing`.
2. **The product slug is the product's brand name**, e.g. `cardizo` or `trackysuite`, and it never changes. A rename gets a new slug plus a 301 redirect.
3. **Categories are not part of product URLs** (`/products/[product]`, not `/products/[category]/[product]`). Products sit in more than one category, and categories will be split later. URLs must survive both (Zoho study §31.1).
4. **Features are not nested under their feature group in the URL.** The feature group appears in the breadcrumb only, so a feature can move between groups without its URL changing (Zoho study §6.3).
5. **No query parameters on internal links** (unlike Zoho's `?source_from=`). Search filters (`?q=`, `?category=`) are allowed only on `/products`, and its canonical has no parameters.
6. **One URL per intent.** One pricing URL per product, one comparison convention, and no `/alternatives/` duplicate of `/compare/`.
7. **A route exists only when its data exists.** All dynamic routes use `generateStaticParams` and `dynamicParams = false`. A section with no data returns 404 and is never linked.
8. **Reserved slugs.** No product may be named `category`, and no feature may be named `group`. These words are path segments.

---

## 2. Route map

### 2.1 Global

| URL | Page | Generated from | Indexed when |
|---|---|---|---|
| `/` | Homepage | categories, products | Always |
| `/products` | All products: search + category filters | products | Always |
| `/products/category/[category]` | Category landing page | `categories.ts` + all products listing the category | ≥ 2 public products in the category |
| `/solutions`, `/solutions/[solution]` | Cross-product solutions | `registries.ts` | Hub when ≥ 1 entry; detail always (content-gated) |
| `/industries`, `/industries/[industry]` | Cross-product industries | `registries.ts` | Same |
| `/integrations` | Integration directory | `registries.ts` | ≥ 1 integration |
| `/integrations/[integration]` | Integration detail | `registries.ts` | **Only when the integration has `body` content** |
| `/compare`, `/compare/[comparison]` | Comparisons | `registries.ts` | Hub when ≥ 1; detail content-gated |
| `/resources`, `/resources/[type]`, `/resources/[type]/[slug]` | Resources | `registries.ts` | Type hub when ≥ 1 item |
| `/publish` | For software makers (marketplace) | static | Always |
| `/company`, `/contact`, `/support` | Company pages | static | Always |
| `/legal/[doc]` | Privacy, terms, cookies | static | When the legal text exists |
| `/sitemap.xml`, `/robots.txt` | Generated | all data | — |

### 2.2 Product

| URL | Page | Exists when |
|---|---|---|
| `/products/[product]` | Overview (`ProductPageTemplate`) | Product is visible |
| `/products/[product]/features` | Features hub, grouped by feature group | ≥ 1 feature |
| `/products/[product]/features/group/[group]` | Feature-group hub | The group has `body` intro content **and** ≥ 3 features |
| `/products/[product]/features/[feature]` | Feature detail | Feature has `hasPage: true` **and** `body` |
| `/products/[product]/pricing` | Pricing | `pricing.plans` non-empty |
| `/products/[product]/integrations` | Product's integrations | ≥ 1 linked integration |
| `/products/[product]/solutions` | Product's solutions | ≥ 1 linked solution |
| `/products/[product]/industries` | Product's industries | ≥ 1 linked industry |
| `/products/[product]/compare` | Product's comparisons | ≥ 1 comparison |
| `/products/[product]/resources` | Product's resources | ≥ 1 resource |
| `/products/[product]/support` | Support router (FAQ + links to the official site, docs, support) | FAQ, docsUrl or supportUrl present |

**Intentionally absent:**
- `/products/[product]/signup` and `/login`. Sign-up happens on the product's own site (`websiteUrl` / `appUrl`). The CTA links out.
- `/products/[product]/docs`. Documentation lives on the product's own docs or help system (Zoho study §22).

### 2.3 Future, reserved (do not create until data exists)

| URL | Purpose | Trigger |
|---|---|---|
| `/products/[product]/compare/[competitor]` | Product vs named competitor | A verified, dated comparison exists |
| `/products/[product]/integrations/[integration]` | Product-specific integration setup | Product-specific body content |
| `/integrations/category/[category]` | Integration category | ≥ 3 integrations in the category |
| `/bundles/[bundle]` | Product bundles | Real joint pricing |
| `/apps/[platform]` | Platform catalogs (Android, Windows) | ≥ 3 products on the platform |

---

## 3. Current URL inventory (from real data)

### 3.1 Category URLs

| URL | Indexed |
|---|---|
| `/products/category/sales-marketing` | Yes |
| `/products/category/hr-people` | Yes |
| `/products/category/operations-it` | Yes |
| `/products/category/insights-research` | Yes (counts secondary listings) |
| `/products/category/finance-compliance` | No (1 product; noindex, not in menu) |

### 3.2 Product URLs (11 public products; verified against the production build sitemap)

| Product | Overview | Features hub | Pricing | Integrations | Support |
|---|---|---|---|---|---|
| cardizo | ✓ | — (6 features, 1 group: the overview covers them) | ✓ | ✓ | — |
| getbenj | ✓ | ✓ | ✓ | — | — |
| sibu | ✓ | ✓ | ✓ | ✓ | ✓ |
| hrmagix | ✓ | ✓ | — (not stated) | — | — |
| zuzu | ✓ | ✓ | — (not stated) | — | — |
| zorfly | ✓ | ✓ | ✓ | — | — |
| zapbuzzer | ✓ | ✓ | ✓ | ✓ | — |
| sigchanger | ✓ | ✓ | ✓ | ✓ | ✓ |
| fantom | ✓ | ✓ | — (excluded) | ✓ | — |
| trackysuite | ✓ | ✓ | ✓ | — | ✓ |
| sizoru | ✓ | ✓ | ✓ | — | ✓ |

**Rules behind the table:**
- The features hub exists when a product has more than 6 features or more than one feature group.
- The support page exists when a product has a support URL, docs URL or FAQ.

**Indexed URLs in the production sitemap: 49.** That is 6 global pages, 4 categories, 38 product pages and the integration directory.

There are no feature-detail, feature-group, industry, solution or comparison URLs. None has real body content yet. That is correct, not a gap to fill with filler.

### 3.3 Drafts (preview only, noindex, not in sitemap)
`/products/fleetras`, `/products/meetingmind` and their sub-pages.

---

## 4. Canonical, metadata and sitemap

- **Canonical:** `https://toyoapps.com{path}` with no query string.
  - A product page on ToyoApps is a **different document** from the product's own site, so it is canonical to itself, not to zapbuzzer.com etc.
  - Content must be ToyoApps' own summary, not a copy of the product site (see the source map §3).
- **Titles:** `{Product} — {primary use case} | ToyoApps`; `{Product} pricing | ToyoApps`; `{Category} software | ToyoApps`. Titles are generated from data, so they are unique by construction.
- **Robots:** pages that are noindexed (drafts, empty hubs, 1-product categories) are also left out of the sitemap.
- **Sitemap:** `src/app/sitemap.ts` from the same catalog functions. Split it per product with `generateSitemaps` after about 5,000 URLs.
- **Structured data:**
  - `Organization` + `WebSite`/`SearchAction` (home)
  - `ItemList` (hubs)
  - `BreadcrumbList` (all inner pages)
  - `SoftwareApplication` + `Offer` (product/pricing, only with real prices)
  - `FAQPage` (only with real FAQs)

---

## 5. Outbound links to product sites

Every product page links to the product's **official website** with `rel="noopener"`. This is the primary CTA when the product has no ToyoApps checkout. The link is a normal followed link, since the sites are related.
- Sign-up CTAs go to the product's own sign-up URL as recorded in the source map.
- The ToyoApps site never hosts a product's login.

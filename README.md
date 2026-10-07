# ToyoApps website

The main toyoapps.com site: one home for a growing portfolio of SaaS products. Built with Next.js (App Router) and TypeScript.

**Principle: architecture first, pages second.** All pages, menus, cards, internal links and sitemap entries come from typed content in `src/content`. Adding product #21, a 50th feature or a new category is a data change. You never touch the routing or the components.

```bash
npm install
npm run dev        # preview mode: placeholder products visible (badged, noindexed)
npm run build      # production: placeholders excluded
node scripts/smoke.mjs http://localhost:3000   # route/SEO smoke test against a running server
```

## Structure

```
src/
  content/            ← the only place content lives
    types.ts          content model (Product, Feature, Category, Solution, Industry, …)
    categories.ts     5 categories derived from the product audit
    products/         one file per real product (+ drafts.ts for unconfirmed ones)
    registries.ts     solutions, industries, integrations, comparisons, resources (empty)
    site.ts           site-wide facts, taken from the current toyoapps.com
  lib/
    catalog.ts        read API + visibility rules (preview vs production)
    routes.ts         every URL is built here
    navigation.ts     header/mega menu/footer model, generated from content
    product-sections.ts  which product sub-pages exist (only those with content)
    seo.ts            buildMetadata(): title, description, canonical, OG, noindex
  components/
    ui/               design system: buttons, sections, breadcrumbs, FAQ, tabs, slots…
    layout/           global header + mega menu + mobile nav, global footer
    product/          product/category/feature/pricing cards, explorer, product nav + footer
    templates/        ProductPage, FeaturePage, Hub, Solution, Industry, Integration, Comparison, Resource
  app/                routes (thin: load data → render template)
```

## Routes

| Route | Generated from |
|---|---|
| `/products` | all products, with search and category filters (`?q=`, `?category=`) |
| `/products/category/[category]` | `categories.ts` |
| `/products/[product]` | product overview (`ProductPageTemplate`) |
| `/products/[product]/features` | the product's features, grouped by `featureCategories` |
| `/products/[product]/features/[feature]` | only features with `hasPage: true` **and** a `body` |
| `/products/[product]/{solutions,industries,integrations,pricing,compare,resources,support}` | only when the product has data for that section |
| `/solutions`, `/industries`, `/integrations`, `/compare` (+ `/[slug]`) | `registries.ts` |
| `/resources`, `/resources/[type]`, `/resources/[type]/[slug]` | `registries.ts` |
| `/company`, `/publish`, `/support`, `/contact`, `/legal/[doc]` | static |

Every product page has a product-specific secondary nav. It lists only the sections that exist. There is also a product footer above the global footer.

## Content status

| status | production | preview (`next dev` or `TOYO_SHOW_PLACEHOLDERS=1`) | indexed |
|---|---|---|---|
| `placeholder` | hidden | shown, badged | never |
| `draft` | hidden | shown, badged | never |
| `coming-soon` | shown | shown | yes |
| `live` | shown | shown | yes |

Pages that would be empty, such as a hub with no entries or legal pages without text, are noindexed and left out of the sitemap.

## Adding content

**A product.** Create `src/content/products/<slug>.ts` that exports a `Product`, then add it to `realProducts` in `products/index.ts`. Delete one placeholder slot. Only `id, slug, name, shortDescription, category, status` are required. Every other section appears when you fill in its data.

**Features.** Append to `product.features`. Any count works. Give a feature a detail page by setting `hasPage: true` and writing a real `body`.

**A category.** Add an entry to `categories.ts`. The mega menu, category explorer, hero ecosystem visual, footer and sitemap all update.

**Solutions, industries, integrations, comparisons, resources.** Add entries to `registries.ts`, then reference their slugs from products, e.g. `product.integrations = ["slack"]`.

## Before launch

- [x] Product audit and taxonomy: see `docs/TOYOAPPS_*.md`.
- [ ] Confirm ownership questions in `docs/TOYOAPPS_FINAL_SOFTWARE_ARCHITECTURE.md` §7.
- [ ] Fill in `site.ts`: social URLs and the contact email. Connect a contact form backend.
- [ ] Supply legal text (privacy, terms, cookies).
- [ ] Add customer proof, metrics and certifications only once they're verified. The slots for them show only in preview.

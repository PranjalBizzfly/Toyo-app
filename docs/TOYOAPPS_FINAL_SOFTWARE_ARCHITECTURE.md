# ToyoApps Final Software Architecture

**Chain of reasoning:** Zoho study (structure) → product inventory (reality) → this architecture (decision).
**Inputs:**
- [ZOHO_COMPLETE_WEBSITE_STUDY_FOR_TOYOAPPS.md](ZOHO_COMPLETE_WEBSITE_STUDY_FOR_TOYOAPPS.md)
- [TOYOAPPS_SOFTWARE_PRODUCT_INVENTORY.md](TOYOAPPS_SOFTWARE_PRODUCT_INVENTORY.md)
- [TOYOAPPS_PRODUCT_TAXONOMY.md](TOYOAPPS_PRODUCT_TAXONOMY.md)
- [TOYOAPPS_URL_ARCHITECTURE.md](TOYOAPPS_URL_ARCHITECTURE.md)
- [TOYOAPPS_PRODUCT_SOURCE_MAP.md](TOYOAPPS_PRODUCT_SOURCE_MAP.md)

---

## 1. Zoho study → actual ToyoApps products → decision

| Topic | Zoho study finding | ToyoApps reality (inventory) | Final ToyoApps architecture |
|---|---|---|---|
| Product count | 55–60 products, each a deep site | 15 supplied: 11 publishable, 4 pending verification (held as drafts). Each product site has 1–7 public pages | Data-driven registry. Adding product #12 or #50 is one data file |
| Categories | 15 business-function categories; no category pages | 13 products fall naturally into **5 functions** | 5 categories with **real landing pages**, primary + secondary listings, indexed only with ≥ 2 products |
| Product depth | CRM: 3,582 URLs | Most products: one page with anchors | ToyoApps pages = overview + features hub + pricing + integrations + support. **Depth grows only as real content is written** |
| Feature architecture | Hub → category hub → detail; only major features get pages | 3 to about 50 named features per product; **no per-feature content anywhere** | Features hub grouped by the product's own groups. Group hubs and detail pages are content-gated and **0 exist today** |
| Variable feature count | Same template from 18 to 80+ features | Fantom 6 · Cardizo 6 · ZapBuzzer 8 · GetBenj 9 · TrackySuite 10 · SigChanger 16 · Sibu about 39 | One template. Thresholds (§4) decide what renders |
| Product navigation | Global header + product header slot | — | Global header + sticky product sub-nav listing only existing sections ✅ |
| Footer | Product footer + global footer | Product sites have 0–3 column footers | Product footer (Explore · Get started · More in category) + global footer ✅ |
| Industries | Product-owned verticals | Real industry focus: accounting practices, fleet, media/agencies, D2C, startups/VCs | Global `/industries/[industry]` **only with written content**; none published yet |
| Solutions | Department pages on suites | Real cross-product overlaps: office ops (3 products), people lifecycle (3), launch & fundraising (2) | Candidates documented (taxonomy §5); published only when written |
| Integrations | Marketplace on a separate host | Named integrations: Google Workspace, WhatsApp, Telegram, Google Contacts, Google Drive, Dropbox, OneDrive, AWS S3, Slack, Figma, Zapier, Frame.io, Premiere Pro, After Effects | **Integration directory** listing real integrations with the products that use them. Detail pages only with written content |
| Cross-product connections | Zoho Flow, suites | One stated: ZUZU → HRMagix attendance sync (availability unclear) | `connections` on Product, shown as "Works with HRMagix (listed by ZUZU)" |
| Pricing | Free tier + trial + yearly discount + "Most popular" | 7 different pricing units across 4 currencies; 3 products publish no price | Pricing model with `currency`, `unit`, `asOf`, `trial`, `note`; pricing route only when plans exist |
| Comparisons | Product-owned "vs" pages | None verified (Sizoru's own comparison table is its claim) | `/compare` reserved; nothing published |
| Resources | Global blog + product webinars/docs | No product has a blog | Resource hubs exist with empty states, noindexed until content exists |
| Support/docs | Separate help system | Products have no docs sites (TaskMagic, a third party, is the exception) | Product support page = router to the product's official site and support email |
| Marketplace | Add-on marketplace | toyoapps.com is positioned as a SaaS marketplace (publish/sell/buy) | `/publish` for makers. `publisher` field on Product for future third-party listings |

---

## 2. Final information architecture

```
ToyoApps (toyoapps.com)
├── Home: portal: ecosystem, search, 5 categories, featured products, publish CTA
├── Products (/products): search + filters across all public products
│   ├── Sales & Marketing ........ Cardizo · GetBenj · Sibu (+ Sizoru)
│   ├── HR & People .............. HRMagix · ZUZU · Zorfly
│   ├── Operations & IT .......... ZapBuzzer · SigChanger · Fantom (+ TrackySuite) [+ Fleetras draft]
│   ├── Finance & Compliance ..... TrackySuite (noindex until 2nd product)
│   └── Insights & Research ...... Sizoru (+ GetBenj, ZUZU) [+ MeetingMind draft]
├── Product (/products/[product])
│   ├── Overview: what it is, who it's for, feature groups, how it works, platforms, integrations, pricing summary, related
│   ├── Features: grouped by the product's own feature groups
│   │   ├── Feature group hub ...... (content-gated, 0 today)
│   │   └── Feature detail ......... (content-gated, 0 today)
│   ├── Pricing .................... (8 products)
│   ├── Integrations ............... (5 products)
│   ├── Solutions · Industries · Compare · Resources .... (content-gated, 0 today)
│   └── Support: links to official site, sign-up, support contact
├── Solutions · Industries · Integrations · Compare · Resources: cross-product indexes
├── Publish: for software makers
└── Company · Contact · Support · Legal
```

---

## 3. Data model (implemented)

Changes to `src/content/types.ts` from this research:

| Field | On | Why (evidence) |
|---|---|---|
| `secondaryCategories: string[]` | Product | Sizoru, GetBenj, ZUZU and TrackySuite serve two functions |
| `tagline` | Product | Each product's own promise, kept separate from ToyoApps' summary |
| `websiteUrl` | Product | Every product has its own official site; it is the primary outbound CTA |
| `platforms` | Product | Web / Android / Windows vary (ZapBuzzer, Fantom, ZUZU) |
| `market` | Product | India / UAE / Global changes currency and audience |
| `publisher` | Product | Two ownership groups (Stolvix, Bizzfly) plus marketplace future. **Internal; not rendered** |
| `connections` | Product | ZUZU → HRMagix |
| `sources`, `lastVerified` | Product | Provenance for re-verification |
| `Pricing.currency`, `unit`, `asOf`, `trial`, `billingNote` | Pricing | 4 currencies, 7 pricing units, uncertain trials |
| `FeatureCategory.body` | FeatureCategory | Group hubs exist only with written intros |
| `Integration.category`, `hasPage` | Integration | A directory without thin detail pages |

---

## 4. Variable feature depth: rules applied to real products

| Features | Example | What renders |
|---|---|---|
| 1–6 | Fantom (6), Cardizo (6) | All features shown on the overview; features hub still exists for consistency and search |
| 7–20 | ZapBuzzer (8), GetBenj (9), TrackySuite (10), HRMagix (18), SigChanger (16) | Overview shows highlighted features (≤ 6) and group chips; hub shows all, grouped |
| 20–100+ | Sibu (about 39) | As above, plus a jump-nav of groups on the hub |
| Any | Feature with `body` | Gets a detail page. **No product has one today** |
| Any | Group with `body` and ≥ 3 features | Gets a group hub. **None today** |

**Answer:** one template serves Fantom's 6 features and Sibu's 39 today, and would serve 100+ unchanged.

---

## 5. Page count: today and the honest path to 1,000+

### Today (real data only; counted from the production sitemap)

| Layer | Indexable pages |
|---|---|
| Home, products hub, publish, company, contact, support | 6 |
| Category pages (Finance & Compliance is noindexed: 1 product) | 4 |
| Product overviews | 11 |
| Features hubs | 10 |
| Pricing | 8 |
| Product integrations | 5 |
| Product support | 4 |
| Integration directory | 1 |
| **Total (first build)** | **49** |
| + 3 solution pages, 3 industry pages, 2 hubs, product solution/industry sub-pages (from real cross-product overlaps); support pages now only where a support/docs link exists | +20 |
| **Total (current build)** | **69** |

### How it grows (each step needs real content)

| Step | New pages | Running total |
|---|---|---|
| Add the remaining ~5–9 products of the "~20" (same depth) | about 35 | about 85 |
| Write feature detail pages for searchable features (say 8 per product × 20) | 160 | about 260 |
| Write feature-group hubs (say 3 per product) | 60 | about 320 |
| Integration detail pages with setup guides (about 25 real integrations) | 25 | about 345 |
| 3–5 cross-product solutions + 5 industries | 10 | about 355 |
| Product comparisons (2 verified per product) | 40 | about 395 |
| Product-specific guides and tutorials (10 per product) | 200 | about 595 |
| Global blog/guides programme (2 per week for 1 year) | 100 | about 695 |
| Case studies with verified results (2 per product) | 40 | about 735 |
| Portfolio growth to 40 products at the same depth | +300 | **about 1,035+** |

**1,000+ is reachable only through writing and product growth.** The architecture already supports every page type above. None of it is generated.

---

## 6. What was built vs deferred

**Built (this iteration):**
- Real categories and 13 real product records (11 public, 2 draft).
- Placeholder products removed.
- Data-model additions (§3).
- Secondary-category listings and the category indexing rule.
- Product overview showing the tagline, platforms, integrations and official-site CTA.
- Features hub grouped by real groups.
- Pricing with currency, as-of date and notes.
- Integration directory from real integrations.
- Product connections.
- Content-gated feature-group route.

**Deferred until content or business confirmation:**
- Feature detail pages, group hubs, solutions, industries, comparisons, resources and integration detail pages.
- Bundles.
- Tracksuit, TaskMagic, Fleetras and MeetingMind.
- Publisher badges.

## 7. Open questions for the business

1. **Ownership.** The sites show Stolvix (TrackySuite, Sizoru), Bizzfly (ZUZU, likely HRMagix and Cardizo), GetBenj Inc., and no owner for the rest. How does ToyoApps relate to each? This decides whether they are first-party products or marketplace listings.
2. **Tracksuit** (blocked) and **TaskMagic** (TaskMagic, Inc.): are these really ToyoApps products?
3. Are **Fleetras** and **MeetingMind** sold publicly?
4. Which are the remaining products of the "~20"?
5. Do the product teams have legal pages, real pricing for HRMagix/ZUZU/Fantom, and permission to use any customer proof?

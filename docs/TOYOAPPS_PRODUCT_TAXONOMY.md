# ToyoApps Product Taxonomy

**Derived from:** [TOYOAPPS_SOFTWARE_PRODUCT_INVENTORY.md](TOYOAPPS_SOFTWARE_PRODUCT_INVENTORY.md). Categories were derived from the real products, not chosen in advance.
**Reference:** Zoho study §3 (categories by business function; multiple categories per product; Zoho lacks category pages, but ToyoApps needs them).

---

## 1. Principles

1. **Group by the buyer's business function** (who buys it and which job it does), not by technology. AI, for example, is a theme and not a category.
2. **One primary category per product** drives the breadcrumb and the default listing. **Up to two secondary categories** add the product to other listings.
3. **No category has an "Other" bucket.** Every product has a natural home.
4. **A category needs at least 1 public product to render, and at least 2 to be indexed.** With fewer than 2 it stays out of the mega menu and is noindexed. This prevents thin single-item category pages. (Implemented as a rule in `lib/catalog.ts`.)
5. **Categories are data.** Renaming, merging or adding one changes the menus, cards, sitemap and breadcrumbs without code changes.

---

## 2. Categories (final for the current inventory)

| Order | Slug | Name | Buyer / job | Primary products | Secondary listings |
|---|---|---|---|---|---|
| 1 | `sales-marketing` | **Sales & Marketing** | Teams that find customers, plan campaigns and manage relationships and creative assets | Cardizo, GetBenj, Sibu | Sizoru |
| 2 | `hr-people` | **HR & People** | HR, people managers and L&D owners running the employee lifecycle | HRMagix, ZUZU, Zorfly | MeetingMind (recruitment module) |
| 3 | `operations-it` | **Operations & IT** | Office admins, facilities, IT admins and operations managers keeping the business running | ZapBuzzer, SigChanger, Fantom, *Fleetras (draft)* | TrackySuite |
| 4 | `finance-compliance` | **Finance & Compliance** | Accounting practices and finance teams with statutory obligations | TrackySuite | — |
| 5 | `insights-research` | **Insights & Research** | Founders, investors and teams turning information into decisions | Sizoru, *MeetingMind (draft)* | GetBenj, ZUZU |

**Public product counts today (primary listings):**

| Category | Public products | Status |
|---|---|---|
| Sales & Marketing | 3 | Indexed |
| HR & People | 3 | Indexed |
| Operations & IT | 3 | Indexed |
| Finance & Compliance | 1 | **Noindexed and left out of the menu** until a second finance product exists |
| Insights & Research | 1 primary (Sizoru) + 2 secondary (GetBenj, ZUZU) | Indexed |

Insights & Research is indexed because its listing shows 3 products once secondary listings are included. The rule counts **all listings**, not only primary ones.

### Why these five (and not Zoho's 15)

- Zoho has more than 55 products. ToyoApps has 11 public ones.
- Fifteen categories would give an average of under one product each, which means thin pages and an empty-looking mega menu.
- Five categories give 2–4 products each, a one-panel mega menu (Zoho study §10.3), and room to grow.
- **Split rule for the future:** when a category passes about 8 products, split it along its subcategories. Examples:
  - `sales-marketing` → `sales-crm` + `marketing`.
  - `operations-it` → `workplace-operations` + `it-administration`.

---

## 3. Subcategories (data only, used for filtering and future splits)

| Category | Subcategory | Products |
|---|---|---|
| Sales & Marketing | Contacts & relationships | Cardizo |
| | Marketing planning | GetBenj |
| | Creative operations (DAM) | Sibu |
| HR & People | HR management (HRMS) | HRMagix |
| | Workforce analytics & time tracking | ZUZU |
| | Learning & development | Zorfly |
| Operations & IT | Workplace operations | ZapBuzzer |
| | IT administration | SigChanger |
| | Telecom & device management | Fantom |
| | Fleet & logistics | Fleetras (draft) |
| Finance & Compliance | Practice management & compliance | TrackySuite |
| Insights & Research | Market research | Sizoru |
| | Meeting intelligence | MeetingMind (draft) |

---

## 4. Product → taxonomy map

| Product | Primary | Secondary | Subcategory | Audience tags | Platforms | Pricing model | Market |
|---|---|---|---|---|---|---|---|
| Cardizo | sales-marketing | — | Contacts & relationships | Founders, BD teams | Web | Tiered monthly (INR) | India |
| GetBenj | sales-marketing | insights-research | Marketing planning | D2C founders, agencies, growth teams | Web | Pay per report / packs (INR + USD) | India |
| Sibu | sales-marketing | — | Creative operations | Video, marketing, brand teams, agencies | Web (self-host option) | Tiered monthly (USD) | Global |
| HRMagix | hr-people | — | HRMS | HR / people teams | Web | Not stated (14-day trial) | India |
| ZUZU | hr-people | insights-research | Workforce analytics | Admins & managers | Windows agent + web | Per employee (not stated) | India |
| Zorfly | hr-people | — | L&D | Teams, managers | Web | Per seat (USD) | Global |
| ZapBuzzer | operations-it | — | Workplace operations | Offices, facility companies | Web + Android | Per seat (INR) | India |
| SigChanger | operations-it | — | IT administration | Google Workspace admins, IT, brand | Web | Tiered monthly (USD + INR) | Global |
| Fantom | operations-it | — | Telecom & device mgmt | Businesses with company SIMs | Web + Android | Not published (trial only) | India / UAE |
| TrackySuite | finance-compliance | operations-it | Practice mgmt & compliance | CA, CS, tax firms | Web | Tiered by clients (INR + GST) | India |
| Sizoru | insights-research | sales-marketing | Market research | Founders, consultants, VCs | Web | Per report (INR + USD) | India |
| Fleetras (draft) | operations-it | — | Fleet & logistics | Fleet operators | Web (PWA) | Not stated | UAE |
| MeetingMind (draft) | insights-research | hr-people | Meeting intelligence | Individuals, teams | Web | Tiered (USD, from code) | Global |

---

## 5. Cross-cutting dimensions (not categories)

These become **filters and solution/industry pages** later, never extra categories:

| Dimension | Values found in real products |
|---|---|
| **Industry** | Accounting & CA practices (TrackySuite) · Fleet & transport (Fleetras) · Media, creative & agencies (Sibu) · D2C brands (GetBenj) · Startups & investors (Sizoru) |
| **Team size** | Solo (Cardizo, Zorfly, SigChanger free tiers) → enterprise (custom plans on Cardizo, SigChanger, TrackySuite, ZapBuzzer, Zorfly) |
| **Platform** | Web (all) · Android (ZapBuzzer, Fantom) · Windows (ZUZU agent) |
| **Market** | India-first (9) · UAE (Fleetras) · Global (Sibu, SigChanger, Zorfly) |
| **AI-powered** | Cardizo, Sibu, ZUZU, GetBenj, Sizoru, Zorfly, ZapBuzzer (optional assistant), MeetingMind |
| **Google Workspace** | SigChanger (core), Cardizo (Google Contacts), Sibu (Google Drive), ZapBuzzer (Google sign-in) |

### Candidate solutions (problem-first, real overlaps only; to be written, not generated)

| Solution (working title) | Products that genuinely apply | Evidence |
|---|---|---|
| Run a well-organised office | ZapBuzzer, SigChanger, Fantom | Office requests; consistent signatures; company SIM control |
| Manage your people from hire to performance | HRMagix, ZUZU, Zorfly | HRMS; time and activity; skills training |
| Prepare for fundraising and launch | Sizoru, GetBenj | Market sizing; marketing plan |
| Never lose a business relationship | Cardizo | Single product, so this is not a cross-product solution. It belongs on Cardizo's own page |

Only the first three qualify as cross-product solutions (two or more products each). They are **listed as candidates and not published**, because publishing needs written content (problem, approach, how each product contributes). See the source map.

---

## 6. Where Zoho's taxonomy was and wasn't followed

| Zoho pattern (study §) | ToyoApps decision |
|---|---|
| Business-function categories (§3) | **Followed** |
| Products in multiple categories (§3.3) | **Followed** (primary + secondary) |
| No category landing pages (§3.1) | **Not followed.** ToyoApps builds category pages because it is a new brand without search demand for its product names |
| 15 categories | **Not followed.** 5, sized to the real portfolio |
| Suite bundle at the end of each category (§10.2) | **Deferred.** No real bundles exist yet |
| Industries owned by products (§15) | **Adapted.** Global industry pages listing multiple products, created only when real content exists |

# Zoho Complete Website Study for ToyoApps

**Purpose:** an architectural blueprint for the ToyoApps website, based on a structural study of zoho.com. This is not a design document.
**Research date:** 7 October 2026
**Sources:** official Zoho pages only (zoho.com, marketplace.zoho.com, help.zoho.com, catalyst.zoho.com, zoho.com/robots.txt and sitemaps). About 140 page fetches were made across five research passes.
**Status:** research input for ToyoApps information architecture. Every recommendation is labelled **Recommendation** and is not a confirmed final ToyoApps decision.

---

## How to read this document

Each finding carries one of these labels:

| Label | Meaning |
|---|---|
| **VERIFIED** | Stated on, or directly observed in, an official Zoho page. The URL is cited. |
| **OBSERVED** | Seen through public pages or links during this study, but not an official statement (e.g. a count we made ourselves). |
| **INFERRED** | A reasonable structural conclusion drawn from observed evidence. |
| **NOT PUBLICLY DISCLOSED** | Zoho does not publish this. |
| **NOT VERIFIED** | We tried but could not confirm it, usually because the content is rendered by JavaScript. |

### Limits of this study

These limits affect how much weight the findings can carry.

1. **Much of Zoho's site chrome is rendered by JavaScript.** The raw HTML of zoho.com is a skeleton of empty placeholder `<div>`s (`zw-global-header`, `zw-product-header`, `zw-product-footer`, `zw-global-footer`, …) filled in by scripts. So the **live global header, the mega menu, the global footer and most product footers could not be read directly.** Where we describe them, we rely on Zoho's standalone legacy include files (`/v3-header.html`, `/v3-footer.html`). The footer file carries "© 2021", so treat it as indicative, not current.
2. **Regional serving.** Our requests were served India-region content in several places (`/in/books/`, ₹ prices, `en-in` canonicals). US/EU versions may differ.
3. **Summarised fetching.** Some pages were read through a tool that summarises rendered content. Section headings are reliable. Exact prices, toggles and table contents sometimes are not, and those are flagged.
4. **The All Products page loads its product cards dynamically.** We could read the 15 category names and taglines, but **not the per-category product lists**.

---

## 1. Executive Summary

**The question:** *If ToyoApps has about 20 SaaS products today, but may grow to many more products, hundreds of features and 1,000+ pages, what is the best scalable website architecture it can learn from Zoho without copying Zoho?*

**Short answer:** Zoho does not have one big website. It has **one thin global shell wrapped around many deep, semi-independent product sites**. Each product site uses the same skeleton, and its depth grows with the product. That is the lesson for ToyoApps. Specifically:

1. **A shared global layer with the same page slots everywhere.** Every Zoho page has the same slots: promo → global header → **product header** → page body → **product footer** → global footer → copyright (VERIFIED from raw HTML across all sampled pages). Global and product navigation are separate, stacked layers.
2. **Categories organise discovery, not URLs.** All Products groups apps into 15 business-function categories. Yet **category landing pages do not exist** (`/sales.html`, `/finance.html`, `/hr.html`, `/marketing.html` and `/it-management.html` all return 404). Product URLs are flat (`/crm/`, `/books/`), so a product can sit in several categories without URL conflicts.
3. **Each product is its own content ecosystem.** Zoho CRM alone has **3,582 URLs in its own sitemap** (OBSERVED, counted). The sitemap index lists **393–498 child sitemaps**, split per product, per section and per region (OBSERVED; the count differed between two fetches, probably because of regional serving).
4. **Feature depth is driven by data, not by the template.** Products range from about 18 features (Inventory) to 80+ (Projects). One product skeleton absorbs the difference. Depth shows up as more feature categories, bigger menus and more detail pages, never as a different layout.
5. **Feature architecture has three levels.** The features hub links to feature-category hubs, which link to feature detail pages (`/crm/{category}/{feature}.html`). **Not every feature gets a page.** Minor capabilities stay as sections on the category hub.
6. **Industries, comparisons and integrations belong to products, not to the global site.** There is no global industries hub (`/industries/` and `/solutions/` both 404). CRM has `/crm/verticals/` with 12 industries. Comparisons live at `/crm/compare/salesforce.html` and `/desk/zendesk-alternative.html`. The global layer offers only a thin "Compare Alternatives" index and cross-product suites.
7. **Suites are the cross-product layer.** Zoho One, CRM Plus, Finance Plus, Workplace and PeoplePlus bundle products, carry department-level "solution" pages (`/one/sales.html`), and do the cross-selling that individual product pages mostly don't.
8. **Marketing, documentation and support are separate systems.** Marketing is on www.zoho.com. Knowledge base, community and FAQs are on help.zoho.com. Integrations are on marketplace.zoho.com. Webinar registration is on meeting.zohocorp.com.

**What ToyoApps should do (Recommendation):**
- Keep the current data-driven foundation.
- Adopt the **global shell + product shell** pattern, which the current codebase already has.
- Add **feature-category hubs** to the feature model.
- Make **industries and comparisons product-scoped first, with global aggregation pages layered on top.**
- Plan a **bundles/suites** concept for later.
- Keep docs and support out of the marketing app.

This gets to 1,000+ pages by depth per product, not by thin pages. Section 28 shows the arithmetic.

---

## 2. Zoho Overall Architecture

### 2.1 Homepage (https://www.zoho.com/), VERIFIED section order

1. Hero: "Your life's work, powered by our life's work" with CTA **Get Started For Free**
2. Featured apps: CRM, Mail, Creator, Books, Desk, Bigin with CTA **Explore all products**
3. App builder (Catalyst 3.0) with CTA "Build with agents"
4. Agent builder (Zia Agent Studio)
5. Zoho One ("The operating system for business", "50+ applications") with CTA **TRY ZOHO ONE**
6. Customer brand logos with CTA "Customer stories"
7. Company story ("Built with patience. Guided by purpose.")
8. Video stories
9. Zoho for Enterprise (quote)
10. Core values (privacy, R&D, long-term commitment)
11. Stats: "150M+ Users Globally", "150+ Countries Served", "60+ Products", "30+ Years in Business", "19K+ Employees Worldwide"
12. Regional data centre news
13. Final CTA: "Ready to do your best work?" with **Sign Up Now**

**INFERRED pattern:** the homepage works as a **portal and brand page**, not a product page:
- It features about 6 flagship apps, then platforms, then the suite.
- It then builds trust (customers, story, values, stats).
- It ends with a single CTA.
- It does **not** attempt to list all products. That job belongs to `/all-products.html`.

### 2.2 Top-level architecture tree (observed)

```
zoho.com
├── / (Homepage: portal + brand)
├── /all-products.html (catalog: 15 categories)
│   ├── tab: Suites → /one/ (+ /crm/crmplus/, /financeplus/, /workplace/, /peopleplus/, /marketingplus/)
│   ├── tab: Marketplace → marketplace.zoho.com (separate host)
│   ├── tab: Mobile Apps → /mobile-apps.html
│   ├── tab: Desktop Apps → /desktop-apps.html
│   ├── tab: Browser Extensions → /r/browser-extensions
│   └── tab: Compare Alternatives → /compare-alternatives.html
├── /{product}/ (≈55–60 product sites, e.g. /crm/ /books/ /desk/ /projects/)
│   └── features · pricing · feature categories · feature detail · verticals · compare ·
│       integrations · customers · resources · webinars · help · developer
├── /one/ (flagship suite)
│   ├── /one/pricing.html
│   ├── /one/{sales|marketing|support|accounting|hr|operations}.html (department "solutions")
│   └── /one/customers/{company}.html
├── /enterprise/ (segment page: by company size)
├── /customers.html (global customer stories; filters by industry, product, country)
├── /developer/ (global developer hub: Creator, Catalyst, Flow, APIs, MCP, marketplace partner programme)
├── /partners/ (6 partner programme types)
├── /blog/ · /academy/ · /events/ · /perspectives/ · /spark/ (training)
├── /about-us.html · /ourstory.html · /press.html · /inthenews.html · /branding/
├── /contactus.html (/support.html returns 404)
├── /terms.html · privacy · cookie · GDPR · security · abuse · anti-spam policies
├── /{region}/… (/in/, /en-in/, /ae/, /en-ae/, /au/, /uk/ …): regional copies
└── Subdomains: marketplace. · help. · community. · status. · catalyst. · (+ bigin.com, zohoflow.com)
```

### 2.3 Major sections

| Section | URL | Status | Purpose |
|---|---|---|---|
| All Products | /all-products.html | VERIFIED | Category-organised catalog with tabs for other discovery layers |
| Suites | /one/ and suite folders | VERIFIED | Cross-product bundles |
| Marketplace | marketplace.zoho.com | VERIFIED | Extensions, custom apps, industry solutions, AI agents |
| Mobile / Desktop / Extensions | /mobile-apps.html, /desktop-apps.html, /r/browser-extensions | VERIFIED | Platform-based discovery |
| Alternatives | /compare-alternatives.html | VERIFIED | Index of product-vs-competitor pages |
| Solutions / Industries (global) | /solutions/, /industries/ | **404** | No global hub found. See §13–14 |
| Enterprise | /enterprise/ | VERIFIED | Segment page (large organisations) |
| Customers | /customers.html | VERIFIED | Global story library with filters |
| Developer | /developer/ | VERIFIED | Platform and API hub |
| Partners | /partners/ | VERIFIED | Consulting, GSI, VAD, VAR, Affiliates, Marketplace |
| Resources | /blog/, /academy/, /events/ | VERIFIED | Global learning. Product resources live under each product |
| Support | /contactus.html; help.zoho.com | VERIFIED (/support.html is 404) | Contact plus separate help system |
| Community | help.zoho.com/portal/en/community; community.zoho.com | VERIFIED (content is JS) | Forums |

---

## 3. Product Categories

### 3.1 The 15 categories on All Products (VERIFIED names and taglines)

| # | Category | Tagline (verbatim) | Category page? |
|---|---|---|---|
| 1 | Sales | "Help your sales team be more productive with tools they'd love." | **No**: /sales.html is 404 |
| 2 | Marketing | "Engage with prospects using multi-channel marketing tools that help you personalize experiences at scale." | **No**: /marketing.html is 404 |
| 3 | Commerce and POS | "Build an online store, strengthen your retail and ecommerce operations, and sell better." | Not tested |
| 4 | Service | "Empower your customer and field service teams to deliver happiness and win trust." | Not tested |
| 5 | Finance | "Keep a tab on your expenses and manage your back office operations smoothly." | **No**: /finance.html is 404 |
| 6 | Education | "Education solutions for teaching, learning, and administration." | Not tested |
| 7 | ERP | "Modern ERP for managing financials, supply chain, and more, with contextual intelligence." | Not tested |
| 8 | Email, Storage, and Collaboration | "Create, collaborate, and communicate with your teams and customers." | Not tested |
| 9 | Human Resources | "Hire new employees, run training sessions, and manage all HR operations with ease." | **No**: /hr.html is 404 |
| 10 | Legal | "Streamline contract processes, mitigate risks, and improve your legal operations' efficiency." | Not tested |
| 11 | Security and IT Management | "Manage IT assets using ready tools or create a custom application to suit your needs." | **No**: /it-management.html is 404 |
| 12 | BI and Analytics | "Bring data to life with appealing visuals and insightful dashboards." | Not tested |
| 13 | Project Management | "Choose a project management style that suits your business the best." | Not tested |
| 14 | Developer Platforms | "Automate business processes, manage custom workflows, and build apps with a choice of no, low, and pro-code tools." | Not tested |
| 15 | IoT | "Bridge data, devices, and decisions with seamless IoT integrations and automations." | Not tested |

### 3.2 Products per category

**NOT VERIFIED from the live page**, because product cards load dynamically. The best observable list comes from the legacy header include (`/v3-header.html`, likely outdated). It uses **10 groups**, not 15:

| Group (legacy header) | Products listed |
|---|---|
| Sales | CRM, Desk, Forms, SalesIQ, ContactManager, SalesInbox, Bookings, Bigin, *CRM Plus bundle* |
| Marketing | Social, Campaigns, Forms, Survey, Sites, PageSense, Backstage, Meeting, Commerce, Marketing Automation, *Marketing Plus bundle* |
| Customer Support | Desk, Assist, Lens, ServiceDesk Plus |
| Finance | Books, Invoice, Expense, Inventory, Subscriptions, Checkout, Payroll, *Finance Plus bundle* |
| HR | People, Recruit, Expense, Workerly, Payroll, ShowTime, BackToWork, *People Plus bundle* |
| Legal | Contracts |
| Email & Collaboration | Mail, Meeting, Writer, Sheet, Show, Notebook, Cliq, Connect, Bookings, TeamInbox, WorkDrive, Sign, ShowTime, Office Suite, Wiki, Office Integrator, ZeptoMail, Calendar, Learn, Voice, *Workplace bundle* |
| IT Management | Creator, Catalyst, Site24x7, Flow, Vault, BugTracker, MDM, Patch Manager Plus, Identity Management, Log Management Cloud, Lens, Assist, Remote Access Plus, Desktop Central, Domain Toolkit, *IT Management bundle* |
| BI & Analytics | Analytics, Embedded BI, DataPrep |
| Project Management | Projects, Sprints, *Workplace bundle* |

### 3.3 Category behaviour (answers to the study questions)

| Question | Finding |
|---|---|
| Category purpose | Groups apps by **business function / department** (VERIFIED from the taglines) |
| How products are displayed | Cards with name and short description inside category sections (INFERRED; content is dynamic) |
| Dedicated landing page? | **No** for the 5 categories tested (404). Categories exist only as sections/anchors of /all-products.html |
| Links directly to products? | Yes. Category → product site (INFERRED from the legacy header) |
| Navigation presentation | A "Products" mega menu with tabs (Apps, Suites, Platforms, Marketplace, Mobile Apps); category groups list their products (legacy header) |
| Multi-category products? | **Yes.** Desk, Forms, Bookings, Meeting, Expense, Payroll, ShowTime, Assist, Lens and Workplace each appear in more than one group (OBSERVED, legacy header) |
| Category-level SEO | No category pages, so category keywords ("CRM software", "accounting software") are targeted by **product** pages instead (INFERRED) |
| Bundles inside categories | Each category group ends with its suite bundle (e.g. Finance → Finance Plus): a cross-sell at the point of discovery |

**Lesson for ToyoApps (Recommendation):**
- Group products by business function, and allow **multiple categories per product**: one primary category for breadcrumbs plus secondary categories for discovery.
- Unlike Zoho, **do build category landing pages**. With about 20 products and no brand recognition yet, ToyoApps needs pages that rank for "{category} software" and explain the group. Zoho can skip these because its product brands carry the search demand.

---

## 4. Product Ecosystem (counts)

### 4.1 Product count, kept separate from page count

| Type | Value | Source |
|---|---|---|
| Officially stated (catalog page) | "over 55+ different business applications" | /all-products.html (VERIFIED) |
| Officially stated (homepage) | "60+ Products" | / (VERIFIED) |
| Officially stated (Zoho One) | "45+ integrated applications"; Standard plan "50+ unified business apps" | /one/, /one/pricing.html (VERIFIED) |
| Officially stated (About) | "more than 50 deeply integrated applications" | /about-us.html (VERIFIED) |
| Observable distinct products | About 70 names in the legacy header, including bundles and platforms; exact count NOT VERIFIED from the live page | /v3-header.html (OBSERVED) |
| Marketplace extensions | "over 2900+ ready-to-use extensions across 40+ categories" (all-products); "2,500+ marketplace integrations" (partners) | VERIFIED, but the figures conflict |
| Website page count | **NOT PUBLICLY DISCLOSED** | See §26 |

**What this means:**
- Zoho's own numbers differ by page (45+, 50+, 55+, 60+), because they count different things: suite membership vs total catalog vs company stats.
- **Product count ≠ page count.** 55–60 products produce many thousands of URLs (one product alone has 3,582).
- ToyoApps should store one product count in data and render it from there, so it is never inconsistent across pages.

---

## 5. Product-Level Architecture

### 5.1 Products sampled

| Category | Product | Pages studied |
|---|---|---|
| Sales | Zoho CRM | 22 pages (deep-dive, §5.3) |
| Marketing | Campaigns | home, features, pricing, contact-management |
| Finance | Books (served /in/) | home, features, pricing |
| HR | People | home, features, pricing |
| Project Mgmt | Projects | home, features, pricing, gantt-charts |
| Customer Service | Desk | home, features, pricing, zia |
| Analytics | Analytics | home, pricing (features.html returned 404 to our fetch) |
| Collaboration | Mail | home, features, pricing |
| ERP / Inventory | Inventory (served /in/) | home, features, pricing |
| Developer Platform | Creator (+ Catalyst) | home, features, pricing, catalyst.zoho.com |
| Small product | Bookings (+ Forms) | home, pricing, forms home |

### 5.2 Product homepage section order (VERIFIED headings, condensed)

| Product | Observed order |
|---|---|
| **CRM** | Hero + trial → "Trusted by 300K+" → AI agents → collaboration → heritage → AI assist → Engage / Stay informed / Scale (feature pillars) → 360° view → Privacy → "Grow with Zoho" (migration, onboarding, enterprise, Bigin) → "Take us for a spin" → FAQ |
| **Campaigns** | Hero → small-business positioning → AI → channels (Email/SMS/WhatsApp) → feature trio → integrations → testimonials → recognition → "Just getting started?" → FAQ → closing CTA |
| **Books** | Hero → switch/migration → growth → "Do it all" → **pricing teaser** → solutions → integrations → mobile → desktop → FAQ → privacy |
| **People** | Hero → AI → Hiring/Onboarding → Core HR → Compensation/Performance/Learning → competition → payroll & expense → analytics → engagement → security → integrations → mobile → "Built for your people" → scalability → FAQ → closing CTA |
| **Projects** | Hero → Gantt → Timesheets → Customize → Automate → AI → Connected intelligence → Integrations → Trust → Ratings → Mobile → closing → FAQ |
| **Desk** | Hero → "Trusted by 125,000+" → feature narrative → omnichannel → help centre → analytics → AI → workflow (Assign/Collaborate/Orchestrate/Commit) → heritage → closing CTA |
| **Analytics** | Hero → agentic BI → Connect → Prepare → Visualize → Analyze → Share → Embed → AI agents → democratise → 500+ integrations → customers → mobile → why us → closing CTA |
| **Mail** | Hero → ad-free → pain points → logos → "550,000+ businesses" → security → tools → "Go live in 3 steps" → migration → switching → hosting → FAQ |
| **Inventory (IN)** | Hero → webinar → local positioning → GST → segments → integrations → mobile → **pricing teaser** → testimonials → shipping carriers → local contact |
| **Creator** | Hero → trial → logos → "What can you build" → build more → control → ship → enterprise-ready → extend → solutions → reviews → user segments → brands → FAQ |
| **Bookings** | Hero → trial → logos → "How it works" (product tabs) → automation → AI → testimonials → beyond basic → **industries** → team sizes → integrations → mobile → trial band → FAQ |

### 5.3 Common, optional and product-specific sections (from the 10-product comparison)

| Tier | Sections |
|---|---|
| **Universal** | Hero with primary signup CTA (usually plus demo/video); feature showcase blocks with "Explore/Learn more" links; social proof (logos, counts, testimonials, review badges); integrations block; closing CTA band |
| **Near-universal** | FAQ (9/10); mobile apps section; dedicated AI section |
| **Optional** | Industries / solutions; pricing teaser on homepage; security/compliance; migration ("switch") story |
| **Product-specific** | Regional compliance (GST); shipping carriers; user-segment pages (Creator); competitor comparison (Bookings, CRM); desktop app (Books); suite bundle on pricing (People, Mail) |

**INFERRED:** there is one shared skeleton with interchangeable section types, plus at least **two template families**:
- "Classic": flat `.html` URLs. Projects, People, Desk, Mail, Campaigns, Creator.
- "Finance": folder URLs, India region prefix, rich product mega menu and a multi-column **product footer**. Books, Inventory.

### 5.4 Product sub-navigation (observed)

| Product | Sub-nav / primary groupings |
|---|---|
| CRM | Highlight strip: Canvas, Sales Force Automation, Journey Orchestration, CPQ, Module 360, Kiosk Studio, Predictive AI & BI, Advanced Analytics, Agents (whether this is a sub-nav or a carousel is NOT VERIFIED) |
| Books | Features (Core / Compliance / Effortless Accounting) · Solutions (by size / role / device) · Pricing · Integrations · Customers · Resources |
| Inventory | Features · Solutions (Retail, Ecommerce, Manufacturing, Dropshipping) · Pricing · Customers · Integrations · Resources · Mobile · Guides · Developers |
| Creator | Features · Solutions · Use cases · User segments · Customers · Pricing |
| Analytics | Connect · Prepare · Visualize · Analyze · Collaborate · Extend · AI Agents (lifecycle-based) |
| Bookings | Industries · Solutions · Integrations · Customers · Buyer's guide · Pricing |
| Campaigns, People, Desk, Mail, Projects | Menu NOT VERIFIED (JS) |

**Common core:** Features · Pricing · Customers · Integrations · Resources.
**Optional:** Solutions, Industries, Use cases, Mobile, Developers.

### 5.5 Zoho CRM deep-dive: page tree (OBSERVED; "→" marks a linked page that was not fetched)

```
/crm/                                         Product home
├── features.html                             Features hub (6 categories)
│   ├── zia/                                  AI (category hub)
│   │   ├── agents.html →  generative-ai.html  agentic-ai.html →
│   ├── sales-force-automation/               SFA hub (PREV: AI · NEXT: Lead Mgmt)
│   │   ├── pipeline.html  forecasting.html  territory-management.html →  cpq.html →  workflows.html →
│   ├── lead-management/                      Lead Mgmt hub (PREV: SFA · NEXT: Process)
│   │   ├── lead-generation.html →  lead-enrichment.html →  lead-nurturing.html  omnichannel.html →
│   ├── process-management/
│   │   ├── cadences.html →  blueprint.html  kiosk-studio.html →  journey-orchestration.html →
│   ├── customization/
│   │   ├── layouts-components.html →  portals.html
│   ├── business-intelligence/                (no child features listed)
│   ├── crm-for-everyone/ →     developer/client-scripts.html →     /canvas/ (outside /crm/)
├── module360.html →
├── zohocrm-pricing.html                      Pricing (also linked as pricing.html)
├── signup.html?plan=…  request-callback.html  request-migration-assistance.html
├── edition-selector-quiz-zoho-crm.html       Plan-finder quiz
├── switch-crm-save-70.html                   Migration offer
├── gartner-crm-platform-mq.html · delightful-experience.html · non-stop-scaling.html · maximum-productivity.html  (theme/campaign pages)
├── verticals/                                Industries hub (12)
│   ├── real-estate/  financial-services/ (+ request-demo.html)  education/  life-sciences/
│   ├── automotive-crm/  retail/  insurance/  hospitality/  satellite-broadcasting/  agencies/
│   └── service-industry.html  startups.html
├── integrations.html                         "1,100+" integrations → marketplace.zoho.com/app/crm
├── compare/                                  Comparison hub
│   └── salesforce.html  microsoft-dynamics.html  hubspot.html  creatio.html
├── crmplus/                                  Suite (CRM Plus)
├── customers/                                Customer stories hub
├── resources/                                Resource hub (17 tiles)
│   ├── getting-started.html  ebooks/  videos/  courses.html  solutions/ (programmable solutions library)
│   └── guided-tour/zoho-crm-overview.html
├── webinars/                                 Live / On-demand / Sales leadership
├── tutorials/  customer-success/ (training)  home-blogs.html
├── help/                                     Documentation (on www): 5 categories
├── developer/  → developer/docs/             APIs, SDKs, MCP, sandbox
└── sitemap.xml                               3,582 URLs (OBSERVED)
External: help.zoho.com (KB/FAQ/community) · marketplace.zoho.com/app/crm · meeting.zohocorp.com · bigin.com
```

---

## 6. Feature Architecture

### 6.1 How Zoho structures features (CRM: VERIFIED)

```
Product home (/crm/)
  └─ Features hub (/crm/features.html): lists categories and the features in each
       └─ Feature-category hub (/crm/sales-force-automation/): one section per feature,
          PREV/NEXT links across categories, signup CTA
            └─ Feature detail (/crm/sales-force-automation/forecasting.html)
               breadcrumb "Category > Feature", one CTA, links back to the category hub
```

| Question | Finding |
|---|---|
| Which features get separate pages? | Major, searchable capabilities: Pipeline, Forecasting, CPQ, Territory, Workflows, Blueprint, Portals, Lead Nurturing (VERIFIED) |
| Which stay as sections? | Minor or supporting capabilities: "Document library" and "Motivator" on the SFA hub; duplicate merging, card scanner and compliance on the Lead Mgmt hub (VERIFIED) |
| Depth variation between products | CRM uses 3 levels (hub → category folder → feature). Projects uses 2 levels (hub → flat `/projects/{feature}.html`). Books uses folders (`/books/accounting-software/{feature}/`). People uses keyword slugs (`/people/{x}-software.html`) |
| Feature → product back-link | Detail pages link to their **category hub**, not to the features hub or product home (VERIFIED, CRM) |
| Related features | **No sideways "related features" block observed** on CRM detail pages. The PREV/NEXT chain exists only at category level |
| Conversion on feature pages | One primary CTA (free signup, plan preset, `source_from={feature}` attribution). Desk's zia.html adds demo + pricing + FAQ + testimonials. Projects' gantt-charts.html is a long SEO article with FAQ |
| How products become content ecosystems | Feature pages are written as **keyword landing pages** (e.g. "What is a Gantt chart?", "History of…"). Each captures its own search demand and funnels to signup |

### 6.2 Feature counts observed

| Product | Feature categories | Approx. features | Detail URL pattern |
|---|---|---|---|
| CRM | 6 | about 25 on hub | `/crm/{category}/{feature}.html` |
| Projects | 12 | 80+ | `/projects/{feature}.html` |
| Books | 12 (+5 blocks) | about 47 | `/books/accounting-software/{feature}/` |
| Creator | 11 (verbs) | about 50 | `/creator/{feature}.html` |
| Desk | 10 | about 35 | `/desk/{feature}.html` |
| Mail | 9 | about 35 | `/mail/{feature}.html`, `/mail/security/…` |
| Campaigns | 8 | about 25 | mixed `.html` / folders |
| People | 7 | about 25 | `/people/{x}-software.html` |
| Inventory | 6 | about 18 | `/inventory/{feature}/` |
| Bookings | 8 tabs | small | `/bookings/features/{feature}.html` |

### 6.3 Recommended ToyoApps feature architecture (Recommendation)

```
/products/[product]/features/                       Features hub: all categories, all features (anchors)
/products/[product]/features/[featureCategory]/     Category hub: only when the category has ≥ 3 features
                                                     or its own search demand
/products/[product]/features/[feature]/             Feature detail: only when the feature has real body content
```

**Rules:**
1. **Each feature is a data record. A page is optional.** `hasPage` must be true *and* body content must exist. This is already how the ToyoApps code works (`featureHasPage`).
2. **Category hubs are generated, not hand-built.** Render one when `features.filter(category).length ≥ 3`. Otherwise the category is just a heading on the features hub.
3. **Detail pages must link** up to the category hub, product and features hub (breadcrumb); **sideways** to 3 sibling features in the same category (an improvement on Zoho, which lacks this); and to pricing and the primary CTA.
4. **Avoid nested-category URLs** like `/features/[category]/[feature]`. A feature can then move between categories without changing its URL; the category is shown in the breadcrumb only. Zoho's `/crm/{category}/{feature}.html` pattern causes oddities such as `layouts-components` listed under Process Automation but living under `/customization/`.

**Gap in the current ToyoApps code:** feature-category hub pages do not exist yet. The model already supports them (`featureCategories` and `Feature.category`), so this is a route addition, not a rewrite.

---

## 7. Variable Feature Count

**Can one reusable product template support products with 5 features and products with 100+ features? Yes.** Zoho is the evidence: Inventory (about 18) and Projects (80+) use the same product skeleton.

**How:**

| Feature count | What renders (Recommendation) |
|---|---|
| 0 | No Features section, no features route, no "Features" in product nav |
| 1–6 | Feature cards on the product overview; features hub optional (skip it if it duplicates the overview) |
| 7–30 | Overview shows highlighted features (≤ 6) with a link to the features hub, grouped by category with anchor chips |
| 30–100+ | As above, plus generated category hubs, a sticky category jump-nav on the hub, and detail pages for features with content |

**Technical model:**
- `Product.features: Feature[]` holds any length.
- `Product.featureCategories: FeatureCategory[]` is optional.
- `Feature.highlight` chooses the features shown on the overview.
- `Feature.hasPage` together with `body` controls which features get their own route.
- Templates iterate. They never assume a count.
- Sections, routes and navigation entries are derived from data (`getAvailableSections`).

The current ToyoApps placeholders already exercise counts from 0 to 40.

---

## 8. Product Page Structure

### 8.1 Composite order observed (most to least common)

1. Global header (injected)
2. Product header / sub-nav (injected slot)
3. Hero: headline, subline, primary CTA (signup), secondary CTA (demo/video)
4. Social proof strip (customer count or logos), often directly after the hero
5. Feature pillars (3–8 blocks, each with "Explore" links)
6. AI section
7. Integrations
8. Testimonials / ratings / awards
9. Mobile apps
10. Pricing teaser (some products only)
11. Industries / solutions (some products only)
12. FAQ
13. Closing CTA band
14. Product footer (slot; populated on some products)
15. Global footer

**Differences from the assumed order in the brief:**
- Social proof comes **early** (directly after the hero), not near the end.
- "Pricing" on the homepage is rare; it usually lives on its own page.
- Screenshots are embedded inside feature pillars, not given a separate gallery section (INFERRED).

### 8.2 Recommendation for ToyoApps

Keep the current `ProductPageTemplate`. Its sections are already optional and data-driven. Change the order to match the conversion-tested pattern: **Hero → proof strip (only when real) → What it is / who it's for → Feature pillars → How it works → Use cases / industries / integrations → Pricing summary → Related products → FAQ → CTA.**

---

## 9. Product Navigation

| Mechanism | Zoho | Evidence |
|---|---|---|
| Global navigation | Yes, injected into every page | `zw-global-header` (VERIFIED) |
| Product-specific navigation | Yes, a separate slot under the global header | `zw-product-header` (VERIFIED slot; contents NOT VERIFIED except CRM strip and Books/Inventory menus) |
| Product mega menu | Yes for Books and Inventory (Features / Solutions groups) | OBSERVED |
| Sticky product nav | **INFERRED only** (Books CSS has many `sticky` classes) | NOT VERIFIED |
| Breadcrumbs | Yes on CRM feature, vertical and comparison pages ("Verticals > Real Estate CRM") | VERIFIED (visible); BreadcrumbList markup only seen on the blog |
| Category pager | PREV / NEXT between CRM feature categories | VERIFIED |
| Sidebar | Only in documentation (/crm/help/), not on marketing pages | OBSERVED |
| Footer navigation | Global footer everywhere, plus a product footer slot | VERIFIED slots |

**What ToyoApps should use (Recommendation):**
- A global header on every page.
- A sticky **product sub-nav** on every product page that lists only the sections that exist. This is already built.
- Breadcrumbs on every page below level 1. Already built, with BreadcrumbList JSON-LD.
- A PREV/NEXT pager on feature-category hubs once those exist.
- No sidebar on marketing pages. Keep sidebars for documentation.

---

## 10. Header & Mega Menu

### 10.1 Header (from the legacy include; the live header is JS-injected and NOT VERIFIED)

| Element | Finding |
|---|---|
| Logo | Zoho wordmark, linking to home |
| Top-level items | **Products** (mega menu), Enterprise, Support, Customers, More (About, Our story, Blog, Community, Partner with us, Contact) |
| Search | NOT VERIFIED in header (WebSite + SearchAction JSON-LD exists on homepage = VERIFIED) |
| Sign in / Sign up | Present on product pages (Books: "Sign Up Now", "Sign in"); global markup NOT VERIFIED |
| Mobile menu | NOT VERIFIED |

### 10.2 Products mega menu (legacy include)

- **Tabs:** Apps · Suites · Platforms · Marketplace · Mobile Apps.
- **Apps tab:** category groups (Sales, Marketing, Customer Support, Finance, HR, Legal, Email & Collaboration, IT Management, BI & Analytics, Project Management), each listing products with a short description. **Each group ends with its suite bundle.**
- **Suites:** CRM Plus, Finance Plus, People Plus, Workplace, IT Management, Remotely, Marketing Plus.
- **Platforms:** Flow, Qntrl, Creator, Catalyst, Office Integrator.

**How Zoho avoids overwhelming people (INFERRED):**
1. Only **one** top-level item ("Products") carries the catalog. Everything else is company or support.
2. **Tabs** split the catalog by *type* (apps, suites, platforms, marketplace, mobile) before *function*.
3. Category groups give each product a short label instead of a paragraph.
4. Suites act as a "buy several" shortcut in every group.
5. The complete list is pushed to `/all-products.html`.

### 10.3 Recommended ToyoApps mega menu for about 20 products (Recommendation)

```
Products ▾
┌────────────────────────────────────────────────────────────┬───────────────────┐
│ [Category A]        [Category B]        [Category C]       │ FEATURED          │
│  Product 1 · line    Product 4 · line    Product 7 · line  │  2–3 products     │
│  Product 2 · line    Product 5 · line    Product 8 · line  │  (data: featured) │
│  Product 3 · line    All B →             All C →           │                   │
│ [Category D] …       [Category E] …                        │ [View all →]      │
├────────────────────────────────────────────────────────────┴───────────────────┤
│ Later tabs (only when data exists): Apps · Bundles · Integrations · Mobile     │
└────────────────────────────────────────────────────────────────────────────────┘
```

- Show at most 4 products per category, then "All {Category} →". This is already implemented (`PER_CATEGORY = 4`).
- With 20 products in 5–7 categories, the whole catalog fits on one panel without tabs.
- Add **tabs** only when a second product type exists (bundles, platforms, mobile apps). Do not create empty tabs.
- On mobile, show an accordion per category (already implemented).

---

## 11. Footer Architecture

### 11.1 Global footer (from legacy `/v3-footer.html`, © 2021: indicative only)

| Column | Links | Purpose | Scope |
|---|---|---|---|
| Company | About Us, Press, Events, Newsroom, Branding Assets, Zoho Schools, Service Status | Corporate | Global |
| Products | Apps, Suites, Platforms (anchors on /all-products.html), Marketplace | Catalog entry | Global |
| Learn | Training & Certification (/spark/), Academy, Blogs, Perspectives, Knowledge Base, Zia | Education | Global |
| Community | User Community, Customer Stories, Influence, Partner with Us, Zoho for Startups, Affiliate Program, Marketplace, Merchandise | Ecosystem | Global |
| Contact Sales | Regional phone numbers, sales@zohocorp.com, Support, Talk to Concierge | Conversion | Global |
| Legal bar | Security, IPR Complaints, Anti-spam Policy, Terms of Service, Privacy Policy, Cookie Policy, GDPR Compliance, Abuse Policy | Compliance | Global |
| Social | Twitter, Facebook, Instagram, LinkedIn, YouTube | Brand | Global |
| Country/language selector | NOT VERIFIED | — | — |

### 11.2 Product-specific footer (§13 of the brief)

| Pattern | Evidence |
|---|---|
| **Every page has a `zw-product-footer` slot before `zw-global-footer`** | VERIFIED in raw HTML on CRM, Desk, Projects and the features hub |
| **Books** product footer columns: Product Help & Resources, Helpful Resources, Connected Banking Partners, Other Resources, Learning Hub, Free Tools, **Other Zoho Finance & Operations Apps**, Social | OBSERVED |
| **Inventory** product footer columns: Explore Zoho Inventory, Get Started, Resources, Integrations, Solutions, Free Tools, Learn Hub, Available on Platforms, **Other Related Zoho Finance Apps** | OBSERVED |
| CRM, Desk, Projects product footer contents | NOT VERIFIED (JS-injected) |

**Answer: Zoho uses pattern C, product navigation and product footer plus the global footer.** Product footers are used for product resources and **sibling-product cross-sell** ("Other Zoho Finance apps"). The global footer carries corporate, legal and ecosystem links.

**ToyoApps recommendation: use both.** Every product page should render a **product footer** (Explore · Resources · More in {category}) above the **global footer**. This is already implemented as `ProductFooter`, with a separate `SiteFooter`. Add a "Free tools / Guides" column only when that content exists.

---

## 12. Suites / Bundles

| Suite | Scope | Pricing approach | Evidence |
|---|---|---|---|
| **Zoho One** | "The Operating System for Business"; 45+/50+ apps; department pages (Sales, Marketing, Service, Finance, HR, Operations, eCommerce) | Per-user plans (Standard "US$90" per user per month annual, flexible-user) **or all-employee pricing**; one invoice; 30-day trial | /one/, /one/pricing.html (VERIFIED) |
| **CRM Plus** | About 15 customer-facing apps (CRM, SalesIQ, Desk, Projects, Campaigns, Social, Survey, Analytics, Marketing Automation, PageSense, …) | "single affordable monthly/yearly pricing"; also cross-sold on CRM pricing ("from ₹420/user/month", IN) | /crm/crmplus/ (VERIFIED) |
| **Finance Plus** | 8 apps (Invoice, Books, Inventory, Billing, Expense, Checkout, Payroll, Commerce) | Per-organisation price (IN: ₹8,499/month, 10 users) | /financeplus/ (VERIFIED, IN) |
| **Workplace** | Mail, Calendar, WorkDrive, Writer, Sheet, Show, Cliq, Meeting, Connect | Mixed into Mail pricing as tiers | /workplace/, /mail/zohomail-pricing.html (VERIFIED) |
| **PeoplePlus** | People, Recruit, Payroll, Expense, Connect, Cliq, Vault | Shown on People pricing | /people/zohopeople-pricing.html (VERIFIED) |

**Why suites exist (INFERRED from positioning):**
- They break down data silos and simplify purchasing with one invoice.
- They raise order value.
- They provide the cross-product story that single product pages don't tell.

**How they affect the site:**
- **Navigation:** a mega-menu tab, plus a bundle at the end of each category group.
- **Pricing:** suite tiers appear *inside* member products' pricing pages (Mail → Workplace; People → PeoplePlus; CRM → CRM Plus).
- **Cross-sell:** the global homepage promotes Zoho One. Product homepages mostly do not (Zoho One was not observed on sampled product pages).
- **Solutions:** department "solution" pages live under the suite (`/one/sales.html`).

**ToyoApps (Recommendation):** plan a `Bundle` entity (members, pricing, positioning, department pages) but **do not build bundles until at least 2–3 products genuinely work together and have joint pricing.** Inventing bundles would be an unsupported claim.

---

## 13. Marketplace

| Aspect | Finding |
|---|---|
| Concept | "Explore Apps For Zoho / Integrate Zoho applications with all the tools for your business needs" (marketplace.zoho.com: VERIFIED) |
| Listing types | Extensions · Custom Apps · Industry Solutions · AI Agents |
| Discovery | Search, filter by Zoho product, integration type, deployment, price, rating, edition; Featured / Editor's picks / Vendor solutions |
| Scale | "2900+ … extensions across 40+ categories" (all-products); "2,500+" (partners): conflicting official figures |
| Relationship to products | Each product's `/integrations.html` links to `marketplace.zoho.com/app/{product}`; separate host, regional domains |
| Third-party ecosystem | Marketplace partner programme ("Build and Sell"), developer hub, partner types |
| Individual listing anatomy | NOT VERIFIED (JS-rendered) |

**ToyoApps.** The current toyoapps.com positions ToyoApps itself as a **SaaS marketplace** where makers publish and sell. That is different from Zoho, whose marketplace sells *add-ons to Zoho products*. These are kept separate:

| Option | Recommendation |
|---|---|
| Marketplace (third-party SaaS listings) | **Already part of the stated ToyoApps business** (publish, sell, discover). It needs a product decision on how third-party listings differ from first-party ToyoApps products in data (`publisher`, `firstParty: boolean`) and in the UI (a badge and verified-publisher info) |
| Integrations directory | **Recommended** once real integrations exist (§16) |
| Partner ecosystem (resellers, consultants) | **Not now.** Revisit after launch |
| Extensions / add-ons for ToyoApps products | **Not now.** Only if products expose extension points |

---

## 14. Mobile / Desktop / Extensions

| Layer | Zoho | Evidence |
|---|---|---|
| Mobile apps | /mobile-apps.html (Android, iPhone, Microsoft); per-product mobile pages (/books/accounting-mobile-apps/, /people/peopleapp.html) | VERIFIED (app list NOT VERIFIED) |
| Desktop apps | /desktop-apps.html (Windows, Mac, Linux; Bigin, Notebook, Inventory, Expense, Invoice) | VERIFIED |
| Browser extensions | /r/browser-extensions: 8 groups, Chrome/Firefox/Safari/Edge | VERIFIED |

**Should ToyoApps create similar sections? Not initially.** Model `platforms: ("web"|"ios"|"android"|"windows"|"mac"|"chrome"…)[]` on Product now; it is cheap. Generate a `/apps/mobile` style index **only when at least 3 products ship on that platform.** Before that, show platform badges on the product page.

---

## 15. Industries

**VERIFIED:**
- No global industries hub exists (`/industries/`, `/solutions/` and `/one/industries/` are all 404).
- Industry pages are **product-owned**:
  - CRM: `/crm/verticals/` with 12 industries.
  - Creator: `/creator/solutions/{industry}`.
  - Inventory: `/inventory/inventory-software-for-retail/`.
  - Bookings: `/bookings/industries/`.

**Anatomy of a CRM vertical page (VERIFIED: education, real estate, financial services, life sciences):**

```
Breadcrumb (Verticals > Real Estate CRM)
→ Hero + "GET A DEMO"
→ Problems (3–6, industry language)
→ What the industry needs / why Zoho
→ Capability sections mapped to CRM features (on-page; separate feature URLs NOT observed)
→ Companion products (Canvas, Zia, RouteIQ)
→ Named third-party integrations (e.g. Zillow, 99acres, IDX Broker)
→ Case studies (3–6) / awards / stats
→ FAQ → Demo CTA → disclaimer ("industry-agnostic… requires customization")
```

**Depth:**
- One long page per industry (9–21 sections). No sub-pages per problem.
- Financial services goes deeper by **embedding a sub-solution** (Loan Origination System, 11 sections).
- Industry pages use **"Get a demo"** rather than self-serve signup, because they target higher intent and higher value buyers.

**ToyoApps (Recommendation):**
- Use the same two-level approach, built the other way round:
  1. `/industries/[industry]` is a **global** page, because ToyoApps' value is the portfolio. It lists every ToyoApps product relevant to that industry.
  2. A product-level industry section (`/products/[product]/industries`) links to it.
- Only add a product-specific industry page (`/products/[product]/industries/[industry]`) when that product has industry-specific features or customers.
- Never publish an industry page without industry-specific problems and at least one genuinely relevant product.

---

## 16. Solutions

**VERIFIED.** Zoho expresses "solutions" in three ways:

| Type | Where | Example |
|---|---|---|
| By department (cross-product) | Suite pages | /one/sales.html, /one/hr.html: problem ("lead to cash") → bundle of apps → trial |
| By company size / segment | Global and product | /enterprise/ (6 solution categories → product sites), /crm/verticals/startups.html, /crm/crm-for-everyone/ |
| By role / size inside a product | Product mega menu | Books → Solutions: by size (Startups, Small, Medium, Non-profit), by role (Owner, Accounting firms, Students), by device |

**ToyoApps (Recommendation):**
- `/solutions/[solution]` should be **cross-product and problem-first**, e.g. "Get paid faster".
- Data: `problem`, `approach`, `products[]` (ordered by relevance), `features[]` (product+feature refs), `resources[]`, `faqs[]`.
- The `Solution` model in the current codebase already has problem/approach/products. Add `features` refs and `audience` (size/role).

---

## 17. Use Cases

**OBSERVED:**
- Use cases appear as Creator `/creator/usecases/` (internal tools, portals, core systems).
- They also appear as CRM "theme" pages: delightful-experience, non-stop-scaling, maximum-productivity. These are campaign-style landing pages that group features by outcome.
- CRM's "Solutions library" (`/crm/resources/solutions/`) is a filterable library of programmable recipes (features used, module, trigger). Its content was JS-loaded and NOT VERIFIED.

**How a problem becomes a page (INFERRED):**
1. Outcome headline.
2. 3–5 capability blocks, each linking to a feature page.
3. Proof.
4. CTA.

**Recommended ToyoApps use-case architecture:**
- **Merge "use case" and "solution" into one entity** (`Solution`) with a `kind: "problem" | "role" | "size" | "use-case"` field. This avoids two near-identical page types competing for the same keywords.
- Product-scoped use cases render on `/products/[product]/solutions` (already a ToyoApps route) and link to the global `/solutions/[slug]`.

---

## 18. Integrations

| Layer | Zoho | Evidence |
|---|---|---|
| Product integration overview | /crm/integrations.html ("1,100+ ready-to-use app integrations": API, Flow, real-time events, sandbox) | VERIFIED |
| Third-party directory | marketplace.zoho.com/app/{product} (separate host) | VERIFIED |
| Cross-product (Zoho ↔ Zoho) and iPaaS | Zoho Flow; zohoflow.com/apps/{app}/integrations/ and /apps/categories/{cat}/integrations/ | VERIFIED |
| Per-integration marketing pages on www | Bookings: /bookings/integrations/zoho-crm.html; Inventory: amazon-/shopify- landing pages | OBSERVED |
| Developer / API | /developer/ (global) and /crm/developer/ → /crm/developer/docs/ | VERIFIED |
| Integration categories | Marketing, sales, finance, booking, telephony, communications, docs (CRM page) | VERIFIED |

**Recommended ToyoApps integration URLs (Recommendation):**

```
/integrations/                              Directory: filter by category and by ToyoApps product
/integrations/[integration]/                One page per external tool; lists every ToyoApps product it works with
/integrations/category/[category]/          Generated when a category has ≥ 3 integrations
/products/[product]/integrations/           Product's integrations (already exists in ToyoApps)
/products/[product]/integrations/[integration]/   Only when the product-specific integration has its own setup, use cases and screenshots
```

- **Internal ToyoApps ↔ ToyoApps connections** should be modelled as `ProductConnection { from, to, description }`, not as integrations.
- They feed the homepage "ecosystem" section and related-product links.
- **Never list an integration that does not exist.** This rule is already enforced by an empty registry.

---

## 19. Alternatives & Comparisons

**VERIFIED:**
- Global index `/compare-alternatives.html` ("Popular comparisons") links **into product folders**:
  - `/crm/compare/salesforce.html`
  - `/desk/zendesk-alternative.html`
  - `/projects/monday-alternative.html`
  - `/analytics/powerbi-alternative-software.html`
  - `/creator/mendix-alternative.html`
  - `/workplace/microsoft365-alternative.html`
  - `/marketingautomation/hubspot-alternative.html`
  - Zoho One vs Odoo (PDF)
- CRM has a comparison hub `/crm/compare/` with salesforce, microsoft-dynamics, hubspot and creatio.
- Bookings has a buyer's guide: `/bookings/buyers-guide/bookings-vs-calendly-vs-acuity.html`.

**Anatomy:**

| Page | Structure | CTAs |
|---|---|---|
| CRM compare hub | Compare the top CRMs → price per user comparison → questions to ask → red flags → why Zoho → awards → testimonials → switch | Request free migration, See pricing, Try Zoho CRM |
| /crm/compare/salesforce.html | Breadcrumb "Compare > Salesforce"; H1 "Salesforce is complicated and costly"; price delta; 10-row feature comparison; 3 testimonials | Sign up free, Start quiz, **Switch now** (migration offer) |

**Why it matters (INFERRED):**
- Comparison pages capture **high-intent, bottom-of-funnel** searches ("X alternative", "X vs Y").
- They pair with **migration offers**.

**SEO implications:**
- They are product-owned, and URLs carry both brand names.
- Naming is inconsistent (`compare/x.html` vs `x-alternative.html`). ToyoApps should avoid that.

**Recommended ToyoApps comparison architecture:**

```
/compare/                                            Index of all comparisons
/products/[product]/compare/                         Product's comparison hub (exists as a product section)
/products/[product]/compare/[competitor]/            "[Product] vs [Competitor]": one URL per competitor
/compare/[product-a]-vs-[product-b]/                 ToyoApps vs ToyoApps (internal choice helper), only if two products overlap
```

Use one naming convention. Skip `/alternatives/[software]/` initially; it is the same intent as product-vs-competitor and would duplicate content.

**Content rule:** only make claims that can be verified and dated (pricing as of a date, feature presence). Add a "last reviewed" date field. Comparison pages carry legal risk if inaccurate.

---

## 20. Pricing

| Product | Plans | Free | Trial | Yearly discount | Comparison table | Add-ons | Enterprise / sales |
|---|---|---|---|---|---|---|---|
| CRM (IN) | Free (3 users) / Standard ₹800 / Professional ₹1,400 / Enterprise ₹2,400 / Ultimate ₹2,600 | Yes | Length NOT VERIFIED | "up to 34%" | Yes (contents NOT VERIFIED) | NOT VERIFIED | CRM Plus cross-sell; FAQ schema (9 Q&A) |
| Campaigns | Free / Standard / Professional (contact-tier based) | Yes | 14 days | 25% | Yes | WhatsApp, SMS, Dedicated IP | Custom quote; non-profit |
| Books (IN) | Free + Standard … Ultimate | Yes | 14 days | Monthly vs yearly | NOT VERIFIED | Users, autoscans, BillPay | NOT VERIFIED |
| People | Free / Essential / Professional / Premium / Enterprise | Yes | **30 days** | >20% | Yes + PDF | Support | Quote 500+; PeoplePlus |
| Projects | Free / Premium / Enterprise / Ultimate | Yes | 15 days | >15% | Yes | Resources, lite users | sales@ email |
| Desk (IN) | Free / Express / Standard / Professional / Enterprise | Yes | 15 days | up to 34% | **Separate page** /desk/pricing-comparison.html | Light users | Request quote |
| Analytics | Free / Basic / Standard / Premium / Enterprise / Dedicated | Yes | 15 days | 20% | NOT VERIFIED | Premium support | Custom compute |
| Mail | Free / Lite / Premium + Workplace tiers | Yes | 15 days | about 20% | Yes | Storage, WorkDrive | Workplace Enterprise |
| Inventory (IN) | Free / Standard / Premium / Plus / Enterprise | Yes | 14 days (extendable) | NOT VERIFIED | NOT VERIFIED | Users, orders, locations | Price calculator |
| Creator | Free / Standard / Professional / Enterprise + Flex | Yes | 15 days | >30% | Yes | Portal users, support | Flex plan (figures NOT VERIFIED) |
| Bookings | Free / Basic / Premium + Flex | Yes | 15 days | >25% | Yes | Workspaces, resources | Contact sales |

**Common:**
- A forever-free tier.
- A 14–15 day trial (People is the exception at 30).
- A monthly/yearly toggle with a yearly discount.
- A "Most popular" badge.
- A pricing FAQ.
- A plan comparison table.
- Add-ons.
- A top tier or "Flex" plan that routes to sales.

**Varies:**
- The pricing unit: per user, per contact, per organisation, or rows plus users.
- Regional currency and plans.
- Comparison inline vs on a separate page.
- Suite tiers mixed in.
- The URL: `pricing.html`, `pricing/`, `zoho{product}-pricing.html`.

**ToyoApps (Recommendation):** extend the `Pricing` model with:
- `billingPeriods: ("monthly"|"yearly")[]` and `yearlyDiscountLabel`
- `unit` (per user / per org / usage)
- `trialDays`
- `freePlan`
- `addOns[]`
- `comparison: { group, rows: { feature, values[] }[] }[]`
- `currency` and `asOf` date
- `faqs`

Render the comparison inline and collapse it on mobile. Put pricing at `/products/[product]/pricing` (already present) with **one** URL convention.

---

## 21. Resources

| Resource | Zoho location | Global / product | Host |
|---|---|---|---|
| Blog | /blog/ (categories e.g. /blog/crm/) and product blogs (/crm/home-blogs.html) | Both | www |
| Webinars | /crm/webinars/ (Live / On-demand / Sales leadership) | Product | www (registration on meeting.zohocorp.com) |
| eBooks / guides | /crm/resources/ebooks/ | Product | www |
| Videos / tutorials | /crm/resources/videos/, /crm/tutorials/ | Product | www |
| Case studies | /customers.html (global, filtered); /crm/customers/, /one/customers/{company}.html, /projects/case-studies/ | Both | www |
| Reports / analyst | /crm/gartner-crm-platform-mq.html | Product | www |
| Training / certification | /spark/, /crm/customer-success/, /inventory/academy/ | Both | www |
| Academy (general business education) | /academy/ | Global | www |
| Knowledge base / FAQ | help.zoho.com/portal/en/kb/{product} | Product | **help.zoho.com** |
| Documentation | /crm/help/ (on www); Books /books/help/ | Product | www |
| API docs | /crm/developer/docs/, /books/api/v3/ | Product | www |
| Community | help.zoho.com/portal/en/community/{product} | Product | **help.zoho.com** |
| Events | /events/ | Global | www |
| Product resource hub | /crm/resources/ ("Hi, how can we help?": 17 tiles) | Product | www |

**Pattern (INFERRED):** the **global** layer holds brand-level learning (blog, academy, events, customer stories). The **product** layer holds everything operational (webinars, ebooks, tutorials, docs, KB). The product resource hub is the single entry point that fans out to all of it.

---

## 22. Support & Documentation

| Layer | Zoho | Purpose |
|---|---|---|
| Marketing | www.zoho.com/{product}/ | Acquisition and conversion |
| Product docs | www.zoho.com/{product}/help/ (CRM: 5 categories with tree navigation) | Product usage |
| Knowledge base, FAQs, troubleshooting | help.zoho.com | Self-service support |
| Community | help.zoho.com/portal/en/community | Peer support |
| Training | /spark/, /{product}/customer-success/, academies | Enablement |
| Support contact | /contactus.html; "submit a ticket" from product resources | Assisted support |
| Status | status.zoho.com | Operations |
| Developer | /developer/, /{product}/developer/docs/ | API consumers |

**How ToyoApps should separate these (Recommendation):**
1. **Marketing site** (this Next.js app): products, features, pricing, solutions, industries, integrations, comparisons, blog and guides.
2. **Documentation**: a separate docs app or hosted docs tool (e.g. `docs.toyoapps.com/[product]/…`). It needs versioning, sidebar trees and search that marketing pages don't need. Link to it from `Product.docsUrl`, which already exists.
3. **Support / help centre**: a ticketing or KB system (e.g. `help.toyoapps.com`), linked from `Product.supportUrl` and `/support`.
4. **Status page**: separate (e.g. `status.toyoapps.com`) once products are live.

Marketing `/products/[product]/support` stays a **router page** (FAQs and links out), not a doc host. This matches the current implementation.

---

## 23. SEO Architecture

### 23.1 Observed head data (raw HTML)

| Page | Title | Canonical | JSON-LD | Visible breadcrumb |
|---|---|---|---|---|
| Home | "Zoho \| Cloud Software Suite for Businesses" | self | WebSite, SearchAction, Organization | No |
| All products | "Explore All Products \| Zoho" | self | none | No |
| CRM home | "Zoho CRM \| Top-rated Sales CRM Software by Customers" | /en-in/crm/ (geo) | Product, Offer, aggregateRating | No |
| CRM features | "Zoho CRM's full feature suite - built for scale, built for sales" | self | none | No |
| CRM pipeline | "Pipeline management for refined productivity" | self | none | Category > Feature (visible) |
| CRM pricing | "Zoho CRM Pricing and Editions - Free for 3 users" | self | **FAQPage (9 Q&A)** | No |
| Projects pricing | "Zoho Projects Pricing plans : Free for 5 users" | **zohoprojects-pricing.html** (≠ fetched URL) | none | No |
| Blog category | "Zoho CRM Archives - Zoho Blog" | /blog/crm | CollectionPage, **BreadcrumbList** | Yes |

### 23.2 Observed patterns

- **URLs:**
  - Product folder roots (`/crm/`), lowercase and hyphenated slugs.
  - `.html` leaf pages, folder hubs.
  - Maximum depth about 3 below the domain.
- **Duplicate URLs handled by canonical:** `/projects/pricing.html` → canonical `/projects/zohoprojects-pricing.html` (VERIFIED).
- **Regional copies:**
  - `/in/`, `/en-in/`, `/ae/`, `/au/`, `/uk/` …
  - Geo-served canonicals (`/en-in/crm/`) were seen.
  - **No hreflang in raw HTML** on sampled pages (VERIFIED absence in HTML; HTTP headers and sitemap alternates NOT VERIFIED).
- **Robots meta:** none on sampled pages. robots.txt blocks test folders, search, 404, some language paths and old help.
- **Sitemaps:**
  - robots.txt → `/sitemap-index.xml`, which holds **393–498 child sitemaps** (two fetches differed).
  - Organised per product, per section (help, kb) and per region.
  - CRM sitemap: **3,582 URLs** (counted).
- **Tracking parameters:**
  - Internal links carry `?source_from=` / `src=` / `ireft=`, and signups carry `plan=`.
  - These parameterised internal links rely on canonicals to avoid duplicates.
  - **ToyoApps should not copy this.** Use analytics events, not URL parameters, on internal links.
- **Structured data:**
  - Used selectively: Product + Offer + AggregateRating on the product home, FAQPage on pricing, BreadcrumbList only on the blog.
  - Not consistent across page types (OBSERVED).
- **Titles:**
  - Keyword-first, with "| Zoho {Product}" or "| Zoho" suffix.
  - H1s are benefit-led and differ from titles (VERIFIED on several feature pages).
- **Inconsistencies seen:**
  - Two H1s on CRM pricing.
  - Mixed pricing slugs.
  - A demo CTA on the finance vertical pointing to the automotive demo page.

These are the failure modes of hand-built pages, and a data-driven ToyoApps build avoids them by construction.

---

## 24. Internal Linking

### 24.1 Observed relationships (Zoho)

```
Global home ──► 6 flagship products, Zoho One, customers
All Products ──► every product (by category) ──► suites, marketplace, mobile, alternatives
Product home ──► feature-category hubs & key feature pages, pricing, verticals, migration, Bigin, privacy
Features hub ──► ~30 feature pages, pricing, signup
Category hub ──► its features, PREV/NEXT category, signup
Feature page ──► parent category hub, signup        (no siblings, no pricing: weak)
Vertical page ──► (features shown on-page), companion products, demo
Compare page ──► pricing, signup, migration
Integrations ──► marketplace (off-site), Flow, developer docs
Pricing ──► suite (CRM Plus), sister product (Bigin)
Product footer (Books/Inventory) ──► sibling finance apps, resources, free tools
```

Measured from raw HTML: CRM home has 28 body links, the features hub 31, and the pipeline feature page **only 3**.

### 24.2 Recommended ToyoApps linking model

Every link below is derived from data, so no hand-maintained link lists are needed:

| From | Must link to |
|---|---|
| Category | All its products · solutions touching those products · industries · resources |
| Product | Category · highlighted features → features hub · solutions · industries · integrations · pricing · comparisons · related products (explicit, then same category) · resources |
| Feature | Product · features hub · category hub · **3 sibling features** · pricing · primary CTA |
| Solution | Products (ordered) · the specific features used · industries · resources |
| Industry | Products · solutions · case studies · resources |
| Integration | Every ToyoApps product it works with · related integrations (same category) |
| Comparison | Product · pricing · migration/contact CTA |
| Resource | Products mentioned · industry · related resources |
| Every product page | Product footer (siblings in category) + global footer |

**Guardrail:** do not render a link block when its list is empty. The current templates already follow this.

---

## 25. User Journeys

| Journey | Zoho path (observed) | What works | ToyoApps lesson |
|---|---|---|---|
| **A. Search → Product → Features → Pricing → Trial** | Lands on keyword feature page (e.g. Gantt charts) → category hub → pricing → signup with `plan=` preset | Feature pages are SEO landing pages; signup preselects a plan; pricing is one click away everywhere | Write feature pages for real search intent; put the primary CTA and pricing link on every feature page |
| **B. Home → Products → Category → Product → Feature → CTA** | Home → "Explore all products" → category section (no page) → product → features hub → feature → signup | Fast catalog scan | ToyoApps adds real category pages to strengthen this path, which an unknown brand needs more than Zoho does |
| **C. Industry → Problem → Solution → Product → Pricing** | Product → /verticals/ → industry page → demo (pricing not linked directly from vertical pages) | Problem-first copy and named industry integrations | Global industry pages listing *several* products; link to pricing *and* contact |
| **D. Product → Integration → Ecosystem → Related product** | Product → integrations.html → marketplace (off-site) / Flow; footer → sibling apps | Breadth signal ("1,100+") | Keep integrations on-site as long as possible; show real ToyoApps↔ToyoApps connections in an ecosystem section |
| **E. Existing customer → Product → Support → Docs** | Product → resources hub ("Hi, how can we help?") → docs on www / KB on help.zoho.com / community | One hub routes to everything | `/products/[product]/support` as a router; docs and help in separate systems |

---

## 26. Conversion Strategy

| CTA | Where Zoho uses it (OBSERVED) |
|---|---|
| **Free signup / trial** ("Sign up for free", "Start my free trial", "Get Started") | Hero, product nav, closing band, every feature page, pricing plans; carries `plan=` preset and source attribution |
| **Demo** ("Request demo", "Get a demo", "Book a demo") | Hero secondary; **primary on industry pages** |
| **Watch video / Quick tour** | Hero secondary (CRM, Analytics, Creator) |
| **Demo account** ("Explore Demo Account") | Books, Inventory |
| **See pricing** | Hero secondary, features hub, closing band, compare pages |
| **Talk to an expert / Request callback / Contact sales** | Mail hero, verticals hub, enterprise, top-tier plans |
| **Migration** ("Switch now", "Request free migration") | Comparison pages, CRM home |
| **Plan finder quiz** | CRM home, compare page |
| **Cross-sell** | Suite tiers on pricing, product footer siblings, "Grow with Zoho" block |

**Recommended ToyoApps CTA hierarchy:**

1. **Primary (one per page):** the product's `primaryCta`. That is "Start free" or "Get started" when a self-serve app exists (`appUrl`), otherwise "Contact sales". Already data-driven.
2. **Secondary:** "See pricing" (when pricing exists) or "Book a demo" (when demo exists). Never both in the hero.
3. **Contextual tertiary:** "Explore {feature}" / "Learn more" inside sections.
4. **High-intent pages:** comparisons → "Switch to {Product}"; industries → "Talk to us about {industry}".
5. **Cross-sell:** related products and the product footer. Bundles come later (§12).
6. **Marketplace-specific:** "Publish your software" stays on its own path and never competes with buyer CTAs on product pages.

Add `cta` data fields: `primaryCta`, `secondaryCta`, `demoUrl`, `trialDays`.

---

## 27. Design System Study (principles only)

What makes about 60 Zoho products feel like one ecosystem (OBSERVED and INFERRED):

1. **A shared page frame.** The identical slot structure (global header → product header → body → product footer → global footer) is the strongest unifier.
2. **Layered CSS.** Common base CSS → product theme CSS → per-page CSS → per-locale CSS (VERIFIED from stylesheet paths). Products get identity through **one accent and an icon**, not a new design language.
3. **One brand typeface** across most product pages (a proprietary family on CRM). The Finance family uses a different stack, which shows the cost of template drift.
4. **Every product has an icon or logo mark** used in menus, OG images (`ogimage/{product}-logo.png`) and cards.
5. **Repeated section rhythm.** Hero → proof → pillars → AI → integrations → proof → mobile → FAQ → closing band, with the same CTA vocabulary.
6. **Product UI shown inside feature sections** rather than as abstract illustrations (INFERRED; image types NOT VERIFIED).

**Lessons for ToyoApps (not copying):**
- Keep the single design system and token file. It is already implemented.
- Give each product a data-driven `accent` and `logo`.
- Fix section rhythm in templates, not per page.
- Prevent "template families" from drifting by keeping one product template with optional sections.

---

## 28. Page Count Analysis

### VERIFIED
- Zoho states its product count as **45+, 50+, 55+ or 60+** depending on the page.
- Zoho does **not** publish a total website page count. Total page count is **NOT PUBLICLY DISCLOSED**.

### OBSERVED
- robots.txt points to `/sitemap-index.xml`, which listed **393** child sitemaps on one fetch and **498** on another (likely regional serving).
- `/crm/sitemap.xml` holds **3,582 `<loc>` URLs** (counted). This includes help and documentation URLs, not only marketing pages.
- Child sitemaps are split per product, per section (`/books/help/`, `/books/kb/`) and per region (`/ae/books/vat/`, `/au/invoice/`).
- 26 child sitemaps carry India prefixes and 16 carry UK prefixes.

### ESTIMATED (structural inference, not a count)
- If a meaningful share of the 393–498 child sitemaps are of similar scale to CRM's, the site holds **tens of thousands of URLs**.
- This is an order-of-magnitude inference only. **No exact total is claimed.**

### UNKNOWN
- The exact total of indexable pages.
- The split between marketing, help and regional duplicates.
- How many URLs are canonicalised away.

### How 55+ products produce thousands of pages
Each product site multiplies across:
- features (hub + category hubs + detail pages)
- industries
- comparisons
- integrations
- resources (webinars, ebooks, tutorials)
- help and KB articles
- developer docs
- customer stories
- campaign/theme pages
- **regional copies of all of the above**

Product count × depth × regions gives thousands of pages, and none of it is filler; each page serves a distinct search query or support need.

---

## 29. 20-Software ToyoApps Architecture (Recommendation)

```
ToyoApps
├── Home
├── Products (/products)
│   ├── Category landing pages (/products/category/[category]): 5–7 categories from the real audit
│   │   └── products (a product has 1 primary + 0–2 secondary categories)
│   └── All products (search + filters)
├── Product (/products/[product])
│   ├── Overview
│   ├── Features hub → Feature-category hubs → Feature detail
│   ├── Solutions / use cases (product view)
│   ├── Industries (product view)
│   ├── Integrations (product view)
│   ├── Pricing
│   ├── Compare (→ /products/[product]/compare/[competitor])
│   ├── Resources (product view)
│   ├── FAQs (on overview + pricing; FAQPage schema)
│   └── Support (router → docs.toyoapps.com / help.toyoapps.com)
├── Solutions (/solutions, /solutions/[solution]): cross-product
├── Industries (/industries, /industries/[industry]): cross-product
├── Integrations (/integrations, /integrations/[integration])
├── Compare (/compare): index of all comparisons
├── Resources (/resources/[type]/[slug]): blog, guides, tutorials, case studies, reports, updates
├── Publish (/publish): marketplace sellers (from the current toyoapps.com)
├── Company · Contact · Support · Legal
└── Later, only when data exists: Bundles · Mobile/Desktop apps · Partners · Customers hub
```

Product depth chain: **Product → Features → Feature Detail → Solutions → Industries → Use Cases → Integrations → Pricing → Comparisons → Resources → FAQs → Support.** Each link in the chain is a route that exists only when the product has data for it.

---

## 30. 1,000+ Page Scalability Model

**Assumptions:** only real content counts. "Small", "medium" and "large" describe the real depth of a product, not targets.

| Page type | Small product | Medium product | Large product |
|---|---|---|---|
| Overview + features hub + pricing + support + resources | 5 | 5 | 5 |
| Feature-category hubs | 0 | 4 | 10 |
| Feature detail pages | 3 | 15 | 50 |
| Product solutions / use cases | 2 | 6 | 15 |
| Product industry pages | 0 | 3 | 10 |
| Product integration pages | 1 | 5 | 20 |
| Competitor comparisons | 1 | 3 | 8 |
| Product-specific resources (guides, tutorials) | 3 | 10 | 30 |
| **Total per product** | **15** | **51** | **148** |

**Portfolio of 20 products:**

| Mix | Product pages |
|---|---|
| 10 small + 7 medium + 3 large | 150 + 357 + 444 = **951** |

**Plus global layers (real entities only):**

| Layer | Pages |
|---|---|
| Categories | 7 |
| Global solutions | 30 |
| Global industries | 12 |
| Integrations directory (unique tools) | 80 |
| Blog / guides / case studies | 150 |
| Hubs, company, legal | 25 |
| **Subtotal** | **≈ 304** |

**Total about 1,255 pages.**

**Growth scenarios:**

| Scenario | Approx. pages |
|---|---|
| Launch (20 products, mostly small, few resources) | ≈ 350–500 |
| Year 1 (content programme, 5 products deepen to medium) | ≈ 800 |
| Year 2 (3 large products, integrations directory, 150 resources) | ≈ 1,250 |
| 40 products at the same mix | ≈ 2,200+ |

**The rule that keeps this honest:** a page exists only if its entity has unique content and its own search or support intent. Feature pages require `body`, hubs require ≥ 1 item, and empty hubs are noindexed. All of this is already enforced in code.

---

## 31. Next.js Technical Architecture (Recommendation)

### 31.1 Route architecture

> These are **recommendations, not confirmed final URLs.** The current codebase status is shown in the right-hand column.

| Route | Purpose | Current status |
|---|---|---|
| `/products` | All products + search/filter | ✅ built |
| `/products/category/[category]` | Category landing | ✅ built |
| `/products/[product]` | Product overview | ✅ built |
| `/products/[product]/features` | Features hub | ✅ built |
| `/products/[product]/features/[feature]` | Feature detail (content-gated) | ✅ built |
| `/products/[product]/features/category/[featureCategory]` | Feature-category hub | ➕ add |
| `/products/[product]/[section]` (solutions, industries, integrations, pricing, compare, resources, support) | Product sub-pages (data-gated) | ✅ built |
| `/products/[product]/compare/[competitor]` | Product vs competitor | ➕ add |
| `/products/[product]/integrations/[integration]` | Product-specific integration (optional) | ➕ later |
| `/solutions`, `/solutions/[solution]` | Cross-product solutions | ✅ built |
| `/industries`, `/industries/[industry]` | Cross-product industries | ✅ built |
| `/integrations`, `/integrations/[integration]` | Integration directory | ✅ built |
| `/compare`, `/compare/[comparison]` | Comparison index / ToyoApps-vs-ToyoApps | ✅ built |
| `/resources`, `/resources/[type]`, `/resources/[type]/[slug]` | Resources | ✅ built |
| `/bundles/[bundle]` | Suites | ➕ later |

**Why `/products/[product]` rather than `/products/[category]/[product]`:**
- Zoho keeps product URLs flat (`/crm/`), and its products sit in several categories.
- Putting the category in the URL would force one category, break URLs when products are re-categorised, and make URLs longer.
- The category is shown in breadcrumbs and links instead.

### 31.2 Rendering
- Use static generation (`generateStaticParams`) with `dynamicParams = false` for all content routes.
- Move to ISR/on-demand revalidation when content moves to a CMS.
- Server components by default. Client components only for the mega menu, search/filter explorer, tabs and the pricing toggle.
- A single `buildMetadata()` for title, description, canonical, OG and noindex. Structured data per template: `SoftwareApplication` + `Offer` (product/pricing), `FAQPage`, `BreadcrumbList`, `ItemList` (hubs), `Article` (resources).
- `sitemap.ts` generated from the same data. Split it with `generateSitemaps()` per product once it passes several thousand URLs, mirroring Zoho's per-product sitemaps.
- **No tracking query parameters on internal links.** Use analytics events instead.

### 31.3 Content source
- **Now:** typed TypeScript files in `src/content`. This is already in place.
- **At about 50+ products or with non-developer editors:** move to a headless CMS behind the same `lib/catalog.ts` read API. Templates and routes don't change.

---

## 32. Data Model (Recommendation)

```
Category      { slug, name, tagline, description, icon, order, status, problems[], faqs[], seo }
Product       { id, slug, name, shortDescription, longDescription, status, featured,
                primaryCategory → Category, secondaryCategories[] → Category,
                logo, accent, heroImage, screenshots[], audience[], platforms[],
                benefits[], howItWorks[], featureCategories[] (FeatureCategory),
                features[] (Feature), pricing (Pricing), faqs[] (FAQ),
                solutions[] → Solution, industries[] → Industry, integrations[] → Integration,
                comparisons[] → Comparison, resources[] → Resource, customerStories[] → CustomerStory,
                relatedProducts[] → Product, connections[] (ProductConnection),
                primaryCta, secondaryCta, appUrl, demoUrl, docsUrl, supportUrl,
                publisher { name, firstParty: boolean }      ← marketplace distinction
                seo }
FeatureCategory { slug, name, description, order }
Feature       { slug, name, summary, category → FeatureCategory, body[], benefits[], media[],
                faqs[], highlight, hasPage, relatedFeatures[] → Feature, status, seo }
Solution      { slug, name, kind: problem|role|size|use-case, problem, approach, audience,
                products[] → Product, features[] → {product, feature}, industries[] → Industry,
                resources[] → Resource, faqs[], status, seo }
Industry      { slug, name, summary, icon, challenges[], products[] → Product,
                solutions[] → Solution, customerStories[] → CustomerStory, faqs[], status, seo }
Integration   { slug, name, vendor, logo, category, summary, products[] → Product,
                capabilities[], docsUrl, status, seo }
ProductConnection { from → Product, to → Product, description }   ← ToyoApps↔ToyoApps
Comparison    { slug, name, product → Product, competitor, rows[{criterion, values[]}],
                summary, lastReviewed (date), sources[], faqs[], status, seo }
Pricing       { currency, asOf, unit, billingPeriods[], yearlyDiscountLabel, trialDays,
                freePlan, plans[] (PricingPlan), addOns[], comparison[], note, faqs[] }
PricingPlan   { name, price, period, description, features[], cta, recommended, contactSales }
FAQ           { question, answer }
Resource      { slug, type, name, summary, body[], publishedAt, updatedAt, author,
                products[] → Product, industries[] → Industry, cover, status, seo }
CustomerStory { slug, company, logo, industry → Industry, products[] → Product,
                challenge, solution, results[] (verified only), quote, publishedAt, status, seo }
Bundle (later){ slug, name, members[] → Product, pricing, departments[], seo }
SEO (shared)  { seoTitle, seoDescription, seoKeywords[], canonicalUrl, ogImage }
```

**Relationships:**

```
Category 1─* Product (primary) · *─* (secondary)
Product 1─* Feature ─ *─1 FeatureCategory
Product *─* Solution · Industry · Integration · Resource · CustomerStory
Product 1─* Comparison
Product *─* Product (related, connections)
Solution *─* Industry
Bundle *─* Product
```

**Gaps against the current `src/content/types.ts`:**
- `secondaryCategories`, `platforms`, `connections`, `publisher`, `demoUrl`/`secondaryCta`
- `Feature.relatedFeatures`
- `Solution.kind`/`features`/`audience`
- `Comparison.product`/`competitor`/`lastReviewed`/`sources`
- richer `Pricing` fields
- the `CustomerStory` entity
- `Bundle` (later)

---

## 33. What ToyoApps Should Learn

- **Category-based product discovery.** Group by business function and allow multiple categories per product.
- **Product ecosystem.** A thin global shell around deep product sites, with stacked global and product navigation.
- **Deep product pages** using one skeleton with optional, data-driven sections.
- **Feature architecture.** Hub → category hub → detail, with pages only for features that have real search or explanation value.
- **Suites** (later), as the cross-product pricing and solution layer.
- **Cross-selling** through the product footer ("more in this category"), related products and suite tiers on pricing.
- **Product navigation.** A product sub-nav that lists only real sections, plus breadcrumbs on deep pages.
- **Resource ecosystem.** Global brand learning, product operational resources, and a product resource hub as the router.
- **Internal linking** derived from relationships.
- **Marketplace concept,** adapted to ToyoApps' own seller marketplace.
- **Alternatives.** Product-owned competitor pages plus a global index.
- **Global footer plus product footer.**
- **Per-product sitemaps** once the site scales.
- **Separating** marketing, docs, help and community.

## 34. What ToyoApps Should Not Copy

- Zoho's **visual design, colours, typography, copy, illustrations, layouts, animations, branding and product naming.**
- **Exact URL patterns.** Avoid `.html` suffixes, mixed folder vs file conventions, `zoho{product}-pricing.html`-style duplicates and `?source_from=` tracking on internal links.
- **Template drift** into separate "families" with different footers and fonts.
- **Inconsistent product counts** across pages. Generate counts from data.
- **Missing sibling links** on feature pages. ToyoApps should do better here.
- **Category-less discovery.** ToyoApps needs category landing pages because it doesn't have Zoho's brand pull.
- **Unverifiable claims** (user counts, ratings, "1,100+ integrations"). Use only numbers ToyoApps can prove.

---

## 35. Final Recommended ToyoApps Sitemap

```
/
/products
/products/category/[category]
/products/[product]
/products/[product]/features
/products/[product]/features/category/[featureCategory]      (when ≥3 features)
/products/[product]/features/[feature]                       (when body exists)
/products/[product]/solutions | industries | integrations | pricing | compare | resources | support   (when data exists)
/products/[product]/compare/[competitor]                     (when a verified comparison exists)
/solutions · /solutions/[solution]
/industries · /industries/[industry]
/integrations · /integrations/[integration]
/compare · /compare/[comparison]
/resources · /resources/[type] · /resources/[type]/[slug]
/publish · /company · /contact · /support · /legal/[doc]
Later: /bundles/[bundle] · /apps/[platform] · /customers · /partners
External: docs.toyoapps.com · help.toyoapps.com · status.toyoapps.com
```

---

## 36. Recommended Development Sequence

1. **Product audit (blocking).** Collect the real ~20 products: name, one-liner, audience, category, features, pricing, app URL, docs and support URLs. Derive the categories from this audit.
2. **Data model additions** (§32 gaps), done before content entry so no content has to be re-entered.
3. **Replace placeholders** with real products. Launch with overview, features hub, pricing and support for each product.
4. **Feature-category hubs and sibling links.**
5. **Real feature detail pages,** for the features with search demand. Start with the top 3–5 per product.
6. **Comparisons,** for products with clear competitors (verified, dated).
7. **Solutions and industries,** only where 2+ products genuinely apply.
8. **Integrations directory,** once real integrations exist.
9. **Resources programme** (guides, tutorials, case studies with verified results).
10. **Docs and help** on separate systems. **Bundles** when joint pricing exists. **Platform pages** when ≥ 3 products ship on a platform.

**Do not build initially:**
- bundles
- a partner programme
- mobile, desktop or extension catalogs
- a global customers hub without real stories
- alternatives pages without verified data
- `/alternatives/[software]` duplicates
- industry pages without industry-specific content
- any page created to raise page count

---

## 37. Final Conclusions

1. **Homepage:** a portal, not a product page. Clear ecosystem message, search, category discovery, 3–6 featured products, how the ecosystem works, proof (only when real), resources, one closing CTA. The current build already matches this.
2. **Categorising the 20 products:** 5–7 business-function categories derived from the audit. One primary category per product plus up to two secondary.
3. **Displaying products:** category-grouped cards with name, one-liner, category, main use case and key capabilities. The mega menu shows at most 4 per category plus "View all".
4. **Product pages:** one template, sections rendered only when data exists, product sub-nav plus product footer.
5. **Feature pages:** hub → category hub (≥ 3 features) → detail page (only with real content), with sibling links and a single primary CTA.
6. **Same number of pages per product? No.** Page count follows real depth.
7. **5 vs 100 features:** the same template. Thresholds decide what renders (§7).
8. **Product-specific navigation: yes.** A sticky sub-nav of existing sections.
9. **One global footer: yes,** on every page.
10. **Product-level footer as well: yes.** Explore · Resources · More in category, above the global footer.
11. **Solutions:** cross-product, problem-first, with a `kind` field covering use cases, roles and sizes.
12. **Industries:** global pages listing all relevant products, linked from product industry sections. Product-specific industry pages only with industry-specific content.
13. **Integrations:** a global directory by external tool with per-product views. ToyoApps↔ToyoApps connections modelled separately.
14. **Comparisons:** `/products/[product]/compare/[competitor]` plus a `/compare` index, verified and dated.
15. **Resources:** the global layer (blog, guides, case studies) tagged to products and industries, with a product resource hub as the router.
16. **Reaching 1,000+ pages:** depth × breadth from real entities (§30). About 1,250 is reachable with 20 products of mixed depth and an active content programme.
17. **Build first:** the product audit, data-model additions, real product launch pages, then feature depth.
18. **Do not build initially:** bundles, partner programme, platform catalogs, unverified comparisons or proof, or any page made to raise the count.

**Answer to the guiding question:**
- The best scalable architecture to learn from Zoho is a **data-driven global shell plus product shell**. Each product grows its own feature, comparison and resource depth through one shared template.
- Categories, solutions, industries and integrations act as **cross-cutting indexes over the product graph**, not as separate websites.
- ToyoApps should keep Zoho's *structure*, avoid its *inconsistencies*, add category landing pages because it is a new brand, and let page count follow real content.

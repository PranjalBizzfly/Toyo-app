# ToyoApps Software Product Inventory

**Research date:** 7 October 2026
**Method:** each product's official website was fetched directly (server HTML via `curl`, plus page summaries). Where a site renders only with JavaScript, its public JS bundle or public API was read and the finding is marked **[code]**.
**Primary architectural reference:** [ZOHO_COMPLETE_WEBSITE_STUDY_FOR_TOYOAPPS.md](ZOHO_COMPLETE_WEBSITE_STUDY_FOR_TOYOAPPS.md)
**Companion documents:**
- [Taxonomy](TOYOAPPS_PRODUCT_TAXONOMY.md)
- [URL architecture](TOYOAPPS_URL_ARCHITECTURE.md)
- [Source map](TOYOAPPS_PRODUCT_SOURCE_MAP.md)
- [Final architecture](TOYOAPPS_FINAL_SOFTWARE_ARCHITECTURE.md)

## Rules used

| Label | Meaning |
|---|---|
| **STATED** | Written on the product's public website (verbatim where quoted). |
| **[code]** | Found only in the site's public JavaScript or API, not as rendered marketing copy. Lower confidence. |
| **NOT STATED** | The site does not say. Nothing was filled in. |
| **NOT VERIFIED** | Could not be confirmed (blocked, login-only, contradictory). |

**Excluded from all lists:** stats, customer counts, customer logos and testimonials. No product site offered evidence that these are real. Several are clearly placeholders: "Acme HQ", "Northwind", "+91 98765 43210", "+91 9876543210", and "Lazarus Barros".

---

## 1. Summary table

| # | Product | Official site | What it does (one line) | Owner shown on site | Public marketing site | Inventory decision |
|---|---|---|---|---|---|---|
| 1 | **ZapBuzzer** | zapbuzzer.com | One-tap internal office requests (pantry, print, IT, facilities) routed to the right team | Not stated; Pune, India; legal pages contain "[FILL IN]" placeholders | Yes (one page) | **Include** |
| 2 | **Sibu** | getsibu.com | AI-assisted digital asset management (DAM) for creative/media teams | Not stated ("Sibu DAM") | Yes (JS-only) [code] | **Include** |
| 3 | **HRMagix** | hrmagix.com, app.hrmagix.com | All-in-one HR platform: attendance, leave, payroll, performance, lifecycle | Not stated; Pune, India; ZUZU calls it "our HR suite" | Yes (one page) | **Include** |
| 4 | **TrackySuite** | trackysuite.com | Practice-management and compliance tracking for Indian CA, CS and tax firms | "Stolvix Softwares" | Yes | **Include** |
| 5 | **Sizoru** | sizoru.com | Pay-per-report TAM/SAM/SOM market-sizing reports (India-focused) | "Stolvix" | Yes | **Include** |
| 6 | **ZUZU** | usezuzu.com | Time tracking and activity monitoring via a Windows agent, with AI reports | "A product of Bizzfly Business Automation" [code] | Yes (JS-only) [code] | **Include** |
| 7 | **GetBenj** | getbenj.com | AI marketing plans for a product, delivered as a PDF in about 60 s (India D2C) | "GetBenj Inc." | Yes (one page) | **Include** |
| 8 | **Fantom** ("Fantom Apps") | fantomapps.com | Business SIM-card management: recharges, call logs, messaging-app status | Not stated ("Fantom" / "SIM Manager") | Yes (JS-only) [code] | **Include, minimal copy** (site copy is placeholder-grade) |
| 9 | **Fleetras** | fleetras.com | Fleet dispatch and trip-cost tracking for Dubai operations | "Fleetras", Dubai, UAE | **No** (login wall; site is `noindex`) | **Hold as draft**: confirm it is sold publicly |
| 10 | **MeetingMind** | meeting.oxo1.com | AI meeting analysis: summaries, action items, decisions, meeting Q&A | Not stated (oxo1.com is an unrelated blog) | **No** (login-only app) | **Hold as draft**: no public copy |
| 11 | **Zorfly** | zorfly.com | Gamified five-minute daily communication and grammar training for teams | "Zorfly" | Yes (thin; pricing "being confirmed") | **Include** |
| 12 | **Tracksuit** | gotracksuit.com | NOT VERIFIED (site blocked all requests with HTTP 429 "Vercel Security Checkpoint") | NOT VERIFIED | NOT VERIFIED | **Pending verification**: kept as a draft record; site content not yet audited |
| 13 | **Cardizo** | cardizo.com | AI business-card scanner and contact relationship memory | Not stated; Enterprise CTA is `sales@bizzfly.com` | Yes | **Include** |
| 14 | **TaskMagic** | taskmagic.com | No-code app and browser automation | **"TaskMagic, Inc."**, Los Angeles, California | Yes | **Pending verification**: the site names a separate company; kept as a draft record until the business confirms the relationship |
| 15 | **SigChanger** | sigchanger.com | Gmail signature design and deployment for Google Workspace | Not stated | Yes | **Include** |
| 16 | **ODA7** (added 8 Oct 2026) | oda7.com | "Sales team OS": lead distribution, integrated dialer, attendance, payroll, incentives and gamification for large outbound sales floors | Not stated | Minimal (home, sign-in, sign-up only) | **Include** |

**Result:**
- 12 products are publishable now (ODA7 added 8 Oct 2026).
- 4 are **pending verification** and held as drafts (not public, not indexed):
  - Fleetras and MeetingMind: public-sale status to confirm.
  - TaskMagic and Tracksuit: relationship to ToyoApps to confirm.
- **No product has been removed or permanently excluded.** All 15 remain in this research and in the code registry.
- The brief mentions "~20 products". **15 were supplied**, so 5 or more slots are unknown and are not invented.

### Ownership signals (important for the business, not shown publicly)

| Group | Products | Evidence |
|---|---|---|
| Bizzfly Business Automation | ZUZU (explicit); HRMagix (cross-promoted by ZUZU); Cardizo (Bizzfly sales email) | [code] / STATED |
| Stolvix (Stolvix Softwares) | TrackySuite, Sizoru | STATED; both also load the same help widget |
| Not stated | ZapBuzzer, Sibu, GetBenj (GetBenj Inc.), Fantom, Fleetras, MeetingMind, Zorfly, SigChanger | — |
| Third party | TaskMagic, Inc. | STATED |
| Unknown | Tracksuit | Blocked |

No product site mentions "ToyoApps" or "Toyo Apps". The relationship between ToyoApps and these products must be confirmed by the business.

**Hint of a shared team (inference):**
- Sibu and MeetingMind both include an in-app "Our Other Products" page [code].
- ZapBuzzer and HRMagix share a Pune address and the same placeholder personas.

### Verification status (as of 7 October 2026)

| Product | Product facts | Relationship to ToyoApps | Public sale | Site status |
|---|---|---|---|---|
| Cardizo, GetBenj, Sibu, HRMagix, ZUZU, Zorfly, ZapBuzzer, SigChanger, Fantom, TrackySuite, Sizoru, ODA7 | VERIFIED from official sites (code-only where marked [code]) | **PENDING**: no site mentions ToyoApps | VERIFIED (public sign-up) | Live |
| Fleetras | Partly verified (login panel, privacy page) | **PENDING** | **PENDING** (login-only, noindex) | Draft |
| MeetingMind | [code] only | **PENDING** | **PENDING** (login-only, no marketing site) | Draft |
| TaskMagic | VERIFIED from official site; operator "TaskMagic, Inc." | **PENDING** | VERIFIED (public sign-up) | Draft |
| Tracksuit | NOT VERIFIED (site blocked) | **PENDING** | **PENDING** | Draft |

Nothing in this document or on the website asserts that ToyoApps owns any of these products. Parent-company names (Bizzfly, Stolvix, GetBenj Inc., TaskMagic, Inc.) are recorded only because each product's own site states them.

---

## 2. Product profiles

### 2.1 ZapBuzzer: zapbuzzer.com
- **Hero (STATED):** "Stop calling the pantry boy three times for one coffee." · Tagline: "The internal-request CRM your office should have had years ago." · Title: "ZapBuzzer — Press a button. Staff knows."
- **Purpose:** staff tap a request (coffee, prints, IT help, facilities, courier). It is routed to the right team, and the first person to accept owns it, with an SLA timer and escalation.
- **Audience:** offices "From 10-person studios to multi-floor HQs"; Enterprise "For groups & facility companies". India-centric.
- **Category (proposed):** Operations & IT → Workplace operations.
- **Features (8, "Eight things that make this not a glorified Telegram bot."):**
  1. Pantry catalogue
  2. Print room
  3. IT & facilities
  4. Multi-channel
  5. First-accept wins
  6. SLA & escalation
  7. Analytics + scorecard
  8. Roles & audit log
- **How it works (3):** Tap what you need → Right team gets pinged → First to accept owns it.
- **Mobile app (3):** Never miss a summon · One tap to call · Accept & track on the move.
- **Use cases (6 scenarios):**
  - coffee for the CEO
  - 24 colour prints
  - AC/facilities fix
  - courier pickup
  - HDMI/IT help
  - lunch for 12
- **Integrations / channels:** Telegram, WhatsApp, email, Google sign-in. Enterprise adds REST API + webhooks and SSO + SAML.
- **Platforms:** web and Android (direct APK). iOS NOT STATED.
- **Pricing (STATED, INR):**
  - Free: up to 10 staff, 1 location. The displayed price string renders incorrectly on the site.
  - **Pro ₹99 / seat / month.**
  - Enterprise "Custom".
  - "14-day free trial. No credit card."
- **Pages:** one page (`/` with anchors), `/privacy`, `/terms`, `/delete-account`, `/sign-in`, `/signup`. No sitemap or robots.txt.
- **Issues:** legal pages contain "[FILL IN …]" placeholders; contradictory "200+ / 500+" claims; placeholder client logos.

### 2.2 Sibu: getsibu.com [code]
- **Hero:** "The operating system for your creative library". Title: "… — Sibu DAM".
- **Purpose:** scan, index and organise every video, image and document across Drive, local servers and uploads. Search, comment and collaborate.
- **Audience:** video teams, marketing teams, agencies, brand teams ("Built for media teams — not generic file storage").
- **Category (proposed):** Sales & Marketing → Creative operations / DAM.
- **Feature groups (as on site):**

  | Group | Features |
  |---|---|
  | Core (9) | Auto-ingest from anywhere · AI-assisted tagging · Search by anything · Comments in context · Taxonomies that scale · Multi-tenant by design · Insightful analytics · Granular permissions · Built for speed |
  | AI (6) | Scene detection · Face grouping · OCR extraction · Semantic search · Duplicate detection · Auto collections |
  | Collaboration (4) | @-mentions · Approvals · Versioning · Activity history |
  | Developers (4) | REST API (OpenAPI 3.1) · SDKs (TypeScript, Python, Go) · Webhooks · CLI + API playground |
  | Migration (4) | Bulk import · Metadata preserved · Folder mapping · Onboarding included |
  | Performance (4) | Chunked uploads · CDN streaming · Edge previews · Sub-second index |
  | Security (8) | AES-256 at rest · SOC 2 Type II ready · GDPR + DPA · Audit logs everywhere · RBAC + tenant isolation · Backup redundancy · SSO + SCIM · Default-deny access |

- **How it works:** Connect → Ingest → Organise → Collaborate.
- **Integrations (STATED list):** Google Drive, Dropbox, OneDrive, AWS S3, Slack, Figma, Premiere Pro, After Effects, Zapier, Frame.io, Webhooks, REST API.
- **Platforms:** web (PWA). Self-host is available on Business/Enterprise (FAQ).
- **Pricing (USD; the live page loads prices from an API, so they may differ):**
  - Free $0
  - Pro $99/month (3-day trial)
  - Business $299/month
  - Enterprise (unpriced)
- **Pages:** `/`, `/features`, `/pricing`, `/about`, `/contact`. No sitemap, no legal pages.
- **Issues:** the H1 is not in server HTML (weak SEO); team names, logos and testimonials look like placeholders.

### 2.3 HRMagix: hrmagix.com · app.hrmagix.com
- **Hero (STATED):** "Smart HR for modern teams." · Title: "HRMagix — Modern HR, From Hire to Retire".
- **Purpose:** an all-in-one HRMS covering people, performance and payroll in one workspace.
- **Audience:** HR and people teams.
- **Category (proposed):** HR & People → HRMS.
- **Core features (6):**
  1. Smart attendance
  2. Leaves & holidays
  3. Automated payroll
  4. Performance & OKRs
  5. Recognition & rewards
  6. Lifecycle & onboarding
- **Modules (12):**
  1. Attendance & Shifts
  2. Leaves & Holidays
  3. Payroll
  4. Objectives & OKRs
  5. KRA & 9-Box
  6. PIPs & Growth
  7. Recognition
  8. 1-on-1s & Meetings
  9. Onboarding
  10. Documents
  11. Succession
  12. Analytics
- **Spotlights:**
  - Attendance: geo + selfie punch-in, auto shift and overtime, live presence board.
  - Performance: OKRs and KRAs, 1-on-1s, reviews and 9-box, kudos and culture wall.
- **Integrations:** NOT STATED. ZUZU lists an HRMagix attendance sync [code].
- **Pricing:** NOT STATED. "14-day free trial", "No credit card required".
- **Pages:** one page; footer About, Help centre and Privacy link to `#` (dead). The app is login-only.

### 2.4 TrackySuite: trackysuite.com
- **Hero (STATED):** "Your entire practice, in orbit around one system." · "The operations platform for India's CA, CS, and tax firms."
- **Owner:** "TrackySuite is built and operated by Stolvix Softwares."
- **Audience:** Indian CA, CS and tax firms carrying "dozens to hundreds of clients".
- **Category (proposed):** Finance & Compliance → Practice management.
- **Modules (10, "Everything your practice runs on."):**
  1. Compliance Calendar
  2. Practice Dashboard
  3. Task & Workflow
  4. Deadline Reminders
  5. Team Management
  6. Client Management
  7. Document Vault
  8. Audit Trail
  9. Client Portal
  10. Reports & Analytics
- **In the box:**
  - 110 statutory filings
  - 8 entity types
  - Statutory heads: GST · income tax · ROC/MCA · labour · FEMA/RBI
  - 14·7·3·1-day reminder ladder
  - Four-stage review pipeline
  - Excel import (up to 500 clients)
  - Mandatory 2FA for owners
- **Industry:** accounting / CA practices (India). **Integrations:** NOT STATED ("custom integrations on request").
- **Pricing (STATED, INR, + 18% GST; monthly / annual "save up to 11%"):**

  | Plan | Price | Limits |
  |---|---|---|
  | Solo | ₹900/month | 25 clients, 5 seats |
  | Practice | ₹1,800/month | 60 clients, 15 seats |
  | Firm ("Most chosen") | ₹3,600/month | 150 clients, 40 seats |
  | Multi-Partner | ₹6,750/month | 400 clients, unlimited seats |
  | Enterprise | Custom | 400+ clients |

  The prices shown are the discounted monthly figures. **Trial length conflicts on the site (7 vs 14 days).**
- **Pages (sitemap, 7 URLs):** `/`, `/about`, `/contact`, `/signup`, `/login`, `/privacy`, `/terms`.

### 2.5 Sizoru: sizoru.com
- **Hero (STATED):** "A defensible TAM, in three minutes — not three weeks." · Title: "Sizoru — Market sizing, fully measured".
- **Owner:** "Sizoru is a Stolvix product".
- **Audience:** founders (pre-seed to Series A), consultants and advisors, VCs and accelerators.
- **Category (proposed):** Insights & Research → Market research.
- **Capabilities ("Why trust it", 6):**
  1. Tier-rated source provenance
  2. Dual-method convergence test
  3. India 1/2/3 framework built in
  4. 3 free revisions / 30 days
  5. Pay after you see the preview
  6. Cited sources footnoted per report
- **Method:** top-down + bottom-up → Locked (<15% gap) / Range (15–40%) / Diagnostic (>40%). Bull/base/bear scenarios. Visible filter chain.
- **Deliverables:**
  - Print-ready PDF (~30 pages).
  - PPTX investor deck — "coming soon".
  - XLSX model — "coming soon".
- **How it works:** Sign up → Brief the engine (seven fields) → Pipeline runs (~3 min) → Download.
- **Pricing (STATED):** **₹4,999 / $59 per report.** No subscription. "Team & Studio plans returning with the full Sizoru suite".
- **Pages:** `/`, `/methodology` (11-section methodology page), `/sign-in`. `/privacy` and `/terms` return **404**; other paths are auth-gated.

### 2.6 ZUZU: usezuzu.com [code]
- **Hero:** "Know how the workday actually went." · Eyebrow: "Desktop agent + admin portal".
- **Owner:** "A product of Bizzfly Business Automation" (support@bizzfly.com).
- **Purpose:** a Windows desktop agent plus an admin/manager portal for time tracking, activity monitoring with on-device privacy redaction, and AI-written reports.
- **Audience:** organisations with admins and managers whose staff work on Windows desktops.
- **Category (proposed):** HR & People → Workforce analytics / time tracking.
- **Pillars:** Windows desktop agent · Admin portal · Manager workspace.
- **Value cards:** Capture with privacy built in · Reports already written · Scoped by permission.
- **Capabilities named [code]:**
  - screenshots with on-device redaction
  - activity heatmap
  - AI daily reports
  - AI productivity reports
  - AI executive summary
  - AI work review queue
  - anomaly alerts
  - agent shutdown/uninstall alerts
  - weekly/monthly team summary emails
  - natural-language analytics ("Ask")
  - audit trail with CSV export
  - holidays & schedules
- **Integrations:** HRMagix attendance sync [code; the bundle also says it is "not enabled on this platform yet"].
- **Platforms:** Windows agent only ("no macOS or Linux build"); web portal.
- **Pricing:** "7-day trial, up to 10 employees", "No card required". Paid = employees × per-employee price (value NOT STATED).
- **SEO issue:** the canonical points to app.usezuzu.com, so the marketing site is weak for search.

### 2.7 GetBenj: getbenj.com
- **Hero (STATED):** "One product in. A complete plan out." · Eyebrow: "AI Marketing Plans · Built for India".
- **Owner:** "© 2026 GetBenj Inc."
- **Audience:** "Built for Indian D2C — from a founder's first launch to an agency's hundredth"; founders, agencies, growth teams.
- **Category (proposed):** Sales & Marketing → Marketing planning.
- **Capabilities (9):**
  1. AI Buyer Persona
  2. Best-Market Detection
  3. Profit-Ranked Techniques
  4. Hyperlocal Ad Map
  5. Real Past Ads
  6. Real Media Outlets
  7. Ready-to-use Creatives
  8. Exact Budget Split
  9. Clean PDF Report
- **How it works (4):** Add your product → AI detects your buyer → AI builds the brief → Generate & export.
- **Channels planned for:** Google, Instagram, WhatsApp, Facebook, YouTube, LinkedIn. These are channels, not integrations. The site's logo strip (Zoom, Slack, Salesforce…) is **not** described as integrations and is excluded.
- **Pricing (STATED; "Pay per report or save with packs. No subscriptions."):**
  - Lite ₹499 / $6 (1 report)
  - Pro ₹1,999 / $24 (5 reports)
  - Agency ₹5,999 / $72 (20 reports)
  - "Get started free"
- **Pages:** `/`, `/login`, `/signup`. All other footer links are dead. No legal pages.

### 2.8 Fantom ("Fantom Apps"): fantomapps.com [code / public API]
- **Positioning:** "Fantom - Enterprise SIM Card Management Solution". The CMS siteName is "SIM Manager". Hero: "Manage All Your SIM Cards in One Place".
- **Purpose:** a cloud dashboard to manage company SIM inventory, recharges, call logs and WhatsApp/Telegram status.
- **Category (proposed):** Operations & IT → Telecom / device asset management.
- **Features (6):**
  1. SIM Management
  2. Recharge Tracking
  3. Smart Notifications
  4. Call Log Analytics
  5. Multi-User Access
  6. Secure & Reliable
- **Messaging-app tracking:** WhatsApp and Telegram status.
- **App modules [code]:** CCTV snapshot monitoring, WiFi monitoring, call automation, SMS logs, reports, audit logs.
- **Integrations:** WhatsApp, Telegram; payments via Razorpay. **Platforms:** web + Android app; Windows CCTV agent.
- **Pricing:** **excluded.** The API values look like test data (yearly price above 12× monthly), and the FAQ references a plan that doesn't exist. Only the "14-day free trial, no credit card" statement is used.
- **Issues:** placeholder phone/email, `#` social links, unverifiable stats and testimonials.

### 2.9 Fleetras: fleetras.com (draft)
- **Login panel (STATED):** "Every trip. Every dirham. Fully accounted." · "Fleet management, dispatch and trip cost tracking for Dubai city operations."
- **Features (3):**
  1. Dispatch and live trips
  2. Finished by the driver
  3. Cost per kilometre (fuel, Salik, parking, fines)
  - The privacy policy also mentions GPS tracking and driver records.
- **Category (proposed):** Operations & IT → Fleet & logistics. **Industry:** transport/fleet (Dubai).
- **Status:** login-only, accounts created by an administrator, site marked `noindex`. **Pricing:** NOT STATED.
- **Decision:** draft until the business confirms Fleetras is sold to outside customers.

### 2.10 MeetingMind: meeting.oxo1.com (draft) [code]
- **Purpose:** AI meeting analysis (summaries, action items, decisions), a Q&A assistant over meetings, plus projects, tasks and team workspace. Premium modules: AI PM, Client, Sales and Recruitment.
- **Category (proposed):** Insights & Research (meeting intelligence), with Productivity as the secondary fit.
- **Pricing [code]:** Free $0 (10 analyses/month), Pro $19, Premium $49. The billing period is unconfirmed.
- **Decision:** draft. There is no public marketing copy to reference, and the domain's root (oxo1.com) is an unrelated blog.

### 2.11 Zorfly: zorfly.com
- **Hero (STATED):** "Five minutes a day. Sharper comms forever." · "Communication training that doesn't feel like training."
- **Purpose:** one short daily mission to improve a team's written communication and grammar, with XP, badges, streaks and AI feedback.
- **Category (proposed):** HR & People → Learning & development.
- **Features:**
  - Your daily buzz (4): Five-minute lessons · AI coaching · Weakness reports · Team analytics.
  - Gamification: XP, badges, streaks, weakness profile.
  - Curriculum: "Eight grammar domains, ~250 curated questions".
- **Pricing (STATED, USD; "Final pricing is being confirmed"):**
  - Solo Bee $0 (free forever)
  - Hive Pro $9.99/seat/month (7-day trial)
  - Queen Bee custom (SSO/SAML on request)
- **Pages:** `/`, `/pricing`, `/login`, `/signup`, `/legal/terms`, `/legal/privacy` (both marked "being finalized").

### 2.12 Cardizo: cardizo.com
- **Hero (STATED):** "Never forget who gave you a business card again." · Title: "Cardizo — AI visiting card CRM".
- **Purpose:** scan visiting cards with AI, tag them by event, city and intent, search them, and reach out via WhatsApp or email with context.
- **Audience:** "From a solo founder to a 50-person business-development team".
- **Category (proposed):** Sales & Marketing → Contacts & relationships.
- **Features (6, "a relationship operating system"):**
  1. AI card scanning
  2. Tag-first memory
  3. WhatsApp + email outreach
  4. Relationship intelligence
  5. Sync everywhere
  6. Built for teams
- **Integrations / exports:** WhatsApp, Google Contacts, CSV/Excel/VCF export. AI extraction uses the customer's own Anthropic API key (FAQ).
- **Pricing (STATED, INR / month; yearly "save ~2 months"):**

  | Plan | Price | Users | Scans |
  |---|---|---|---|
  | Free | ₹0 | 5 | 50 scans/month |
  | Starter | ₹299 | 20 | 1,000 scans/month |
  | Professional | ₹999 | 100 | 5,000 scans/month |
  | Business | ₹2,999 | Unlimited | Unlimited |
  | Enterprise | Custom | — | — |

  Trial: "14-day Pro trial", "No card required".
- **Pages:** `/`, `/pricing`, `/sign-in`, `/sign-up`. Legal and about pages are behind the login.

### 2.13 SigChanger: sigchanger.com
- **Hero (STATED):** "Turn Gmail Into Brand Ambassadors" · "Design professional signatures once, deploy to your entire Google Workspace organisation instantly."
- **Audience:** Google Workspace admins, IT and brand teams; "perfect for regulated industries".
- **Category (proposed):** Operations & IT → IT administration (email signatures).
- **Features (16 on `/features`, 3 groups):**

  | Group | Features |
  |---|---|
  | Core Capabilities | Google Workspace Sync · Visual Signature Builder · One-Click Deployment · Scheduled Rollouts · AES-256-CBC Encryption · Brand-Locked Templates |
  | Automation At Scale | Real-Time Sync · Group Rules · Instant Updates · Smart Notifications |
  | Full Control | Asset Library · Privacy-First Security · Multi-Company Support · Admin Dashboard · Audit Logs · Global Deployment |

- **How it works (6):** Register your company → Connect Google Workspace → Import & sync users → Design your signature → Assign & schedule → Deploy instantly.
- **Integrations:** Google Workspace (Gmail API, Directory API).
- **Pricing (STATED):**

  | Plan | Price | Users | Templates |
  |---|---|---|---|
  | Free | $0 | 10 | 2 |
  | Basic | $29/month or ₹999/month | 50 | 10 |
  | Professional | $79/month or ₹2,999/month | 200 | 25 |
  | Enterprise | Custom | — | — |

  The free plan has "no time limit and no credit card required".
- **Pages:** `/`, `/about-us`, `/features`, `/pricing`, `/contact-us`, `/privacy-policy`, `/terms-of-service`. No sitemap.

### 2.14 Tracksuit: gotracksuit.com (PENDING VERIFICATION)
Every request returned HTTP 429 "Vercel Security Checkpoint". Nothing about the product was verified.

**Status:** pending verification. It is kept as a draft record (name and website only). It needs a successful audit of its site (for example, from a browser) and confirmation of its relationship to ToyoApps.

### 2.15 TaskMagic: taskmagic.com (PENDING VERIFICATION)
The site states "TaskMagic, Inc.", California law, Los Angeles. It is an AI no-code app and browser-automation product. **VERIFIED:** the site names "TaskMagic, Inc." as the operator.

**NOT VERIFIED:** whether, and how, TaskMagic relates to ToyoApps (owned, partnered, or a marketplace listing).

**Status:** pending verification. It is kept as a draft record with content from its own site. If it turns out to be a marketplace listing rather than a ToyoApps-owned product, it would be modelled with `publisher.firstParty = false`, without restructuring.

---

### 2.16 ODA7: oda7.com (added 8 October 2026)

**Pages available publicly:** `/`, `/sign-in`, `/sign-up` and `/forgot-password`. These are the only URLs in its sitemap. Every other path (`/pricing`, `/features`, `/about`, `/privacy`, `/terms`, `/blog`, `/docs` …) redirects to sign-in. The robots.txt blocks the app's internal routes.

**VERIFIED:**
- **Positioning:** title "oda7 — Sales team OS"; homepage text "Sales team OS."
- **Meta description (the only feature list):** "Lead distribution, auto-dialer, attendance, payroll, incentives and gamification — built for 1000+ agent sales floors."
- **Sign-in panel:** "One floor, a thousand agents, a hundred products — orchestrated." and "Lead distribution, integrated dialer, attendance, payroll and incentives — built for India's outbound sales engine rooms."
- **Sign-up flow:**
  - "Create your tenant, choose a plan, and go live in minutes."
  - The agency gets an admin account, a subscription and workspace access.
  - The admin picks a billing plan and pays with Razorpay.
  - Users register as a company. Google sign-in is offered.
- **Access model:** "Need access? Ask your workspace admin — they can invite you from Settings → Users."

**Category (proposed):** Sales & Marketing (primary). HR & People (secondary, because attendance and payroll are listed).

**Features (6, names only):** Lead distribution · Integrated dialer (auto-dialer) · Attendance · Payroll · Incentives · Gamification.
- The site gives no per-feature description.
- **No feature detail pages or feature-group pages are created.** That would require inventing how each feature works.
- They are listed on the overview and get pages automatically once ODA7 publishes real detail.

**NOT PUBLICLY AVAILABLE:** pricing and plan names, integrations, documentation, security or compliance information, customer names, screenshots, mobile apps.

**Deliberately excluded:**
- Sign-in panel statistics ("14.2M calls routed/yr", "38% avg pickup", "₹2.4Cr paid in incentives"). They are unverifiable.
- App route names in robots.txt (agents, dialer, campaigns, contests, heatmap, …). They are technical paths, not product descriptions.

**Ownership:** not stated. Relationship to ToyoApps is **pending verification**.

## 3. Cross-product observations

1. **Every product is a single-page or near-single-page marketing site.** Only SigChanger and Sibu have a separate features page, and only Sizoru has a separate deep-content page (methodology). No product has individual feature pages, industry pages, integration pages or a blog. This means the ToyoApps site will be the **deepest public source** about these products. It must not invent the missing depth (see the architecture document §6).
2. **Legal and SEO hygiene is weak across the portfolio:**
   - 9 of 13 reachable sites have no sitemap.
   - Several have no privacy or terms pages (Sibu, HRMagix, GetBenj, Sizoru 404, Cardizo login-walled).
   - ZapBuzzer's legal pages contain "[FILL IN]" placeholders.
   - This is a business risk that ToyoApps should not paper over.
3. **Market:** 9 of 13 are India-focused (INR, GST, Razorpay, Pune). Fleetras is UAE. Sibu, SigChanger, Zorfly and MeetingMind are USD-first. **Pricing must store currency per product.**
4. **Pricing models vary widely:** per seat, per user-tier, per report, per pack, per employee, and custom. The pricing model must support different units.
5. **AI is a common thread.** Cardizo, Sibu, ZUZU, GetBenj, Sizoru, Zorfly, MeetingMind and ZapBuzzer all use AI. This works as a cross-cutting "AI capability" theme, not as a category.
6. **Only one real cross-product connection is stated:** ZUZU → HRMagix (attendance sync; availability unclear).

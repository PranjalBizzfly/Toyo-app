# ToyoApps Product Source Map

**Purpose:** traces every piece of product content on the ToyoApps site to the public page it came from, so content can be re-verified and updated. It also records what is deliberately **not** used.
**Retrieved:** 7 October 2026. Re-verify prices before each release; pricing data carries an `asOf` date in code.

---

## 1. Source table

| Product | Official site | Sign-up / app URL used for CTA | Pages used as sources | Data file |
|---|---|---|---|---|
| Cardizo | https://cardizo.com/ | https://cardizo.com/sign-up | `/` (hero, 6 features, FAQ), `/pricing` (plans, trial, currency note) | `src/content/products/cardizo.ts` |
| GetBenj | https://getbenj.com/ | https://getbenj.com/signup | `/` (hero, capabilities, how it works, channels, pricing) | `…/getbenj.ts` |
| Sibu | https://getsibu.com/ | https://getsibu.com/signup | Public JS chunks for `/`, `/features`, `/pricing` [code] | `…/sibu.ts` |
| HRMagix | https://hrmagix.com/ | https://app.hrmagix.com/register | `/` (hero, features, modules, spotlights, trial line) | `…/hrmagix.ts` |
| ZUZU | https://usezuzu.com/ | https://usezuzu.com/trial | Public JS bundle [code] (hero, pillars, capabilities, trial terms, platform FAQ) | `…/zuzu.ts` |
| Zorfly | https://zorfly.com/ | https://zorfly.com/signup | `/`, `/pricing`, `/signup` | `…/zorfly.ts` |
| ZapBuzzer | https://zapbuzzer.com/ | https://zapbuzzer.com/signup | `/` (hero, how it works, 8 features, scenarios, pricing, app section) | `…/zapbuzzer.ts` |
| SigChanger | https://sigchanger.com/ | https://sigchanger.com/signup | `/`, `/features` (16 features, 3 groups), `/pricing`, `/about-us` | `…/sigchanger.ts` |
| ODA7 | https://oda7.com/ | https://oda7.com/sign-up | `/` (title, meta description), `/sign-in` (positioning panel, access model), `/sign-up` (onboarding flow), robots.txt, sitemap.xml (retrieved 8 Oct 2026) | `…/oda7.ts` |
| Fantom | https://fantomapps.com/ | https://fantomapps.com/register | Public landing-content API [code] (hero, 6 features, messaging tracking, trial FAQ) | `…/fantom.ts` |
| TrackySuite | https://trackysuite.com/ | https://trackysuite.com/signup | `/` (hero, 10 modules, in-the-box, pricing), `/about` (owner, pipeline, entity types) | `…/trackysuite.ts` |
| Sizoru | https://sizoru.com/ | https://sizoru.com/sign-in?mode=signup | `/` (hero, why-trust-it, how it works, pricing), `/methodology` | `…/sizoru.ts` |
| Fleetras (draft) | https://fleetras.com/ | — (admin-created accounts) | Login page panel, `/privacy` | `…/fleetras.ts` |
| MeetingMind (draft) | https://meeting.oxo1.com/ | https://meeting.oxo1.com/signup | Public JS bundle only [code] | `…/meetingmind.ts` |
| TaskMagic | https://taskmagic.com/ | https://taskmagic.com/ | `/` (hero, stack, use cases), `/terms` (operator) | `…/pending.ts` (draft) |

---

## 2. Field-level provenance

| Content field on ToyoApps | Source rule |
|---|---|
| `name` | Exact product name as on its site |
| `shortDescription` | **ToyoApps' own one-line summary** of the stated purpose. It is not the product's hero line, to avoid duplicate content |
| `tagline` | The product's own hero line, quoted and attributed visually as the product's promise |
| `primaryUseCase` | Derived from stated purpose and audience |
| `audience` | Only audiences the site names |
| `features[]` names | **Exact names from the site.** Feature groups follow the site's own grouping where one exists |
| `features[].summary` | Paraphrase of the site's one-line description; empty when the site gives none |
| `features[].body` | **Empty.** No product site has per-feature content, so no feature detail pages exist |
| `howItWorks` | Only when the site has an explicit steps section |
| `pricing` | Verbatim plan names and prices, with `currency`, `asOf: "2026-10-07"`, and a note where the site flags uncertainty |
| `integrations` | Only tools the site names as integrations or connected channels. Logo strips without an integration claim are excluded (GetBenj) |
| `platforms` | Only stated platforms |
| `faqs` | **Not copied.** Product FAQs belong to the product; ToyoApps shows them on the product's own site |
| Stats, testimonials, customer logos | **Never used** (see §3) |

---

## 3. Deliberately excluded content

| Product | Excluded | Reason |
|---|---|---|
| All | Customer counts, uptime %, "Trusted by N", testimonials, logos | Unverifiable. Several are clearly placeholders (Acme HQ, Northwind, "1XL Demo", placeholder phone numbers) |
| ZapBuzzer | "200+ offices", "500+ workplaces", pilot stats, Free plan price string | Contradictory or rendering bug |
| Sibu | "SOC 2 Type II ready" as a claim in ToyoApps copy | Readiness claim, not a certification. Kept only as the product's own feature name in its security group |
| HRMagix | "120+ companies", "9k+" | Unverifiable |
| TrackySuite | Testimonials; exact trial length | Trial length conflicts (7 vs 14 days), so it is shown as "Free trial available" |
| Sizoru | "% less than Mordor/GVR" comparisons; "Pass investor review or we redo it free" | Comparative or guarantee claims that are the product's to make |
| GetBenj | Logo strip (Zoom, Slack, Salesforce…) as integrations | The site never calls them integrations |
| Fantom | All pricing; stats; testimonials; contact details | Placeholder or test data |
| ZUZU | Price per employee; HRMagix sync as a live integration | Not stated; the bundle says the sync is "not enabled on this platform yet". Recorded as a product connection marked "listed by ZUZU" |
| MeetingMind | All copy | No public marketing page; the product is held as a draft |
| Fleetras | Everything beyond the 3 login-panel features | The site is `noindex` and login-only; the product is held as a draft |
| TaskMagic | Pricing, customer logos, press claims | Pending verification of the ToyoApps relationship; pricing would be added once confirmed |

---

## 4. Re-verification checklist (per release)

1. Fetch each official site and its pricing page and compare against `pricing.asOf`.
2. Check whether any product added a sitemap, feature pages, integrations or legal pages. These may unlock new ToyoApps pages.
3. Confirm with the business:
   - ownership of all products (only Stolvix and Bizzfly are stated)
   - TaskMagic status
   - whether Fleetras and MeetingMind are publicly sold
   - the 5+ missing products of the "~20"
4. Update `asOf` and this file.

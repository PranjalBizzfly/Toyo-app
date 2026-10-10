# ToyoApps — Inner-page image audit

Date: 2026-10-10. Scope: all 609 inner routes. The homepage is excluded and untouched. Browser audit at 1440px, DPR 2 (`scripts/image-audit.mjs`).

## Result

| Check | Result |
|---|---|
| Images rendered on inner pages | 33 distinct files |
| Remote / third-party URLs | 0 |
| Format | all WebP except the SVG app icon on the press kit |
| Natural width smaller than displayed width | 0 |
| Broken images | 0 |
| Missing alt | 0 (decorative images use `alt=""`) |

## Changes

| Was | Pages | Problem | Now |
|---|---|---|---|
| `features/feature-screen.webp` | 288 | Same Western stock office photo on every feature page; alt named the feature, not the photo | The feature's own capability visual (real content, no image file) |
| `features/item-hero.webp` | 169 | Same stock photo on every solution, industry, integration, resource and support detail page | The product's own photo (`products/{slug}/in-action.webp`), with alt text describing the photo |
| `features/item-screen.webp` | 157 | Same stock photo | A capability visual listing the page's real features |
| `features/group-hero.webp`, `group-feature.webp` | 39 | Same stock photos, 560px source shown at 480–976px | Product photo plus per-feature capability visuals |
| `products/*/spotlight-1..3.webp` (48 files) | 16 | Fake dashboard mock-ups with unsupported claims ("SOC2 Compliant", "99.98% SLA", "0 latency") | Removed; the real-content spotlight visual remains |
| `products/*/groups/*` (24 files), `product/spotlight-*` | 0 | Unused fake mock-ups | Deleted |
| `categories/insights-research.webp` | 1 | Fake product mock-up | Project photo: manager reviewing a report with an employee |
| `solutions/prepare-for-launch-and-fundraising.webp` | 2 | Fake mock-up ("Verified", "Immediate") | Project photo: founder presenting market-size charts to investors |
| `pool/p0–p7`, HRMagix `hero-a/b` and `card-*`, TrackySuite `photo-*` | — | Downloaded from Unsplash in an earlier session (third-party) | Replaced with project-owned photos; files deleted |
| Category hero alts | 5 | Generic ("enterprise software solutions and team workflows") | Each describes its photo (`src/lib/photos.ts`) |

## Remaining

- **Homepage (excluded on purpose):** `public/images/products/meetingmind/card.webp` is a copy of an Unsplash photo and is used only by the homepage product cards. It was left unchanged per the brief.
- **Repetition within a product:** each product's detail pages share that product's one photo (for example, the HRMagix photo appears on 54 HRMagix pages). It is always relevant to the product. Distinct per-page photos would need new original photography or image generation, which was not available here.
- **Other project folders:** not reachable, because this session is limited to the Toyo-app folder by organisation policy.
- **Provenance of earlier assets:** `products/*/in-action.webp`, `tile.webp`, `categories/*`, `company/*` and `solutions/*` came from earlier work. They do not match the third-party downloads checked here, but their original source is not recorded in the repo.

## Per-image list

| Image | Pages | Example page | Natural width | Max shown width | Alt text |
|---|--:|---|--:|--:|---|
| `/images/products/hrmagix/in-action.webp` | 54 | `/products/hrmagix` | 1280 | 1200 | "" / HR manager explaining a payslip to an employee at her desk |
| `/images/products/oda7/in-action.webp` | 51 | `/products/oda7` | 1280 | 1240 | Sales representative on a headset call in a busy sales office |
| `/images/products/sibu/in-action.webp` | 40 | `/products/sibu` | 1280 | 1240 | Video editor with headphones reviewing footage across two monitors in a studio |
| `/images/products/zapbuzzer/in-action.webp` | 26 | `/products/zapbuzzer` | 1280 | 1200 | Office assistant handing coffee to a colleague at her desk |
| `/images/products/sigchanger/in-action.webp` | 13 | `/products/sigchanger` | 1280 | 1200 | IT administrator working on a laptop in a bright office |
| `/images/products/sizoru/in-action.webp` | 11 | `/products/sizoru` | 1280 | 1240 | Founder presenting market-size charts to two investors |
| `/images/products/zuzu/in-action.webp` | 8 | `/products/hrmagix` | 1280 | 1200 | "" / Team lead walking colleagues through their work on a laptop |
| `/images/products/trackysuite/in-action.webp` | 8 | `/products/trackysuite` | 1280 | 1240 | Chartered accountant reviewing client tax files with a colleague |
| `/images/products/benj/in-action.webp` | 5 | `/products/getbenj` | 1280 | 1200 | Marketers planning a campaign with sticky notes on a glass wall |
| `/images/solutions/manage-your-people-from-hire-to-growth.webp` | 3 | `/products/hrmagix` | 1600 | 398 | "" / Manage your people from hire to growth cross-functional solution overview …(+1) |
| `/images/products/zorfly/in-action.webp` | 3 | `/products/hrmagix` | 1280 | 1240 | "" / Sales coach training two young sales representatives |
| `/images/categories/hr-people.webp` | 2 | `/products/category/hr-people` | 960 | 960 | HR manager walking a new hire through her onboarding papers and laptop / "" |
| `/images/products/cardizo/in-action.webp` | 2 | `/products/cardizo` | 1280 | 1200 | Businessman scanning a business card with his phone at a networking event |
| `/images/solutions/run-a-well-organised-office.webp` | 2 | `/solutions` | 1600 | 398 | Run a well-organised office cross-functional solution overview / Office manager handing a document to a collea |
| `/images/solutions/prepare-for-launch-and-fundraising.webp` | 2 | `/solutions` | 1280 | 398 | Prepare for launch and fundraising cross-functional solution overview / Founder presenting market-size charts  |
| `/images/company/publish-hero.webp` | 1 | `/publish` | 1376 | 1152 | Indian SaaS founder smiling in modern office after publishing software product |
| `/images/company/publish-steps.webp` | 1 | `/publish` | 1376 | 1152 | Indian software partners shaking hands to finalize SaaS marketplace publishing agreement |
| `/images/company/support-hero.webp` | 1 | `/support` | 1376 | 840 | Indian technical support specialist with headset smiling warmly at enterprise customer service desk |
| `/images/catalog/products-hero.webp` | 1 | `/products` | 1376 | 960 | Cross-functional technology team collaborating on software products in modern innovation hub |
| `/images/company/careers-hero.webp` | 1 | `/careers` | 1376 | 1152 | Enthusiastic Indian technology team collaborating happily in a modern corporate lounge |
| `/images/company/vendors-hero.webp` | 1 | `/vendors` | 1376 | 1152 | Indian SaaS founders onboarding their software product onto the ToyoApps marketplace |
| `/images/company/media-hero.webp` | 1 | `/media` | 1376 | 1152 | Corporate communications director reviewing press releases and news updates on digital tablet |
| `/images/categories/sales-marketing.webp` | 1 | `/products/category/sales-marketing` | 1376 | 960 | Indian sales manager guiding his team at their desks in a busy open-plan office |
| `/images/company/press-kit-hero.webp` | 1 | `/press-kit` | 1376 | 1152 | Brand identity designer reviewing color palettes, logo geometry, and typography specifications |
| `/icon.svg` | 1 | `/press-kit` | 136 | 120 | Toyo Apps app icon |
| `/images/categories/operations-it.webp` | 1 | `/products/category/operations-it` | 1376 | 960 | IT operations team reviewing system monitors in a network operations room |
| `/images/company/blog-hero.webp` | 1 | `/blog` | 1376 | 1152 | Indian technical writers collaborating on software documentation and guides in a sunlit tech office |
| `/images/categories/insights-research.webp` | 1 | `/products/category/insights-research` | 1280 | 960 | Manager reviewing an end-of-day report on a tablet with an employee |
| `/images/products/fantom/in-action.webp` | 1 | `/products/fantom` | 1280 | 1100 | Operations manager checking company phones and SIM cards laid out on her desk |
| `/images/products/zapbuzzer/tile.webp` | 1 | `/solutions/run-a-well-organised-office` | 800 | 318 | Facilities staff member delivering a document and a parcel to an employee's desk |
| `/images/products/fantom/tile.webp` | 1 | `/solutions/run-a-well-organised-office` | 800 | 318 | IT manager checking a company smartphone beside a tray of SIM cards |
| `/images/products/zuzu/tile.webp` | 1 | `/solutions/manage-people-from-hire-to-growth` | 800 | 318 | Manager reviewing his team's workday on a laptop in the evening |
| `/images/products/zorfly/tile.webp` | 1 | `/solutions/manage-people-from-hire-to-growth` | 800 | 318 | Employee practising spoken English with earphones, recording herself on her phone |

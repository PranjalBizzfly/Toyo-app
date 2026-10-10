# ToyoApps — Visual & Motion Audit

Date: 2026-10-09. Phases 1–2 of the visual upgrade: audit of the current site, study of the
supplied Zoho screen recording (`public/20261009-0458-19.6685194.mp4`, 3:08) and of live Zoho pages.

Method
- **Video:** frames extracted every 2 s (94 frames) and reviewed as contact sheets
  (`scripts/.ref/sheet-*.png`, git-ignored).
- **Live Zoho pages:** scroll-captured at 1440×900 with video recording
  (`scripts/.ref/zoho/`) and probed with `scripts/.ref/motion-probe.mjs`. The probe scrolls each page,
  then reads the **computed** `transition` and `animation` values and records which elements changed
  opacity or transform as they entered the viewport. All durations and easings below that are marked
  "measured" come from those computed values, not from eyeballing.
- **ToyoApps:** 576 sitemap routes; representative pages captured the same way (`scripts/.ref/ours/`).

---

## 1. What the video shows

The recording opens Zoho's **Products → Recent Launches** mega-menu and visits 12 product pages in turn,
returning to the menu between each one.

| Time | Page | Hero / identity | Notable sections |
|---|---|---|---|
| 0–16 s | Zia Chat | Dark navy hero with a glassy product mock and a play button | "Without vs with" comparison table; use-case card carousel; **curved light-to-dark section edge with a blue glow**; dark CTA; dark FAQ |
| 18–28 s | CPaaS | Near-black starfield; outlined headline badge | Four channel cards, each a live mini-UI (email, OTP digits, WhatsApp, voice waveform); alternating code panel + text rows on dark |
| 30–40 s | Voice | Warm peach gradient; human photo cut-outs on coloured shapes; sign-up form in the hero | World-map feature card; three photo cards; testimonial; **navy CTA band**; plain FAQ; light grey footer |
| 44–54 s | TouchPoint | Dark | Horizontal capability strip; alternating phone-mock rows; **hub diagram with dashed connector lines**; blue CTA band |
| 58–72 s | Fortify | Cream with a grid texture; serif headline; person photo with a glowing 3D shape | Tech logo row; capability accordion paired with a photo; maroon/navy split feature block |
| 78–84 s | Zia Agents | Purple/magenta-lit hero frame | **Vertical timeline line that draws downward with a glowing node**; testimonial on deep purple; mega footer |
| 90–104 s | Classes | Painted landscape illustration behind a product screenshot | Black "5 problems" band with **tabs**; image mosaic; full-bleed landscape CTA |
| 108–118 s | CommandCenter | White with a faint grid; photo inside a gradient frame with journey nodes | Navy feature band; journey-flow diagram; bar chart; navy CTA |
| 124–132 s | Linkthread | Deep green with yellow-green headline and a phone mock | **Pale yellow** feature section with photo collages; black stat cards |
| 136–144 s | Vertical Studio | Warm off-white; line illustration with a dashed flight path | **Dark green industry tab switcher** (Retail / Healthcare / Banking…); mint carousel cards |
| 150–178 s | Creator Plus | Navy radial glow; customer logos | **Sticky section tab bar with scroll-spy** (App Development → Feedback); saturated blue band; dark bands between light ones |
| 182–186 s | Projects Plus | Maroon/rose | **Pill marquee** of capabilities; rose gradient cards; maroon CTA panel |

**Main lesson from the video:** every product page has its own palette, hero composition and signature
interaction, while the chrome stays shared. That shared chrome is the slim product header (logo,
4–6 links, one solid CTA), the "support email + search + legal links" footer and the FAQ style. Pages
build rhythm by **alternating light and dark full-width bands** (roughly every 1–3 sections), not by
tinting everything one colour.

---

## 2. Motion — observed and measured

"Measured" means the value was read from computed styles on the live page. "Observed" means it was seen in
the video or captures, without a computed value. Nothing here is inferred beyond that.

| Element | Trigger | Motion | Duration | Easing | Source |
|---|---|---|---|---|---|
| Section headings, paragraphs, links, images | Enters viewport | Opacity 0→1, translateY 20px→0, **no blur**, staggered by class (`anim1…anim5`) | Opacity 0.7 s, transform 1 s | `cubic-bezier(.25,.46,.45,.94)` | Measured — zoho.com/crm |
| Feature blocks, images | Enters viewport | translateY 30–50px→0 (`fadeinup`) | 1 s | `cubic-bezier(.11,.16,.43,.86)` | Measured — /voice |
| Use-case cards | Enters viewport | Opacity 0→1, translateY 50px→0 | 0.45 s | ease | Measured — /ziachat |
| Hero copy / hero visual | Page load | `fadeInLeft` / `fadeInRight` | 0.6 s | ease | Measured — /fortify |
| Sequenced hero items | Page load | `seq-in` | 0.7 s | `cubic-bezier(.4,.14,.2,1)` | Measured — /touchpoint |
| Card hover | Hover | transform + box-shadow (+ CSS-var colour shift) | 0.35 s | ease | Measured — /ziachat, /touchpoint, /fortify |
| Buttons, links, nav items | Hover | background / colour | 0.2–0.25 s | ease | Measured — all pages |
| Dropdown / product header bar | Scroll / open | `zwc-slide-down-animate` | 0.3 s | ease-out | Measured — all pages |
| Accordion / FAQ | Click | height | 0.35 s | ease | Measured — /fortify |
| Carousel slides | Arrow click | Opacity crossfade | 0.5 s | ease | Measured — /crm |
| Logo / pill marquee | Continuous | Linear translateX loop | 42–45 s (20 s on home) | linear | Measured — /touchpoint, /fortify, home |
| Connector dashes in diagrams | Continuous | Dash offset flow | 1.1 s loop | linear | Measured — /touchpoint |
| Network nodes travelling on lines | Continuous | Node travel along path | 12 s loop | linear | Measured — /cpaas |
| Timeline line + glowing node | Scroll | Line draws downward, node follows | — | — | Observed — video 78–82 s (Zia Agents) |
| Sticky section tabs with scroll-spy | Scroll | Active tab outline moves to the section in view | — | — | Observed — video 150–174 s (Creator Plus) |
| Tabbed content (industries, problems) | Click | Panel swap | — | — | Observed — video 92 s (Classes), 138 s (Vertical Studio) |
| Curved section edge with glow | Static | — | — | — | Observed — video 10–12 s (Zia Chat) |
| Video thumbnail play button | Hover | — | — | — | Observed — video 4 s |

Not observed: page-to-page route transitions (every navigation in the video is a full page load),
scroll-jacking, parallax backgrounds, or blur on text.

---

## 3. ToyoApps today — findings

What already works: a tokenised palette taken from the logo (`globals.css`), separately designed
dark tokens, eight per-product colour themes (`product-themes.css`), a no-flash theme script,
a CSS + IntersectionObserver reveal layer (`motion.css`, `Motion.tsx`) that respects reduced motion
and hides nothing without JS, sticky product sub-navigation, and rich, verified content.

Why it looks less impressive than the reference:

1. **Every product overview is the same page.** HRMagix, Sibu, TaskMagic and Fleetras share one sequence:
   hero with a side "Get started" card → "Built for teams like yours" pills → "What is X?" →
   "Why teams choose X" (4 cards) → alternating feature rows → "Everything you need" grid →
   "Getting started" steps → photo → plans → related products. Only the tint changes. Zoho changes the
   **composition**, not just the colour.
2. **Tinted backgrounds turn olive and khaki.** `.pt` mixes 7–14% of the product colour into the whole
   page. With the gold, green and navy themes this produces beige-olive surfaces (HRMagix, Sibu and
   TaskMagic all look sand-coloured). The brief explicitly rules this out.
3. **No light/dark rhythm.** Pages stay in one pale tone from top to bottom. The only dark band is the
   footer, so sections blur together. Zoho alternates full-width dark and saturated bands.
4. **Hero lacks a product visual.** The hero is a headline beside a form-like card. Zoho heroes lead
   with a product mock, a person photo or a signature illustration.
5. **Motion vocabulary is off-reference.** Reveals use `blur(6px)` and a 28px rise (Zoho uses no blur
   and 20px). Hero icons float on infinite loops, the scroll cue bounces forever, buttons have a shine
   sweep and icons rotate on hover. Several of these are the "excessive" effects the brief asks to avoid.
6. **Weak section edges.** Same-colour neighbours with no curve, glow or band change.
7. **Inner pages are thin on visual explanation.** The feature page is a green hero, a stock photo, then
   text blocks; pricing is short and plain.
8. **CSS is spread across 15 files** with overlapping "zoho" layers (`*-zoho.css` on top of older files),
   which is where much of the inconsistency comes from.

---

## 4. Plan (phases 3–8)

1. **Tokens:** keep the logo palette (blue `#1E9CE5` / `#0F7BBE`, green `#7BC142`, yellow `#F5C842`,
   navy `#0F2235`). Add band surfaces (`--band-light`, `--band-tint`, `--band-dark`, `--band-brand`)
   for both themes. Stop tinting whole product pages; keep product colour for accents, the hero and
   one signature band.
2. **Motion:** align `motion.css` with the measured values (20px, 0.7 s/1 s, CRM easing, no blur),
   remove infinite decorative loops and the shine sweep, and add opt-in primitives: hero sequence,
   left/right pair reveal, draw-line timeline, scroll-spy tab bar, tab crossfade, dashed connector flow.
   All of them are disabled under `prefers-reduced-motion`.
3. **Chrome:** header slide-down on scroll (0.3 s), mega-menu entrance, shared CTA band, curved
   band edge.
4. **Product stories:** per-product "recipes" on the shared template (hero variant, band order,
   signature section) chosen from what each product actually does. Content stays as it is.
5. **Templates:** feature, hub, solution, industry, integration, pricing, security, compare,
   resources, support, search and company pages each get band rhythm and a layout matched to their purpose.
6. **Verify:** re-record with the same scripts at the same viewport, in light and dark, at
   320/375/390/414/768/1024/1440/1920 px, and write the motion-validation report.

---

## 5. Per-product reference mapping (implemented)

Each product takes its design approach from a **different** Zoho product site. ToyoApps colours,
original artwork (HTML/SVG, labelled with the product's own feature names) and the product's own
content are used throughout. No Zoho text, images or code. Source of truth: `src/lib/product-story.ts`.

| ToyoApps product | Zoho reference | Hero | Benefits | Spotlights | Signature | CTA |
|---|---|---|---|---|---|---|
| HRMagix | Voice | Warm split, coloured shapes behind people UI | Illustrated-header cards | Alternating split | Dark tab switcher | Brand band |
| Sibu | Zia Chat | Glass frame in perspective-grid room | Glass on dark, angled edge | Sticky scroll-spy tab bar | Drawn timeline | Glow |
| TaskMagic | CPaaS | Starfield, outlined name, 4 channel mini-UIs | Black outlined cards | Code panels on dark | Drawn timeline | Glow |
| Cardizo | TouchPoint | Ink split with phone, capability strip | Glass on dark | Phone rows | Connector hub | Brand band |
| Sizoru | Analytics | Warm paper with horizon | Warm cards | Sticky stacking panels | Connector hub | Panel |
| Fleetras | Vertical Studio | Off-white, dashed route path, huge type | Mint scrolling cards | Alternating split | Dark tab switcher | Brand band |
| SigChanger | Fortify | Cream grid, serif type, glow blob | Bordered grid | Accordion + sticky art | Connector hub | Panel |
| TrackySuite | Practice (was Classes) | Classes-style page until the Practice rebuild — see §8 | — | — | — | — |
| MeetingMind | Zia Agents | Lit frame, "Meet …" | Glass on dark | Alternating split | Drawn timeline | Glow |
| Fantom | Linkthread | Deep green, lime headline, phone | Black outlined cards | Alternating split | Connector hub | Brand band |
| ODA7 | Creator Plus | Navy radial glow, "works with" row | Glass on dark | Sticky scroll-spy tab bar | Dark tab switcher | Glow |
| GetBenj | Projects Plus | Gold centred + dark pill marquee | Warm cards | Alternating split | Drawn timeline | Panel |
| ZapBuzzer | CRM | Pastel mesh, huge blue type | Pastel tiles | Alternating split | Orbit rings ("360° view") | "Take … for a spin" |
| Zorfly | Flow | White split + glowing dark screen | Icon columns + black buttons | Alternating split | Navy dot-grid cards | Panel |
| ZUZU | CommandCenter | Grid, gradient frame with journey nodes | Bordered grid | Alternating split | Dark tab switcher | Brand band |

Inner pages (features hub, feature detail, pricing, solutions, industries, integrations, security,
compare, resources, support) inherit the product's look and hero treatment through the `ref-*`
class on the product wrapper (`product-refs.css`). Examples: grid room on Sibu, meadow strip on
TrackySuite, dashed route on Fleetras, serif type across SigChanger, paper horizon on Sizoru.

Shared chrome, as on zoho.com product sites: on product pages the global header scrolls away and
only the product header stays pinned.

## 6. Motion validation

Recorded with the same Playwright script, viewport (1440×900) and smooth-scroll sequence used for
the Zoho captures (`scripts/.ref/cap.mjs`, output in git-ignored `scripts/.ref/`, `.webm` per page).

| Reference pattern (measured) | ToyoApps implementation | Result |
|---|---|---|
| Scroll reveal: opacity .7s + 20px rise 1s, `cubic-bezier(.25,.46,.45,.94)`, no blur (CRM) | `motion.css` §1, `Motion.tsx` (once per element, staggered 80ms, cap 5) | Matches; old 28px + blur(6px) removed |
| Paired text/image from opposite sides (Fortify fadeInLeft/Right) | `data-reveal="left/right"` on spotlights | Matches |
| Hero sequence .7s `cubic-bezier(.4,.14,.2,1)` (TouchPoint) | `motion.css` §2 | Matches |
| Card hover .35s transform + shadow | `motion.css` §6, `.zs-benefit`, `.zs-glass` | Matches |
| Accordion height .35s (Fortify) | `details::details-content` (§8) | Chromium/modern browsers; instant elsewhere |
| Header slide-down .3s ease-out | `.anim-slide-down` | Available. Product header is pinned (no slide), as observed on the product pages in the video |
| Marquee 42s linear, pausable (TouchPoint/Fortify) | Audience ribbon, GetBenj pill band | Matches; paused on hover; static under reduced motion |
| Connector dash flow 1.1s linear (TouchPoint) | `.flow-line` in hub/flow art, only when on screen | Matches |
| Drawn timeline line (Zia Agents, observed) | `[data-draw]` 1.6s scaleY | Implemented; duration is a design choice (not measurable from video) |
| Sticky scroll-spy tab bar (Creator Plus, observed) | `SpotTabbar` | Verified in capture: active tab follows the section in view |
| Tab panel swap (Classes / Vertical Studio, observed) | `StoryTabs` + `[role=tabpanel]` .45s crossfade/slide | Implemented, keyboard arrows supported |
| Page transitions: none observed (full page loads) | Cross-document `@view-transition` fade (.18s/.28s), no overlay | Fast; no-op in browsers without support |

Removed as off-reference: infinite floating hero icons, bouncing scroll cue, button shine sweep,
icon rotate on hover, blur on reveals.

Limitations: the supplied video is a 30fps screen recording, so only computed values from the live pages
are used as measured durations. Timeline draw duration and tab crossfade are recommendations.
Before/after `.webm` recordings exist for home, HRMagix, Sibu, TaskMagic and the attendance feature page
(`scripts/.ref/ours` before, `scripts/.ref/new` and `scripts/.ref/v3` after).

## 7. Test results

- Typecheck: clean. Production build: succeeds; all routes prerender.
- Overflow + console errors: 0 issues across all 16 product overviews, features hub, pricing, feature
  detail, company, industry and home, at 320 / 375 / 390 / 414 / 768 / 1440 px, in light and dark.
  Fixed on the way: header overflowed by 57px at 320px (CTA now moves into the menu below 480px);
  related-card badges overflowed at 320px.
- `prefers-reduced-motion`: reveals, draws, marquees, caret and connector flows are all disabled; content is
  never hidden without JS.

---

## 8. TrackySuite reference change: Zoho Classes → Zoho Practice (2026-10-09)

**Mapping audit.** References in use before the change (one per product, `src/lib/product-story.ts`):
Voice, Zia Chat, CPaaS, TouchPoint, Analytics, Vertical Studio, Fortify, Classes (TrackySuite), Zia Agents,
Linkthread, Creator Plus, Projects Plus, CRM, Flow, CommandCenter, Creator. Zoho Practice was not assigned to
any product.

**Why Practice.** TrackySuite is practice management for CA, CS and tax firms: client records, statutory
compliance calendar, task workflow, document vault and client portal. Zoho Practice is Zoho's
practice-management product for accounting firms (clients, workpapers, client portal, tasks, timesheets,
compliance alerts). It is the closest functional match among unused Zoho products.
Official URL verified: https://www.zoho.com/practice/ (HTTP 200, 2026-10-09).

**Page study** (1440px, measured with `scripts/.ref/metrics.mjs` and `motion-probe.mjs`; capture in `scripts/.ref/prac/`):

| # | Section | Treatment |
|---|---|---|
| 1 | Hero | Pale lime-cream (`rgb 253 255 233`), centred "Loved by CAs" eyebrow, H1 52px/400, green solid + outline buttons; product dashboard in a deep-green rounded frame below |
| 2 | Webinar strip | Thin bordered bar under the dashboard |
| 3 | Spotlight | H2 36px/400 left-aligned; 4-column icon strip with dividers (Workpaper, Ledger, Client portal, Customization) and "Learn more" links |
| 4 | Testimonial | Full-width rounded photo card with dark gradient, quote overlaid left (opacity carousel, 0.5s) |
| 5 | Features | "Consolidate your practice into one platform": 3 pale-grey cards, each with a small product-UI mock at the bottom |
| 6 | Bento | Green feature tile (white text) with task-card mock, next to light tiles (timesheets, clients insights) with UI mocks |
| 7 | Tabs | "Make your practice perfect": underline tabs (Integrations / Tax alerts / Custom reports), text list left, UI card right |
| 8 | Pricing | Solid green band; cream free-plan card and white Standard/Premium card pair, monthly/yearly toggle |
| 9 | FAQ | Heading left, accordion right, off-white (`rgb 250 250 248`) |
| 10 | Support + community | Photo support card with contact links; community and ebook cards |
| 11 | CTA + footer | Black band, two buttons; row of related Zoho finance apps |

**Measured motion:** list slide-up `translateY(50px)→0`, `transform 0.5s ease-out` on scroll; testimonial crossfade
`opacity 0.5s`; header `zwc-slide-down-animate 0.3s ease-out`. No parallax and no infinite loops.

**Status:** the mapping now says Zoho Practice. TrackySuite still renders the Classes-style recipe built earlier until it is
rebuilt on the Practice structure above.

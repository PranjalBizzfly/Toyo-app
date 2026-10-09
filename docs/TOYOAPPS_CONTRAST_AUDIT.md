# ToyoApps — Text visibility & contrast audit

Date: 2026-10-09. Target: WCAG 2.2 AA — 4.5:1 for normal text, 3:1 for large text (≥ 24px, or ≥ 18.7px bold).

## Method

`scripts/contrast-audit.mjs` loads every route in **light and dark** at 1440px with the theme stored the way
the site stores it (`toyo-theme`). It forces every entrance and scroll animation to its **end state**: reveals,
staggers, drawn lines and hero sequences. It then measures every visible text node:

- **Foreground:** computed text colour, multiplied by the opacity of the element and all its ancestors (catches faded or animating text).
- **Background:** composited from the element upward through every ancestor background colour. Gradients are approximated by their colour stops, and `color(srgb …)` / `color-mix()` values are resolved.
- **Excluded:** gradient-filled text (`background-clip: text`, e.g. the logo wordmark) and screen-reader-only text. Neither can be measured this way.
- **Grouped:** failures are grouped by CSS selector and colour pair, so fixes go to the shared rule, not to individual pages.

Interactive states were checked visually in both themes: the products mega-menu open, the contact page, the mobile menu at 390px,
FAQ accordions opened, and tab panels.

## Results

| Run | Page loads | Failing text nodes | Distinct patterns |
|---|---:|---:|---:|
| Before (149-route sample, both themes) | 298 | 4,135 (light 3,804 · dark 331) | 104 |
| After fixes (sample) | 298 | 15 | 5 — all one verified false positive |
| Full site, all 610 routes × 2 themes (before the final batch of fixes) | 1,220 | 86 | 15 |
| **Final full run after all fixes (610 routes × 2 themes)** | **1,220** | **0** | **0** |

Pages checked: all 610 sitemap routes, including the homepage, catalog, 16 product overviews, feature hubs and detail pages,
feature groups, product pricing, security, solutions, industries, integrations, compare, resources and support pages and their
detail pages, global solution, industry, integration, resource and compare pages, company, careers, vendors, publish, contact,
support, media, press kit, blog, search and legal.

## Issues fixed (all in `src/app/contrast.css`, loaded last; root-cause rules, not per-page patches)

**Light theme**
- **Product-hero text no longer uses one colour for every hero.** Each hero now uses its own text tokens (`--hero-ink`, `--hero-ink-2`): dark ink on cream, white and sky heroes, and light ink on navy, green and blue heroes. This fixed eyebrows, breadcrumbs, the current crumb and "All features" links on feature heroes across every product (ratios were 1.0–1.8).
- **Breadcrumbs:** were faded on cream and yellow heroes (≈ 3.6:1). They are now full-strength `#2b4157` (≥ 7:1).
- **Homepage "How ToyoApps works":** the dark band had lost its background, leaving white text on white. The band is restored.
- **Band headings** on blue and navy full-width bands (feature-group bands, stat band, page heroes) were forced to dark ink by the heading layer. They are now white, with light kickers and lead text.
- **Homepage industry cards:** titles were invisible (white on white) because band rules whitened every `h3`. Cards now keep their own ink.
- **Small fixes:** the big "spin" CTA lead text, the GetBenj pill band, the dark plan strip, "Learn more" links inside tiles (they now follow the tile's own text colour), decorative step numerals (raised from 35% to 75% strength), the Sizoru spotlight list green, and hero chips on Fantom's green hero.

**Dark theme**
- **Homepage hero:** the "THE TOYOAPPS ECOSYSTEM" label, the "Browse Solutions" ghost button, the strip label and the "+ More" button.
- **Active top-nav item:** was `#0066ff` on navy (3.9:1); now `#66b2ff`.
- **Status tags on bright green and blue fills:** were white (1.9–2.5:1); now dark text.
- **Section kickers** outside bands now use `#8cd0ff`.

**Animations and overlays:** every check ran with animations at their end state, and the opacity of animating ancestors is included in each measurement.
Reveals are opacity and transform only, with no blur on text (see `motion.css`), so mid-animation text is never less legible than its final state.
With `prefers-reduced-motion`, nothing is hidden.

## Remaining / not verifiable automatically

- **False positive (verified visually):** "How X solves it" / "How X helps" headings on industry and solution detail pages (`.fz-intro__band`). The band is solid dark blue with white text. The audit averages a pale gradient stop into its background estimate, so it reports a failure that isn't real.
- **Text over photographs** (hero photo cards, mosaics, the TrackySuite/Practice photo card) can't be measured from CSS. These were checked by screenshot in both themes: each sits on a dark gradient scrim or a white panel.
- **Gradient-filled headings** (the logo wordmark, gradient accent words) were reviewed visually and are readable in both themes.
- **Contact:** the contact page has no form today (topic cards only), so there were no form labels, placeholders or validation messages to check.
- **Width:** contrast was audited at 1440px. Colours don't change by breakpoint, and mobile layouts were checked visually at 390px.

Re-run: `node scripts/contrast-audit.mjs http://localhost:3000 <routes.txt> scripts/.ref/contrast.json`.

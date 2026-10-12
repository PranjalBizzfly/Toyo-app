// Collects the rendered background colour of every product icon (.product-mark[data-product], span.product-card__logo[data-product])
// on every page, in light and dark mode, and reports products shown in more than one colour.
// Usage: node scripts/icon-color-audit.mjs <baseUrl> [--all]
import { chromium } from "playwright";
const base = (process.argv[2] || "http://localhost:3208").replace(/\/$/, "");
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!process.argv.includes("--all")) {
  const seen = new Set();
  urls = urls.filter((u) => {
    const parts = u.split("/").filter(Boolean);
    const key = parts.map((p, i) => (i === 0 || (parts[0] === "products" && i === 1) ? p : "*")).join("/");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const b = await chromium.launch();
const colors = {}; const lowC = new Set(); // `${theme}|${slug}` -> Map(color -> [where])
for (const theme of ["light", "dark"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  for (const u of urls) {
    try { await p.goto(base + u, { waitUntil: "domcontentloaded", timeout: 30000 }); } catch { continue; }
    await p.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
    const r = await p.evaluate(() => [...document.querySelectorAll(".product-mark[data-product], .product-mark--outline")]
      .filter((e) => e.getBoundingClientRect().width > 0)
      .map((e) => {
        const area = e.closest(".product-nav, .vh, .zs-hero, .fz-hero, header, footer, .zs-node--hub, .breadcrumbs, [class*=card], section");
        const cs = getComputedStyle(e); const outline = e.classList.contains("product-mark--outline"); const rgb = (c) => (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number); const L = (c) => { const [r, g, b] = rgb(c).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }; const cr = (a, b2) => { const x = L(a), y = L(b2); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }; const pageBg = (() => { let n = e.parentElement; while (n) { const c = getComputedStyle(n).backgroundColor; if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c; n = n.parentElement; } return "rgb(255, 255, 255)"; })(); return { contrast: Math.round(cr(outline ? pageBg : cs.backgroundColor, cs.color) * 10) / 10, slug: e.dataset.product ?? (e.closest("[href]")?.getAttribute("href") ?? "").split("/").pop(), bg: outline ? cs.color : cs.backgroundColor, where: area ? (area.className || area.tagName).toString().split(" ")[0] : "?" };
      }));
    for (const x of r) { if (x.contrast < 3) lowC.add(`${theme} ${x.slug} ${x.contrast} ${u}`);
      const k = `${theme}|${x.slug}`;
      const m = (colors[k] ||= new Map());
      (m.get(x.bg) ?? m.set(x.bg, new Set()).get(x.bg)).add(`${u} (${x.where})`);
    }
  }
  await p.close();
}
await b.close();
let bad = 0;
for (const [k, m] of Object.entries(colors)) {
  if (m.size > 1) {
    bad++;
    console.log(`MISMATCH ${k}`);
    for (const [c, w] of m) console.log(`   ${c}  ×${w.size}  e.g. ${[...w].slice(0, 3).join(", ")}`);
  }
}
console.log(`\n${urls.length} pages × 2 themes, ${Object.keys(colors).length} product/theme combos, ${bad} with mismatched icon colours, ${lowC.size} low-contrast marks`);

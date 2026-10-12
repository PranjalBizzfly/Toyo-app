// Responsive check: each page at several widths, light theme.
// Flags: page wider than the viewport (sideways scroll), visible elements extending past the
// right edge, and the mobile menu fitting the screen. Saves a screenshot per failing page/width.
import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.BASE ?? "http://localhost:5960";
const WIDTHS = [320, 375, 414, 768, 1024, 1440];
const inv = JSON.parse(fs.readFileSync("scripts/.compare/inventory.json", "utf8"));
const pick = (slug, type) => inv[slug]?.find((p) => p.type === type)?.url;
const PAGES = [
  "/", "/products", "/products/category/sales-and-marketing", "/solutions", "/industries", "/integrations", "/compare-products",
  "/resources", "/blog", "/support", "/search?q=sim", "/about-toyoapps", "/contact-us", "/careers", "/media-and-news", "/press-kit",
  "/publish-and-sell-your-saas", "/become-a-toyoapps-vendor", "/legal/privacy-policy",
  ...["oda7", "sibu", "fleetras", "taskmagix", "channel-partner-portal", "speechwright", "dizola", "warwi"].map((s) => `/products/${s}`),
  "/products/sibu/pricing", "/products/taskmagix/pricing", "/products/oda7/features", "/products/fleetras/security",
].filter(Boolean);
fs.mkdirSync("scripts/.compare/responsive", { recursive: true });
const b = await chromium.launch({ args: ["--disable-gpu"] });
const issues = [];
let checks = 0;
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  for (const u of PAGES) {
    const r = await p.goto(base + u, { waitUntil: "networkidle", timeout: 60000 }).catch(() => null);
    if (!r || r.status() >= 400) { issues.push(`${w}px ${u}: HTTP ${r?.status() ?? "no response"}`); continue; }
    await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")));
    await p.waitForTimeout(250);
    checks++;
    const res = await p.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const over = document.documentElement.scrollWidth - vw;
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.position === "fixed") continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4 || r.right <= vw + 1) continue;
        // ignore content inside a horizontally scrolling or clipping container (carousels, tables, marquees)
        let clipped = false;
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(o.overflowX)) { clipped = a.getBoundingClientRect().right <= vw + 1; if (clipped) break; } }
        if (clipped) continue;
        out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")} right=${Math.round(r.right)}`);
        if (out.length >= 3) break;
      }
      return { over, out };
    });
    if (res.over > 1 || res.out.length) {
      issues.push(`${w}px ${u}: page ${res.over > 1 ? `+${res.over}px wider` : "ok"}; ${res.out.join(", ")}`);
      await p.screenshot({ path: `scripts/.compare/responsive/${w}-${u.replace(/[^a-z0-9]+/gi, "_")}.png` });
    }
  }
  // Mobile menu fits the screen at phone/tablet widths.
  if (w < 1024) {
    await p.goto(base + "/", { waitUntil: "networkidle" });
    const btn = await p.$('button[aria-controls="mobile-nav"]');
    if (btn && (await btn.isVisible())) {
      await btn.click(); await p.waitForTimeout(300);
      const m = await p.$eval("#mobile-nav", (e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, b: r.bottom, vw: innerWidth, vh: innerHeight }; });
      if (m.l < 0 || m.r > m.vw || m.b > m.vh) issues.push(`${w}px mobile menu does not fit: ${JSON.stringify(m)}`);
    }
  }
  await ctx.close();
}
await b.close();
console.log(`page × width checks: ${checks} | issues: ${issues.length}`);
for (const i of issues) console.log("  " + i);

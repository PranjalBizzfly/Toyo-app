// Responsive audit: loads pages at many widths and reports layout faults.
// Usage: node scripts/responsive-audit.mjs <baseUrl> [--all] [--widths=320,390,...] [--theme=dark]
import { chromium } from "playwright";
import fs from "node:fs";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3190").replace(/\/$/, "");
const widths = (args.find((a) => a.startsWith("--widths=")) || "--widths=320,360,375,390,414,430,768,820,1024,1280,1366,1440,1600,1920").split("=")[1].split(",").map(Number);
const theme = (args.find((a) => a.startsWith("--theme=")) || "--theme=light").split("=")[1];
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!args.includes("--all")) {
  const seen = new Set();
  urls = urls.filter((u) => {
    const parts = u.split("/").filter(Boolean);
    if (parts[0] === "products" && parts.length <= 2) return true; // every product overview
    const key = parts.map((p, i) => (i === 0 ? p : "*")).join("/") + parts.length;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

let browser = await chromium.launch();
const hydration = new Set();
const found = {};
const add = (k, u, w) => ((found[k] ||= new Set()).add(`${u}@${w}`));
const CONC = 4;
let i = 0;
async function worker() {
  let ctx, page, n = 0;
  const fresh = async () => { try { await ctx?.close(); } catch {} ctx = await browser.newContext({ colorScheme: theme, reducedMotion: "reduce" }); page = await ctx.newPage(); page.on("pageerror", (e) => { if (/#418/.test(e.message)) hydration.add(new URL(page.url()).pathname); }); };
  await fresh();
  while (i < urls.length) {
    const u = urls[i++];
    if (++n % 15 === 0) await fresh();
    try {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 900 });
      try { await page.goto(base + u, { waitUntil: "domcontentloaded", timeout: 30000 }); } catch { continue; }
      await page.evaluate((t) => { document.documentElement.dataset.theme = t; document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in")); }, theme);
      await page.waitForTimeout(80);
      const r = await page.evaluate((w) => {
        const out = [];
        const d = (e) => e.tagName.toLowerCase() + (typeof e.className === "string" && e.className.trim() ? "." + e.className.trim().split(/\s+/).slice(0, 2).join(".") : "");
        const vis = (e) => { const s = getComputedStyle(e); return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05; };
        // 1. horizontal page scroll + culprit
        if (document.documentElement.scrollWidth > w + 1) {
          const c = [...document.querySelectorAll("body *")].filter((e) => vis(e) && e.getBoundingClientRect().right > w + 1 && e.getBoundingClientRect().width < w * 3 && ![...e.children].some((k) => k.getBoundingClientRect().right > w + 1));
          out.push(`overflow: ${c.slice(0, 2).map(d).join(" | ") || "unknown"}`);
        }
        // 2. text running off the screen (not inside horizontal scrollers)
        for (const e of document.querySelectorAll("main :is(h1,h2,h3,h4,p,li,a,button,span,label,td,th)")) {
          if (!vis(e) || ![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
          const r = e.getBoundingClientRect();
          if (r.width === 0) continue;
          let p = e.parentElement, scroller = false;
          while (p && p !== document.body) { const s = getComputedStyle(p); if (/(auto|scroll)/.test(s.overflowX)) { scroller = true; break; } p = p.parentElement; }
          if (scroller) continue;
          if (r.left < -2 || r.right > w + 2) out.push(`text-offscreen: ${d(e.parentElement)} > ${d(e)}`);
          // 3. clipped text (content wider than box with hidden overflow, no ellipsis)
          const s = getComputedStyle(e);
          if (e.scrollWidth > e.clientWidth + 2 && s.overflowX === "hidden" && s.textOverflow !== "ellipsis") out.push(`text-clipped: ${d(e)}`);
          // 4. tiny text
          if (parseFloat(s.fontSize) < 11.5 && !e.closest("[aria-hidden='true'], .sr-only")) out.push(`tiny-text(${s.fontSize}): ${d(e)}`);
        }
        // 5. small tap targets on touch widths
        if (w < 768) for (const e of document.querySelectorAll("button, a.btn, [role='tab'], input, select")) {
          if (!vis(e)) continue;
          const r = e.getBoundingClientRect();
          if (r.width && r.height && (r.height < 32 || r.width < 32)) out.push(`small-target(${Math.round(r.width)}x${Math.round(r.height)}): ${d(e)}`);
        }
        return [...new Set(out)];
      }, w);
      for (const k of r) add(k, u, w);
    }
    } catch (e) { add("audit-error: " + e.message.split(/\r?\n/)[0].slice(0, 60), u, 0); try { browser = browser.isConnected() ? browser : await chromium.launch(); } catch {} await fresh(); }
  }
  await ctx.close();
}
await Promise.all(Array.from({ length: CONC }, worker));
await browser.close();
const rows = Object.entries(found).map(([k, v]) => [k, [...v]]).sort((a, b) => b[1].length - a[1].length);
fs.mkdirSync("scripts/.compare", { recursive: true });
fs.writeFileSync(`scripts/.compare/responsive-${theme}.json`, JSON.stringify(Object.fromEntries(rows), null, 1));
console.log(`hydration #418 on ${hydration.size} pages: ${[...hydration].slice(0, 8).join(", ")}`);
console.log(`${urls.length} pages × ${widths.length} widths (${theme}): ${rows.length} issue types`);
for (const [k, v] of rows.slice(0, 60)) console.log(`${String(v.length).padStart(4)}  ${k}   e.g. ${v.slice(0, 3).join(", ")}`);

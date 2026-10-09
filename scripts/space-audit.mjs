// Whitespace audit: measures empty vertical space above, below and inside every
// page section, using the rendered layout. Usage:
//   node scripts/space-audit.mjs [baseUrl] [--width=1440] [--all] [--theme=dark]
import { chromium } from "playwright";
import fs from "node:fs";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3123").replace(/\/$/, "");
const width = Number((args.find((a) => a.startsWith("--width=")) || "--width=1440").split("=")[1]);
const theme = (args.find((a) => a.startsWith("--theme=")) || "--theme=light").split("=")[1];
const all = args.includes("--all");
const LIMIT = width < 700 ? 72 : 112; // empty band (px) considered excessive

const xml = await (await fetch(`${base}/sitemap.xml`)).text();
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!all) {
  // one page per route shape, plus every product overview
  const seen = new Set();
  urls = urls.filter((u) => {
    const parts = u.split("/").filter(Boolean);
    if (parts[0] === "products" && parts.length === 2) return true;
    const key = parts.map((p, i) => (i === 0 ? p : "*")).join("/") + ":" + parts.length;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce", colorScheme: theme });
const page = await ctx.newPage();
const findings = [];

for (const u of urls) {
  try {
    await page.goto(base + u, { waitUntil: "networkidle", timeout: 30000 });
  } catch { continue; }
  await page.evaluate((t) => { document.documentElement.dataset.theme = t; document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in")); }, theme);
  await page.waitForTimeout(150);
  const res = await page.evaluate((LIMIT) => {
    const sy = window.scrollY;
    const vis = (el) => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05;
    };
    const isContent = (el) => {
      if (["IMG", "SVG", "VIDEO", "CANVAS", "IFRAME", "INPUT", "BUTTON", "TEXTAREA", "SELECT", "PICTURE"].includes(el.tagName.toUpperCase())) return true;
      if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return true;
      const s = getComputedStyle(el);
      const h = el.getBoundingClientRect().height; const filled = s.backgroundImage !== "none" || (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== getComputedStyle(el.parentElement).backgroundColor) || parseFloat(s.borderTopWidth) > 0; return filled && h > 24 && h < 900 && el.getBoundingClientRect().width < window.innerWidth * 0.85;
    };
    const desc = (el) => {
      const c = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
      return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (c ? "." + c : "");
    };
    const main = document.querySelector("main") || document.body;
    // sections: deepest-first list of elements that are full-width bands
    let sections = [...main.querySelectorAll("section, footer, main > div > div, .pz > *")].filter((s) => {
      const r = s.getBoundingClientRect();
      return vis(s) && r.height > 60 && r.width > window.innerWidth * 0.9 && !s.parentElement.closest("section");
    });
    const out = [];
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      const rects = [...s.querySelectorAll("*")].filter((e) => vis(e) && isContent(e)).map((e) => e.getBoundingClientRect()).filter((x) => x.height > 0 && x.width > 0 && x.bottom > r.top && x.top < r.bottom);
      if (!rects.length) { out.push({ sel: desc(s), kind: "empty-section", px: Math.round(r.height), y: Math.round(r.top + sy) }); continue; }
      const top = Math.min(...rects.map((x) => x.top)) - r.top;
      const bottom = r.bottom - Math.max(...rects.map((x) => x.bottom));
      const cs = getComputedStyle(s);
      if (top > LIMIT) out.push({ sel: desc(s), kind: "top", px: Math.round(top), pad: cs.paddingTop, y: Math.round(r.top + sy) });
      if (bottom > LIMIT) out.push({ sel: desc(s), kind: "bottom", px: Math.round(bottom), pad: cs.paddingBottom, minH: cs.minHeight, y: Math.round(r.top + sy) });
      // internal gaps: merge intervals
      const iv = rects.map((x) => [x.top, x.bottom]).sort((a, b) => a[0] - b[0]);
      let end = iv[0][1];
      for (const [a, b] of iv.slice(1)) {
        if (a - end > LIMIT) {
          // find element that starts right after the gap
          const after = [...s.querySelectorAll("*")].find((e) => vis(e) && isContent(e) && Math.abs(e.getBoundingClientRect().top - a) < 1);
          let p = after; let chain = [];
          while (p && p !== s && chain.length < 4) { chain.push(desc(p)); p = p.parentElement; }
          out.push({ sel: desc(s), kind: "inner", px: Math.round(a - end), before: chain.reverse().join(" > "), y: Math.round(end + sy) });
        }
        end = Math.max(end, b);
      }
    }
    return out;
  }, LIMIT);
  for (const f of res) findings.push({ url: u, ...f });
  process.stdout.write(`${u} ${res.length}\n`);
}
await browser.close();
fs.mkdirSync("scripts/.compare", { recursive: true });
fs.writeFileSync(`scripts/.compare/space-${width}-${theme}.json`, JSON.stringify(findings, null, 1));
const bySel = {};
for (const f of findings) { const k = f.kind + " " + f.sel + (f.before ? " | " + f.before : ""); (bySel[k] ||= []).push(f.url + ":" + f.px); }
const sorted = Object.entries(bySel).sort((a, b) => b[1].length - a[1].length);
console.log(`\n${findings.length} findings across ${urls.length} pages`);
for (const [k, v] of sorted.slice(0, 80)) console.log(`${v.length}x ${k}  e.g. ${v.slice(0, 3).join(", ")}`);

// WCAG contrast audit across page types, light + dark.
// Text colour from computed style (incl. ancestor opacity); background from real
// screenshot pixels around each text box, so gradients/images/overlays count.
// Usage: node scripts/compare/contrast-audit.mjs [pagesFile]
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";

const base = process.env.BASE ?? "http://localhost:3100";
const PAGES = [
  "/", "/products", "/products/category/sales-marketing", "/solutions", "/solutions/run-a-well-organised-office", "/industries", "/integrations",
  "/search", "/search?q=pay", "/company", "/contact", "/publish", "/support", "/legal/privacy", "/blog", "/careers", "/media", "/press-kit", "/vendors", "/compare", "/resources",
  ...["zuzu", "sibu", "oda7", "trackysuite", "hrmagix", "cardizo", "fantom", "getbenj", "taskmagic", "sigchanger", "sizoru", "tracksuit", "zapbuzzer", "zorfly", "meetingmind", "fleetras"].map((s) => `/products/${s}`),
  "/products/oda7/features", "/products/sibu/features/search-by-anything", "/products/oda7/features/group/sales-execution", "/products/sibu/pricing", "/products/zuzu/security",
  "/products/oda7/resources", "/products/oda7/resources/leads-workflow", "/products/oda7/solutions/for-sales-managers", "/products/zuzu/support", "/products/oda7/integrations",
];
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const b = await chromium.launch();
const fails = {};
let checked = 0;
const unverifiable = new Set();
for (const theme of ["light", "dark"]) {
  for (const vw of [1440]) {
    for (const path of PAGES) {
      const ctx = await b.newContext({ viewport: { width: vw, height: 900 }, colorScheme: theme });
      const p = await ctx.newPage();
      const r = await p.goto(base + path, { waitUntil: "networkidle", timeout: 60000 }).catch(() => null);
      if (!r || r.status() >= 400) { unverifiable.add(`${path} (${r?.status() ?? "no response"})`); await ctx.close(); continue; }
      for (let y = 0; y < 20000; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(40); }
      await p.evaluate(() => { scrollTo(0, 0); document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")); });
      await p.waitForTimeout(2500); // let entrance animations finish
      const items = await p.evaluate(() => {
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        while (walker.nextNode()) {
          const n = walker.currentNode;
          if (!n.textContent.trim()) continue;
          const el = n.parentElement;
          if (!el || seen.has(el) || el.closest("script,style,noscript,svg,[aria-hidden=true],.sr-only,[hidden]")) continue;
          seen.add(el);
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || cs.display === "none") continue;
          const range = document.createRange(); range.selectNodeContents(n);
          const rect = range.getBoundingClientRect();
          if (rect.width < 2 || rect.height < 4) continue;
          let op = 1; for (let a = el; a; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity || "1");
          if (op < 0.05) continue; // fully faded decorative text
          // Skip text clipped out of view (off-screen carousel slides, focus-only skip link).
          let clipped = rect.bottom + scrollY < 0;
          for (let a = el.parentElement; a && !clipped; a = a.parentElement) {
            const o = getComputedStyle(a);
            if (/(hidden|auto|scroll|clip)/.test(o.overflowX + o.overflowY)) { const pr = a.getBoundingClientRect(); if (rect.right < pr.left + 2 || rect.left > pr.right - 2 || rect.bottom < pr.top + 2 || rect.top > pr.bottom - 2) clipped = true; }
          }
          if (clipped || el.closest(".skip-link")) continue;
          const gradText = cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || cs.color === "rgba(0, 0, 0, 0)";
          const cls = (el.className && typeof el.className === "string" ? el.className.split(/\s+/).slice(0, 2).join(".") : "") || el.tagName.toLowerCase();
          const parentCls = el.parentElement && typeof el.parentElement.className === "string" ? el.parentElement.className.split(/\s+/)[0] : "";
          out.push({ x: rect.left + scrollX, y: rect.top + scrollY, w: rect.width, h: rect.height, color: cs.webkitTextFillColor && !cs.webkitTextFillColor.startsWith("rgba(0, 0, 0, 0") ? cs.webkitTextFillColor : cs.color, op, size: parseFloat(cs.fontSize), weight: parseInt(cs.fontWeight), grad: gradText, key: `${parentCls ? parentCls + " > " : ""}${el.tagName.toLowerCase()}${cls && cls !== el.tagName.toLowerCase() ? "." + cls : ""}`, text: n.textContent.trim().slice(0, 40) });
        }
        return out;
      });
      // Measure in viewport-sized chunks (full-page captures past ~16k px render blank, and the
      // sticky header would cover text): each item is measured in the chunk where it sits fully
      // inside the viewport, below the sticky header band.
      const docH = await p.evaluate(() => document.documentElement.scrollHeight);
      const done = new Set();
      for (let top = 0; top < docH; top += 560) {
        await p.evaluate((t) => scrollTo(0, t), top);
        await p.waitForTimeout(160);
        const sy = await p.evaluate(() => scrollY);
        const shot = await p.screenshot();
        const img = sharp(shot);
        const meta = await img.metadata();
        const raw = await img.raw().toBuffer();
        const ch = meta.channels;
        const px = (x, y) => { x = Math.max(0, Math.min(meta.width - 1, Math.round(x))); y = Math.max(0, Math.min(meta.height - 1, Math.round(y - sy))); const i = (y * meta.width + x) * ch; return [raw[i], raw[i + 1], raw[i + 2]]; };
      for (const [idx, it] of items.entries()) {
        if (done.has(idx) || (sy > 0 && it.y < sy + 130) || it.y + it.h > sy + 890) continue;
        done.add(idx);
        if (it.grad) continue; // gradient-filled text checked visually
        const m = it.color.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 1];
        const alpha = (m[3] ?? 1) * it.op;
        // Background: pixels just outside the text box on four sides.
        const pts = [[it.x - 4, it.y + it.h / 2], [it.x + it.w + 4, it.y + it.h / 2], [it.x + it.w / 2, it.y - 3], [it.x + it.w / 2, it.y + it.h + 3], [it.x - 4, it.y - 3], [it.x + it.w + 4, it.y + it.h + 3]].map(([x, y]) => px(x, y));
        pts.sort((a, c) => lum(a) - lum(c));
        const bg = pts[Math.floor(pts.length / 2)];
        const fg = [0, 1, 2].map((k) => m[k] * alpha + bg[k] * (1 - alpha));
        const cr = ratio(fg, bg);
        const large = it.size >= 24 || (it.size >= 18.66 && it.weight >= 700);
        const need = large ? 3 : 4.5;
        checked++;
        if (cr < need) {
          const k = `${theme} | ${it.key}`;
          (fails[k] ??= { n: 0, min: 99, pages: new Set(), sample: "", need }).n++;
          const f = fails[k]; f.min = Math.min(f.min, cr); f.pages.add(path); if (!f.sample) f.sample = `"${it.text}" ${cr.toFixed(2)}:1 fg rgb(${fg.map(Math.round)}) bg rgb(${bg})`;
        }
      }
      }
      await ctx.close();
    }
  }
}
await b.close();
const rows = Object.entries(fails).sort((a, b) => b[1].n - a[1].n);
const report = [`checked text elements: ${checked}`, `failing selector groups: ${rows.length}`, `failing elements: ${rows.reduce((s, [, v]) => s + v.n, 0)}`, "", ...rows.map(([k, v]) => `${String(v.n).padStart(4)}  min ${v.min.toFixed(2)}/${v.need}  ${k}  [${[...v.pages].slice(0, 3).join(", ")}${v.pages.size > 3 ? ` +${v.pages.size - 3}` : ""}]  ${v.sample}`), "", `unverifiable: ${[...unverifiable].join(", ") || "none"}`];
fs.mkdirSync("scripts/.compare", { recursive: true });
fs.writeFileSync("scripts/.compare/contrast-report.txt", report.join("\n"));
console.log(report.slice(0, 3).join("\n"));
console.log(report.slice(4, 70).join("\n"));
console.log(report.at(-1));

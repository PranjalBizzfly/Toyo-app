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
if (process.env.PAGES_FILE) PAGES.splice(0, PAGES.length, ...fs.readFileSync(process.env.PAGES_FILE, "utf8").split(/\r?\n/).filter(Boolean));
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const b = await chromium.launch();
const fails = {};
let checked = 0;
let notMeasured = 0;
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
          el.dataset.cidx = String(out.length);
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
        // Live geometry at capture time: sticky/stacked cards move while scrolling, and a card
        // sliding over another covers its text. Measure only what is actually painted:
        // current text box, clipped to its overflow ancestors, and skip text another element covers.
        const live = await p.evaluate(() => {
          const res = {};
          for (const el of document.querySelectorAll("[data-cidx]")) {
            const n = [...el.childNodes].find((c) => c.nodeType === 3 && c.textContent.trim());
            if (!n) continue;
            const rg = document.createRange(); rg.selectNodeContents(n);
            const r = rg.getBoundingClientRect();
            if (r.bottom < 0 || r.top > innerHeight) continue;
            let cx1 = 0, cy1 = 0, cx2 = innerWidth, cy2 = innerHeight;
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
              const o = getComputedStyle(a);
              if (/(hidden|clip|auto|scroll)/.test(o.overflowX + o.overflowY)) { const pr = a.getBoundingClientRect(); const rad = Math.min(parseFloat(o.borderTopLeftRadius) || 0, pr.height / 2, pr.width / 2); /* rounded clip: keep samples inside the straight part of the shape */ cx1 = Math.max(cx1, pr.left + rad); cy1 = Math.max(cy1, pr.top); cx2 = Math.min(cx2, pr.right - rad); cy2 = Math.min(cy2, pr.bottom); }
            }
            const mx = Math.min(Math.max((Math.max(r.left, cx1) + Math.min(r.right, cx2)) / 2, 0), innerWidth - 1), my = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
            const hit = document.elementFromPoint(mx, my);
            const covered = !!hit && !el.contains(hit) && !hit.contains(el);
            res[el.dataset.cidx] = { x: r.left, y: r.top + scrollY, w: r.width, h: r.height, cx1, cy1: cy1 + scrollY, cx2, cy2: cy2 + scrollY, covered };
          }
          return res;
        });
      for (const [idx, it0] of items.entries()) {
        const lv = live[idx];
        if (!lv) continue;
        const it = { ...it0, x: lv.x, y: lv.y, w: lv.w, h: lv.h };
        if (done.has(idx) || (sy > 0 && it.y < sy + 130) || it.y + it.h > sy + 890) continue;
        if (lv.covered) continue; // another element is painted over this text right now; measured in a later chunk if uncovered
        done.add(idx);
        if (it.grad) continue; // gradient-filled text checked visually
        let m = it.color.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 1];
        // color(srgb r g b / a) uses 0–1 channels (color-mix output); scale to 0–255 like rgb().
        if (/^color\(srgb/.test(it.color)) m = [m[0] * 255, m[1] * 255, m[2] * 255, m[3] ?? 1];
        const alpha = (m[3] ?? 1) * it.op;
        // Background: pixels just outside the text box on four sides.
        const pts = [[it.x - 4, it.y + it.h / 2], [it.x + it.w + 4, it.y + it.h / 2], [it.x + it.w / 2, it.y - 3], [it.x + it.w / 2, it.y + it.h + 3], [it.x - 4, it.y - 3], [it.x + it.w + 4, it.y + it.h + 3]].map(([x, y]) => px(Math.min(Math.max(x, lv.cx1 + 1), lv.cx2 - 2), Math.min(Math.max(y, lv.cy1 + 1), lv.cy2 - 2)));
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
      notMeasured += items.length - done.size;
      await ctx.close();
    }
  }
}
await b.close();
const rows = Object.entries(fails).sort((a, b) => b[1].n - a[1].n);
const report = [`checked text elements: ${checked}`, `not measured (covered by another element or never fully in view): ${notMeasured}`, `failing selector groups: ${rows.length}`, `failing elements: ${rows.reduce((s, [, v]) => s + v.n, 0)}`, "", ...rows.map(([k, v]) => `${String(v.n).padStart(4)}  min ${v.min.toFixed(2)}/${v.need}  ${k}  [${[...v.pages].slice(0, 3).join(", ")}${v.pages.size > 3 ? ` +${v.pages.size - 3}` : ""}]  ${v.sample}`), "", `unverifiable: ${[...unverifiable].join(", ") || "none"}`];
fs.mkdirSync("scripts/.compare", { recursive: true });
fs.writeFileSync("scripts/.compare/contrast-report.txt", report.join("\n"));
console.log(report.slice(0, 3).join("\n"));
console.log(report.slice(4, 70).join("\n"));
console.log(report.at(-1));

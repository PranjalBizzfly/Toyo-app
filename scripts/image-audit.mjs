// Image audit (inner pages only): node scripts/image-audit.mjs <base> <routesFile> <out.json>
// For every rendered <img> and CSS background image: source, format, intrinsic vs displayed size
// (at DPR 2), remote or local, and alt text.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const [base, file, out = "scripts/.ref/images.json"] = process.argv.slice(2);
const routes = readFileSync(file, "utf8").split("\n").map((s) => s.trim()).filter((r) => r && r !== "/");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const all = [];
let next = 0;
async function worker() {
  const p = await ctx.newPage();
  while (next < routes.length) {
    const r = routes[next++];
    try {
      await p.goto(base + r, { waitUntil: "load", timeout: 90000 });
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 1200) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
      await p.waitForTimeout(300);
      const imgs = await p.evaluate(() => {
        const out = [];
        for (const i of document.querySelectorAll("img")) {
          const r = i.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          out.push({ kind: "img", src: i.currentSrc || i.src, alt: i.getAttribute("alt"), w: i.naturalWidth, h: i.naturalHeight, dw: Math.round(r.width), dh: Math.round(r.height), hidden: !!i.closest("[aria-hidden=true]") });
        }
        for (const e of document.querySelectorAll("main *")) {
          const bg = getComputedStyle(e).backgroundImage;
          const m = bg && bg.match(/url\("?([^")]+)"?\)/);
          if (!m) continue;
          const r = e.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          out.push({ kind: "bg", src: m[1], alt: null, dw: Math.round(r.width), dh: Math.round(r.height) });
        }
        return out;
      });
      for (const i of imgs) all.push({ route: r, ...i });
    } catch (e) { all.push({ route: r, error: e.message.slice(0, 80) }); }
  }
  await p.close();
}
await Promise.all(Array.from({ length: 6 }, worker));
await b.close();
writeFileSync(out, JSON.stringify(all));
console.log("routes", routes.length, "image uses", all.filter((x) => x.src).length);

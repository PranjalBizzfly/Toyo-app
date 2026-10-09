// Contrast audit: node scripts/contrast-audit.mjs <base> <routesFile> <out.json> [limit]
// Loads every route in light + dark, forces all reveal/entrance animations to their end
// state, and measures WCAG contrast for every visible text node against its effective
// background (solid colours; gradients approximated by their colour stops; text over
// photos is reported separately as "image" for visual review).
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const [base, file, out = "scripts/.ref/contrast.json", limit = "99999"] = process.argv.slice(2);
const routes = readFileSync(file, "utf8").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, +limit);
const b = await chromium.launch();
const results = [];
const jobs = routes.flatMap((r) => [["light", r], ["dark", r]]);
let next = 0;

async function worker() {
  const ctxs = {};
  for (const t of ["light", "dark"]) {
    ctxs[t] = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: t });
    await ctxs[t].addInitScript((theme) => { try { localStorage.setItem("toyo-theme", theme); } catch {} }, t);
  }
  const pages = { light: await ctxs.light.newPage(), dark: await ctxs.dark.newPage() };
  while (next < jobs.length) {
    const [theme, r] = jobs[next++];
    const p = pages[theme];
    try {
      await p.goto(base + r, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.evaluate((theme) => document.documentElement.setAttribute("data-theme", theme), theme);
      await p.addStyleTag({ content: "*,*::before,*::after{animation-delay:-60s!important;animation-duration:.001s!important;transition:none!important}[data-reveal]{opacity:1!important;transform:none!important}" });
      await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage],[data-draw]").forEach((e) => e.classList.add("is-in")));
      await p.waitForTimeout(150);
      const found = await p.evaluate(() => {
        const parse = (c) => {
          const s = c.match(/color\(srgb ([\d.e-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.e-]+))?\)/);
          if (s) return { r: +s[1] * 255, g: +s[2] * 255, b: +s[3] * 255, a: s[4] === undefined ? 1 : +s[4] };
          const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: v[0], g: v[1], b: v[2], a: v[3] ?? 1 }; };
        const lum = ({ r, g, b }) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
        const ratio = (a, c) => { const l1 = lum(a), l2 = lum(c); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
        const blend = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
        const stops = (img) => [...img.matchAll(/(?:rgba?|color)\([^)]+\)/g)].map((m) => parse(m[0])).filter((c) => c && c.a > 0.25);
        // Effective background: composite element backgrounds from the element upward.
        const bgOf = (el) => {
          const layers = [];
          let kind = "solid";
          for (let e = el; e; e = e.parentElement) {
            const cs = getComputedStyle(e);
            if (cs.backgroundImage && cs.backgroundImage !== "none") {
              if (/url\(/.test(cs.backgroundImage) && !/gradient/.test(cs.backgroundImage.split("url(")[0])) { kind = "image"; }
              const st = stops(cs.backgroundImage);
              if (st.length && kind !== "image") { const avg = st.reduce((s, c) => ({ r: s.r + c.r / st.length, g: s.g + c.g / st.length, b: s.b + c.b / st.length, a: 1 }), { r: 0, g: 0, b: 0, a: 1 }); layers.push({ ...avg, a: Math.max(...st.map((c) => c.a)) }); kind = kind === "solid" ? "gradient" : kind; }
            }
            const c = parse(cs.backgroundColor);
            if (c && c.a > 0) layers.push(c);
            if (c && c.a >= 0.99) break;
            if (e.tagName === "IMG" || e.tagName === "VIDEO") kind = "image";
          }
          let col = { r: 255, g: 255, b: 255, a: 1 };
          if (document.documentElement.getAttribute("data-theme") === "dark" && !layers.some((l) => l.a >= 0.99)) col = parse(getComputedStyle(document.body).backgroundColor) ?? { r: 7, g: 18, b: 29, a: 1 };
          for (const l of layers.reverse()) col = blend(l, col);
          return { col, kind };
        };
        const out = [];
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        const seen = new Set();
        while ((n = w.nextNode())) {
          const t = n.textContent.trim();
          if (t.length < 2) continue;
          const el = n.parentElement;
          if (!el || seen.has(el)) continue;
          seen.add(el);
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || cs.visibility === "hidden" || +cs.opacity === 0 || el.closest("[aria-hidden=true],script,style,noscript,svg,[hidden],details:not([open]) > :not(summary)")) continue;
          let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
          if (op < 0.05) continue;
          // Gradient-filled text and visually-hidden (screen-reader) text can't be measured this way.
          if (cs.webkitBackgroundClip === "text" || cs.backgroundClip === "text" || el.classList.contains("sr-only") || (r.width <= 2 && r.height <= 2)) continue;
          const fg = parse(cs.color); if (!fg) continue;
          const { col, kind } = bgOf(el);
          const fgEff = blend({ ...fg, a: fg.a * op }, col);
          const cr = ratio(fgEff, col);
          const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
          const large = size >= 24 || (size >= 18.66 && bold);
          const need = large ? 3 : 4.5;
          if (cr < need) {
            const path = [];
            for (let e = el; e && path.length < 3; e = e.parentElement) { const c = typeof e.className === "string" ? e.className.trim().split(/\s+/)[0] : ""; path.push(e.tagName.toLowerCase() + (c ? "." + c : "")); }
            out.push({ sel: path.reverse().join(" > "), text: t.slice(0, 40), ratio: +cr.toFixed(2), need, fg: cs.color, bg: `rgb(${col.r | 0},${col.g | 0},${col.b | 0})`, kind });
          }
        }
        return out;
      });
      results.push({ route: r, theme, fails: found });
    } catch (e) {
      results.push({ route: r, theme, error: e.message.slice(0, 80) });
    }
  }
  for (const c of Object.values(ctxs)) await c.close();
}
await Promise.all(Array.from({ length: 5 }, worker));
await b.close();
writeFileSync(out, JSON.stringify(results));
const agg = new Map();
for (const x of results) for (const f of x.fails ?? []) {
  const k = `${x.theme} | ${f.kind} | ${f.sel} | ${f.fg} on ${f.bg}`;
  const a = agg.get(k) ?? { n: 0, pages: new Set(), min: 99, text: f.text };
  a.n++; a.pages.add(x.route); a.min = Math.min(a.min, f.ratio); agg.set(k, a);
}
const sorted = [...agg].sort((a, z) => z[1].pages.size - a[1].pages.size);
console.log("page-theme runs", results.length, "errors", results.filter((x) => x.error).length, "failing text nodes", results.reduce((s, x) => s + (x.fails?.length ?? 0), 0), "distinct patterns", agg.size);
for (const [k, a] of sorted.slice(0, 60)) console.log(`${a.pages.size}p ${a.n}x min ${a.min} :: ${k} :: "${a.text}"`);

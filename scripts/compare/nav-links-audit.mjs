// Header / dropdown / product-nav / footer link audit: every internal link's label
// vs the destination page's own name (its H1, falling back to <title> before " | ").
import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.BASE ?? "http://localhost:3100";
const PRODUCTS = fs.readdirSync("src/content/products").filter((f) => f.endsWith(".ts") && !["index.ts", "pending.ts"].includes(f)).map((f) => "/products/" + (f === "getbenj.ts" ? "benj" : f.replace(".ts", "")));
const INNER = ["/products/sibu/features", "/products/sibu/pricing", "/products/oda7/features/group/x", "/legal/privacy-policy", "/resources", "/blog", "/support", "/compare-products", "/integrations", "/solutions", "/industries", "/careers", "/media-and-news", "/press-kit", "/about-toyoapps", "/contact-us"];
const SOURCES = ["/", ...PRODUCTS, ...INNER];
const b = await chromium.launch({ args: ["--disable-gpu"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const links = new Map(); // key href|label -> {where:Set}
for (const src of SOURCES) {
  await p.goto(base + src, { waitUntil: "networkidle" });
  // Open every header dropdown so its links are in the DOM.
  const triggers = await p.$$(".primary-nav__trigger[aria-expanded]");
  for (let i = 0; i < triggers.length; i++) {
    const t = (await p.$$(".primary-nav__trigger[aria-expanded]"))[i];
    await t.click().catch(() => {});
    await p.waitForTimeout(250);
    const found = await p.$$eval(".primary-nav a[href], .drop a[href], .mega a[href]", (as) => as.map((a) => ({ href: a.getAttribute("href"), label: a.textContent.replace(/\s+/g, " ").trim(), area: a.closest(".mega") ? "Products menu" : a.closest(".drop") ? "Header dropdown" : "Header" })));
    for (const f of found) { const k = `${f.href}|${f.label}`; (links.get(k) ?? links.set(k, { ...f, where: new Set() }).get(k)).where.add(src); }
    await p.keyboard.press("Escape");
  }
  const rest = await p.$$eval("header a[href], .product-nav a[href], footer a[href], main nav a[href], aside nav a[href], [role=tablist] a[href]", (as) => as.filter((a) => !a.closest("[aria-label*=readcrumb i], .breadcrumbs")).map((a) => ({ href: a.getAttribute("href"), label: a.textContent.replace(/\s+/g, " ").trim(), area: a.closest(".product-nav") ? "Product sub-header" : a.closest(".pfoot") ? "Product sub-footer" : a.closest("footer") ? "Site footer" : a.closest("main, aside") ? "Page sub-menu" : "Header" })));
  for (const f of rest) { const k = `${f.href}|${f.label}`; (links.get(k) ?? links.set(k, { ...f, where: new Set() }).get(k)).where.add(src); }
}
// Resolve destination names.
const dest = new Map();
const norm = (s) => s.toLowerCase().replace(/&amp;/g, "&").replace(/[’']/g, "'").replace(/\s+/g, " ").replace(/[.:]$/, "").trim();
const rows = [];
for (const l of links.values()) {
  if (!l.href || !l.href.startsWith("/") || !l.label) continue;
  const path = l.href.split("#")[0] || "/";
  if (!dest.has(path)) {
    const r = await p.goto(base + path, { waitUntil: "domcontentloaded" }).catch(() => null);
    const status = r?.status() ?? 0;
    const info = status < 400 ? await p.evaluate(() => ({ h1: document.querySelector("main h1")?.textContent.replace(/\s+/g, " ").trim() ?? "", title: document.title.split(" | ")[0].trim() })) : { h1: "", title: "" };
    dest.set(path, { status, ...info });
  }
  const d = dest.get(path);
  const anchor = l.href.includes("#");
  const ok = d.status < 400 && (anchor || norm(l.label) === norm(d.h1) || norm(l.label) === norm(d.title));
  rows.push({ ...l, where: [...l.where].join(","), status: d.status, h1: d.h1, title: d.title, ok, anchor });
}
await b.close();
const bad = rows.filter((r) => !r.ok);
const broken = rows.filter((r) => r.status >= 400);
const out = [`links checked: ${rows.length}`, `broken: ${broken.length}`, `label ≠ destination name: ${bad.length - broken.length}`, ""];
for (const r of bad.sort((a, c) => a.area.localeCompare(c.area))) out.push(`[${r.area}] "${r.label}" → ${r.href}  (${r.status})  page H1: "${r.h1}"  title: "${r.title}"`);
// URL vs name: the last path segment should be the link name as a slug.
const slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const loose = (s) => slug(s).replace(/-and-|-/g, "");
out.push("", "URL ≠ link name:");
for (const r of rows) {
  const seg = r.href.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? "";
  if (!seg || r.anchor || r.href.includes("?") || r.area === "Products menu") continue;
  if (loose(seg) !== loose(r.label)) out.push(`  [${r.area}] "${r.label}" → ${r.href}`);
}
fs.writeFileSync("scripts/.compare/nav-links-report.txt", out.join("\n"));
console.log(out.join("\n"));

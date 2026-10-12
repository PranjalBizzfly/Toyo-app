// Audit: every built page's displayed name vs its URL slug.
// Name = the page's <title> before " | " (the page name; product/brand suffix removed).
// Expected slug = slugify(name): lowercase, spaces → hyphens, "&" → "and", drop other punctuation (+ ' : etc), "/" → hyphen.
// Output: scripts/.compare/url-name-audit.json and a printed summary.
import fs from "node:fs";
import path from "node:path";
const root = ".next/server/app";
const slugify = (s) => s.toLowerCase()
  .replace(/&amp;/g, "&").replace(/&#x27;|&#39;|['’]/g, "")
  .replace(/&/g, " and ").replace(/\+/g, " ")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!f.endsWith(".segments") && !f.startsWith("_") && f !== "api") walk(p); }
    else if (f.endsWith(".html") && !f.startsWith("_")) files.push(p);
  }
})(root);
const rows = [];
for (const f of files) {
  const rel = path.relative(root, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel === "index" || rel.startsWith("_") || /(^|\/)(404|500)$/.test(rel)) continue;
  const url = "/" + rel;
  const html = fs.readFileSync(f, "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
  const robots = /<meta name="robots" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const name = title.split(" | ")[0].trim();
  const seg = url.split("/").pop();
  const parent = url.slice(0, url.length - seg.length);
  const expected = slugify(name);
  // Brand-only names (product overview) compare to the product slug; titles like "Sibu: ..." use the part before ":".
  const status = seg === expected ? "match" : "MISMATCH";
  rows.push({ url, name, title, seg, expected, expectedUrl: parent + expected, status, noindex: /noindex/.test(robots) });
}
rows.sort((a, b) => a.url.localeCompare(b.url));
fs.writeFileSync("scripts/.compare/url-name-audit.json", JSON.stringify(rows, null, 1));
const mm = rows.filter((r) => r.status !== "match");
const dupNames = Object.entries(rows.reduce((m, r) => ((m[r.expectedUrl] ??= []).push(r.url), m), {})).filter(([, v]) => v.length > 1);
console.log(`pages audited: ${rows.length} | match: ${rows.length - mm.length} | mismatch: ${mm.length} | expected-URL collisions: ${dupNames.length}`);
const byArea = {};
for (const r of mm) { const k = r.url.startsWith("/products/") ? r.url.split("/").slice(0, 3).join("/") : "/" + r.url.split("/")[1]; byArea[k] = (byArea[k] ?? 0) + 1; }
console.log(Object.entries(byArea).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join("\n"));

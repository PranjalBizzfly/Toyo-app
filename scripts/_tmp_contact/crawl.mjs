const base = process.argv[2] ?? "http://localhost:3122";
const strip = (u) => u.replace(/^https?:\/\/[^/]+/, "");
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => strip(m[1])));
const prodHtml = await (await fetch(base + "/products")).text();
for (const m of prodHtml.matchAll(/href="(\/products\/[a-z0-9-]+(?:\/[a-z0-9-]+)?)"/g)) urls.add(m[1]);
const ALLOWED = { type: ["product", "sales", "support", "vendor", "publish", "general", "other"], topic: ["vendor", "careers", "media"] };
const found = new Map(); // href -> pages
for (const u of urls) {
  const r = await fetch(base + u);
  if (r.status !== 200) continue;
  const html = await r.text();
  for (const m of html.matchAll(/href="([^"]*\/contact[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^https?:/.test(href) && !href.startsWith(base)) continue;
    if (!found.has(href)) found.set(href, new Set());
    found.get(href).add(u);
  }
  for (const m of html.matchAll(/href="(mailto:[^"]*)"/g)) console.log(`mailto on ${u}: ${m[1]}`);
}
let bad = 0;
const slugs = new Set([...prodHtml.matchAll(/href="\/products\/([a-z0-9-]+)"/g)].map((m) => m[1]));
for (const [href, pages] of [...found].sort()) {
  const url = new URL(href, base);
  const issues = [];
  if (url.pathname !== "/contact") issues.push("path");
  if (url.hash !== "#contact-form") issues.push("no #contact-form");
  for (const [k, v] of url.searchParams) {
    if (k === "product") { if (!slugs.has(v)) issues.push(`unknown product ${v}`); }
    else if (k === "role") {}
    else if (!ALLOWED[k]?.includes(v)) issues.push(`bad ${k}=${v}`);
  }
  const st = (await fetch(base + url.pathname + url.search)).status;
  if (st !== 200) issues.push(`status ${st}`);
  if (issues.length) bad++;
  console.log(`${issues.length ? "BAD " : "ok  "} ${href}  (${pages.size} pages, e.g. ${[...pages][0]}) ${issues.join("; ")}`);
}
console.log(`\n${urls.size} pages crawled, ${found.size} distinct /contact links, ${bad} bad`);

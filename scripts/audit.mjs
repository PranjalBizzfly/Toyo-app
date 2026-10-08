// Site-wide product architecture audit against a running server:
//   node scripts/audit.mjs [baseUrl]
// Checks every sitemap URL + every product page (incl. noindexed pending products):
//  - status 200, unique <title> and meta description, exactly one H1
//  - feature pages: required sections present, ≥3 capabilities/steps, source links point to the product's own domain
//  - every internal link on every audited page resolves (no 404s)
//  - sitemap contains no noindexed URLs; no placeholder/stat text leaks
const base = process.argv[2] ?? "http://localhost:3000";
const strip = (u) => u.replace(/^https?:\/\/[^/]+/, "");
const get = async (p) => {
  const r = await fetch(base + p, { redirect: "manual" });
  return { status: r.status, html: r.status === 200 ? await r.text() : "" };
};
const meta = (html, name) => html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1];
const title = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1];
const BAD = [/Product 0\d/, /Feature slot/, /\[FILL IN/, /Acme HQ/, /Northwind/, /Lorem ipsum/i, /14\.2M/, /₹2\.4Cr/];

// Main content of a feature/item page (FeaturePageTemplate / ProductItemTemplate):
// from the end of the hero header (fz-hero / fz-vhero) to the facts strip
// (container fz-facts: audiences, integrations, Source), which also excludes the
// "related" tiles that follow it. Returns "" when the structure isn't found.
const mainContent = (html) => {
  const hero = html.search(/<header class="fz-v?hero[\s"]/);
  if (hero < 0) return "";
  const start = html.indexOf("</header>", hero);
  let end = html.indexOf('class="container fz-facts"', start);
  if (end < 0) end = html.indexOf("<footer", start);
  return start < 0 || end < 0 ? "" : html.slice(start, end);
};

const problems = [];
const warn = (m) => problems.push(m);

// 1. Collect URLs: sitemap + every product (incl. pending) + their sub-pages via product nav
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const indexed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => strip(m[1])));
const productsHtml = (await get("/products")).html;
const productPaths = [...new Set([...productsHtml.matchAll(/href="(\/products\/[a-z0-9-]+)"/g)].map((m) => m[1]))].filter((p) => !p.startsWith("/products/category"));
const toVisit = new Set([...indexed, ...productPaths]);

const pages = new Map(); // path -> {status, html}
const queue = [...toVisit];
while (queue.length) {
  const p = queue.shift();
  if (pages.has(p)) continue;
  const res = await get(p);
  pages.set(p, res);
  // follow product-scoped links (sub-pages, feature pages) so pending products are audited too
  for (const m of res.html.matchAll(/href="(\/products\/[a-z0-9-]+\/[a-z0-9/-]+)"/g)) if (!pages.has(m[1])) queue.push(m[1]);
}

// 2. Per-page checks
const titles = new Map();
const descs = new Map();
const featurePages = [];
for (const [p, { status, html }] of pages) {
  if (status !== 200) {
    warn(`${p}: status ${status}`);
    continue;
  }
  const t = title(html);
  const d = meta(html, "description");
  const robots = meta(html, "robots") ?? "";
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) warn(`${p}: ${h1} <h1>`);
  if (indexed.has(p) && /noindex/.test(robots)) warn(`${p}: in sitemap but noindex`);
  for (const re of BAD) if (re.test(html)) warn(`${p}: contains forbidden text ${re}`);
  if (!/noindex/.test(robots)) {
    if (titles.has(t)) warn(`duplicate title "${t}": ${titles.get(t)} & ${p}`);
    else titles.set(t, p);
    if (descs.has(d)) warn(`duplicate description: ${descs.get(d)} & ${p}`);
    else descs.set(d, p);
  }
  if (/^\/products\/[^/]+\/features\/(?!group\/)[^/]+$/.test(p)) featurePages.push([p, html]);
}

// 3. Feature page quality
const productDomain = {};
for (const pp of productPaths) {
  const html = pages.get(pp)?.html ?? "";
  const m = html.match(/Continues on <strong>([^<]+)<\/strong>/);
  if (m) productDomain[pp.split("/")[2]] = m[1];
}
const perProduct = {};
for (const [p, html] of featurePages) {
  const slug = p.split("/")[2];
  perProduct[slug] = (perProduct[slug] ?? 0) + 1;
  if (!/id="what"/.test(html)) warn(`${p}: missing "What is" section`);
  const main = mainContent(html);
  const items = (main.match(/<li/g) ?? []).length;
  if (items < 3) warn(`${p}: only ${items} capability/step items`);
  const srcBlock = html.slice(html.indexOf(">Source<"), html.indexOf(">Source<") + 1500);
  const hosts = [...srcBlock.matchAll(/href="https?:\/\/([^/"]+)/g)].map((m) => m[1].replace(/^www\./, ""));
  if (!hosts.length) warn(`${p}: no official source links`);
  const dom = productDomain[slug];
  // Official preview sites supplied by the product owners count as official sources.
  const extra = { hrmagix: "hrmagix-website.vercel.app", sibu: "sibu-website.vercel.app", zapbuzzer: "zapbuzzer-website.vercel.app", oda7: "oda7-website.vercel.app" }[slug];
  for (const h of hosts) if (dom && h !== extra && !h.endsWith(dom.replace(/^www\./, "")) && !dom.endsWith(h)) warn(`${p}: source ${h} is not the product's own domain (${dom})`);
}

// 3b. Product-scoped detail pages (solutions/industries/integrations/compare/resources/support)
const ITEM = /^\/products\/[^/]+\/(solutions|industries|integrations|compare|resources|support)\/[^/]+$/;
for (const [p, { html }] of pages) {
  if (!ITEM.test(p) || !html) continue;
  const main = mainContent(html);
  const items = (main.match(/<li/g) ?? []).length + (main.match(/<tr/g) ?? []).length;
  const paras = (main.match(/<p[\s>]/g) ?? []).length;
  if (items < 4) warn(`${p}: thin detail page (${items} points)`);
  if (paras < 1) warn(`${p}: no explanatory paragraph`);
  if (!/>Source</.test(html)) warn(`${p}: no source block`);
}

// 3c. Per-product page counts (all real pages, incl. pending products)
const table = {};
const bucket = (p) => {
  const m = p.match(/^\/products\/([^/]+)(?:\/(.*))?$/);
  if (!m || m[1] === "category") return null;
  const [, slug, rest = ""] = m;
  const t = (table[slug] ??= { total: 0, overview: 0, featuresHub: 0, groups: 0, features: 0, solutions: 0, industries: 0, integrations: 0, pricing: 0, security: 0, compare: 0, resources: 0, support: 0 });
  t.total++;
  if (!rest) t.overview++;
  else if (rest === "features") t.featuresHub++;
  else if (rest.startsWith("features/group/")) t.groups++;
  else if (rest.startsWith("features/")) t.features++;
  else {
    const [sec, item] = rest.split("/");
    if (sec in t) t[sec] += item ? 1 : 0;
    if (!item && (sec === "pricing" || sec === "security")) t[sec] = 1;
  }
  return t;
};
for (const [p, { status }] of pages) if (status === 200) bucket(p);

// 4. Internal link integrity
const links = new Set();
for (const { html } of pages.values()) for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) links.add(m[1]);
let broken = 0;
for (const l of links) {
  if (pages.has(l) || /^\/_next\//.test(l) || /\.(svg|png|ico|xml|txt)$/.test(l)) continue;
  const r = await fetch(base + l, { redirect: "manual" });
  if (r.status >= 400) {
    broken++;
    warn(`broken internal link: ${l} (${r.status})`);
  }
}

console.log(`Audited ${pages.size} pages (${indexed.size} in sitemap), ${links.size} distinct internal links, ${broken} broken.`);
console.log("Feature pages per product:", perProduct);
console.log("\n| Product | Total | Features | Groups | Solutions | Industries | Integrations | Pricing | Security | Compare | Resources | Support |");
console.log("|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|");
for (const [slug, t] of Object.entries(table).sort((a, b) => b[1].total - a[1].total))
  console.log(`| ${slug} | ${t.total} | ${t.features} | ${t.groups} | ${t.solutions} | ${t.industries} | ${t.integrations} | ${t.pricing} | ${t.security} | ${t.compare} | ${t.resources} | ${t.support} |`);
console.log("(detail counts; section hub pages are included in Total)");
console.log(problems.length ? `\n${problems.length} problem(s):\n- ${problems.join("\n- ")}` : "\nNo problems found.");
process.exit(problems.length ? 1 : 0);

// Every <img> on every page: reports non-WebP sources and missing/empty/generic alt text.
// Usage: node scripts/image-format-audit.mjs <baseUrl>
const base = (process.argv[2] || "http://localhost:3217").replace(/\/$/, "");
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const nonWebp = {}, badAlt = {};
const GENERIC = /^(image|photo|picture|img|logo|icon|banner|screenshot|untitled|\d+)$/i;
for (const u of urls) {
  const html = await (await fetch(base + u)).text();
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    let src = (tag.match(/\ssrc="([^"]+)"/) || [])[1] ?? "";
    src = src.replace(/&amp;/g, "&");
    const q = src.match(/[?&]url=([^&]+)/); if (q) src = decodeURIComponent(q[1]);
    if (!src || src.startsWith("data:")) continue;
    const altM = tag.match(/\salt="([^"]*)"/);
    const hidden = /aria-hidden="true"|role="presentation"/.test(tag);
    const path = src.split("?")[0];
    if (!/\.(webp|svg)$/i.test(path)) (nonWebp[path] ||= new Set()).add(u);
    if (!altM) (badAlt[`MISSING alt | ${path}`] ||= new Set()).add(u);
    else if (!hidden && (altM[1].trim() === "" || GENERIC.test(altM[1].trim()))) (badAlt[`${altM[1] ? "GENERIC" : "EMPTY"} alt "${altM[1]}" | ${path}`] ||= new Set()).add(u);
  }
}
console.log(`${urls.length} pages`);
console.log(`\nNon-WebP images: ${Object.keys(nonWebp).length}`);
for (const [k, v] of Object.entries(nonWebp)) console.log(`  ${k}  (${v.size} pages, e.g. ${[...v][0]})`);
console.log(`\nAlt problems: ${Object.keys(badAlt).length}`);
for (const [k, v] of Object.entries(badAlt)) console.log(`  ${k}  (${v.size} pages, e.g. ${[...v].slice(0, 2).join(", ")})`);

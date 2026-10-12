// Page inventory per product from the production build: number, page name (<title>), URL, page type.
// Writes scripts/.compare/inventory.json and prints counts.
import fs from "node:fs";
import path from "node:path";
const root = ".next/server/app/products";
const typeOf = (rel) => {
  const s = rel.split("/");
  if (s.length === 1) return "Overview";
  if (s[1] === "features" && s.length === 2) return "Features hub";
  if (s[1] === "features" && s[2] === "group") return "Feature group";
  if (s[1] === "features") return "Feature detail";
  const sec = s[1][0].toUpperCase() + s[1].slice(1);
  return s.length === 2 ? `${sec} hub` : `${sec.replace(/s$/, "")} detail`;
};
const out = {};
for (const d of fs.readdirSync(root)) {
  if (d.startsWith("[") || d === "category" || d.includes(".")) continue;
  const files = [];
  const top = path.join(root, d + ".html");
  if (fs.existsSync(top)) files.push(top);
  (function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) { if (!f.endsWith(".segments")) walk(p); }
      else if (f.endsWith(".html")) files.push(p);
    }
  })(path.join(root, d));
  const pages = files.map((f) => {
    const rel = path.relative(root, f).replace(/\\/g, "/").replace(/\.html$/, "");
    const html = fs.readFileSync(f, "utf8");
    const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/ \| ToyoApps$/, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");
    return { url: "/products/" + rel, name: title, type: typeOf(rel) };
  });
  const order = ["Overview", "Features hub", "Feature group", "Feature detail"];
  pages.sort((a, b) => (order.indexOf(a.type) + 1 || 9) - (order.indexOf(b.type) + 1 || 9) || a.url.localeCompare(b.url));
  out[d] = pages;
}
fs.writeFileSync("scripts/.compare/inventory.json", JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out).sort((a, b) => b[1].length - a[1].length)) {
  const t = {}; for (const p of v) t[p.type] = (t[p.type] ?? 0) + 1;
  console.log(String(v.length).padStart(4), k.padEnd(24), Object.entries(t).map(([a, n]) => `${a}:${n}`).join(", "));
}

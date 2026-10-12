// Renames page slugs so each URL matches its page name (approved audit, 2026-10-12).
// Dry run by default; --apply writes files and src/content/url-redirects.json (old → new).
// Each page is identified by its real name from the site catalog, so a slug word shared by
// a feature, a group and a solution is only changed on the page being renamed.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
const root = pathToFileURL(process.cwd() + "/").href;
register("data:text/javascript," + encodeURIComponent(`
import fs from "node:fs"; import { fileURLToPath } from "node:url";
const root = ${JSON.stringify(root)};
const tryExt = (u) => { for (const e of ["", ".ts", ".tsx", "/index.ts"]) { const c = u + e; try { if (fs.statSync(fileURLToPath(c)).isFile()) return c; } catch {} } return null; };
export async function resolve(spec, ctx, next) {
  if (spec.startsWith("@/")) { const u = tryExt(root + "src/" + spec.slice(2)); if (u) return { url: u, shortCircuit: true }; }
  if ((spec.startsWith("./") || spec.startsWith("../")) && ctx.parentURL?.startsWith("file:")) { const u = tryExt(new URL(spec, ctx.parentURL).href); if (u) return { url: u, shortCircuit: true }; }
  if (spec.endsWith(".json") && ctx.parentURL?.startsWith("file:")) return next(spec, { ...ctx, importAttributes: { type: "json" } });
  return next(spec, ctx);
}`));
const { getProduct, getFeatures } = await import(root + "src/lib/catalog.ts");
const { getProductItems } = await import(root + "src/lib/product-sections.ts");

const APPLY = process.argv.includes("--apply");
const audit = JSON.parse(fs.readFileSync("scripts/.compare/url-name-audit.json", "utf8"));
const todo = audit.filter((r) => r.status !== "match" && !["/products", "/search"].includes(r.url));
const dir = "src/content/products";
const productFiles = fs.readdirSync(dir).filter((f) => f.endsWith(".ts") && !["index.ts", "_helpers.ts"].includes(f)).map((f) => path.join(dir, f));
const files = [...productFiles, "src/content/categories.ts", "src/content/registries.ts"];
const src = Object.fromEntries(files.map((f) => [f, fs.readFileSync(f, "utf8")]));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const filesFor = (p) => { const hit = productFiles.filter((f) => new RegExp(`^  slug: "${p}",`, "m").test(src[f])); if (p === "oda7") hit.push(path.join(dir, "oda7-expansion.ts")); return [...new Set(hit)]; };
const jsStr = (s) => JSON.stringify(s).slice(1, -1); // how a name appears inside "..."

// Find definition sites of slug o whose entity is named `name`.
function defSites(text, o, name) {
  const sites = [];
  // The entity's name as it can appear in source: "...", '...' or `...`.
  const forms = [`"${jsStr(name)}"`, `'${name.replace(/'/g, "\\'")}'`, `\`${name}\``];
  const patterns = [
    new RegExp(`slug:\\s*"${esc(o)}"`, "g"), // { slug: "x", name: "..." }
    new RegExp(`(?<=\\[\\s*)"${esc(o)}"(?=,\\s*\\n\\s*["'\`])`, "g"), // ODA7 tuple ["x", "Name", ...]
    new RegExp(`(?<=\\(\\s*)"${esc(o)}"(?=\\s*,)`, "g"), // helper("x", "Name", ...)
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const w = text.slice(m.index, m.index + 700).split("\n").slice(0, 9).join("\n");
      if (forms.some((f) => w.includes(f))) sites.push(m.index);
    }
  }
  return [...new Set(sites)];
}
const entity = (p, kind, o) => {
  const prod = getProduct(p); if (!prod) return null;
  if (kind === "features") return getFeatures(prod).find((f) => f.slug === o) ?? null;
  if (kind === "group") return (prod.featureCategories ?? []).find((g) => g.slug === o) ?? null;
  return getProductItems(prod, kind).find((i) => i.slug === o) ?? null;
};
const redirects = [], skipped = [];
let renamed = 0;
for (const r of todo) {
  const parts = r.url.split("/");
  const o = r.seg, n = r.expected;
  if (r.url.startsWith("/products/category/") || r.url.startsWith("/industries/")) {
    const home = r.url.startsWith("/industries/") ? "src/content/registries.ts" : "src/content/categories.ts";
    const re = new RegExp(`(slug:\\s*)"${esc(o)}"`, "g");
    if ((src[home].match(re) ?? []).length !== 1) { skipped.push(`${r.url}: not exactly one definition`); continue; }
    src[home] = src[home].replace(re, `$1"${n}"`);
    for (const f of productFiles) {
      if (home.endsWith("categories.ts")) src[f] = src[f].replace(new RegExp(`(^  category:\\s*)"${esc(o)}"`, "m"), `$1"${n}"`).replace(/(secondaryCategories:\s*\[)([^\]]*)\]/, (m, a, b) => a + b.replace(new RegExp(`"${esc(o)}"`, "g"), `"${n}"`) + "]");
      else src[f] = src[f].replace(/(^  industries:\s*\[)([^\]]*)\]/m, (m, a, b) => a + b.replace(new RegExp(`"${esc(o)}"`, "g"), `"${n}"`) + "]");
    }
    redirects.push([r.url, r.expectedUrl]); renamed++; continue;
  }
  if (r.url.startsWith("/resources/")) { skipped.push(`${r.url}: resource type (routes mapping)`); continue; }
  const p = parts[2];
  const kind = r.url.includes("/features/group/") ? "group" : parts[3];
  const e = entity(p, kind, o);
  if (!e) { skipped.push(`${r.url}: entity not found in catalog`); continue; }
  const fl = filesFor(p);
  let sites = fl.flatMap((f) => defSites(src[f], o, e.name).map((i) => [f, i]));
  // Names built by code (e.g. `The ${m.module} workflow in ODA7`) cannot be matched literally:
  // fall back to the slug definition only when it is the single one in the product's files.
  if (!sites.length) {
    const only = fl.flatMap((f) => [...src[f].matchAll(new RegExp(`slug:\\s*"${esc(o)}"`, "g"))].map((m) => [f, m.index]));
    if (only.length === 1) sites = only;
  }
  if (sites.length !== 1) { skipped.push(`${r.url}: ${sites.length} definition sites for "${o}" named "${e.name}"`); continue; }
  const [f, i] = sites[0];
  src[f] = src[f].slice(0, i) + src[f].slice(i).replace(`"${o}"`, `"${n}"`);
  for (const g of fl) {
    if (kind === "features") {
      src[g] = src[g].replace(/((?:relatedFeatures|features|highlights)\s*:\s*\[)([^\]\{]*)\]/g, (m, a, b) => a + b.replace(new RegExp(`"${esc(o)}"(?=\\s*[,\\]])`, "g"), `"${n}"`) + "]");
      src[g] = src[g].replace(new RegExp(`^(\\s*)"${esc(o)}"(:\\s*\\{)`, "m"), `$1"${n}"$2`); // ODA7 detail-map key
    }
    if (kind === "group") src[g] = src[g].replace(new RegExp(`(category:\\s*)"${esc(o)}"`, "g"), `$1"${n}"`);
  }
  redirects.push([r.url, r.expectedUrl]); renamed++;
}
console.log(`planned ${todo.length} | renamed ${renamed} | skipped ${skipped.length}`);
for (const s of skipped) console.log("  SKIP " + s);
if (APPLY) {
  for (const [f, s] of Object.entries(src)) if (fs.readFileSync(f, "utf8") !== s) fs.writeFileSync(f, s);
  fs.writeFileSync("src/content/url-redirects.json", JSON.stringify(redirects.map(([source, destination]) => ({ source, destination, permanent: true })), null, 1));
  console.log("written");
}

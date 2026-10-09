// Count em/en dashes and spaced hyphen separators in visible copy (string literals + JSX text).
import fs from "node:fs";
import path from "node:path";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(p)) files.push(p);
  }
})("src");
const rows = [];
let total = { em: 0, en: 0, spacedHyphen: 0 };
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // Strip comments so code comments don't count.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  const strs = code.match(/"(?:[^"\\\n]|\\.)*"|`[^`]*`|>[^<>{}]+</g) || [];
  const t = strs.join("\n");
  const em = (t.match(/—/g) || []).length;
  const en = (t.match(/–/g) || []).length;
  const sh = (t.match(/[A-Za-z)] - [A-Za-z(]/g) || []).length;
  if (em + en + sh) rows.push([f, em, en, sh]);
  total.em += em; total.en += en; total.spacedHyphen += sh;
}
rows.sort((a, b) => b[1] + b[2] + b[3] - (a[1] + a[2] + a[3]));
console.log("TOTAL", JSON.stringify(total));
for (const r of rows) console.log(String(r[1]).padStart(5), String(r[2]).padStart(4), String(r[3]).padStart(4), r[0]);

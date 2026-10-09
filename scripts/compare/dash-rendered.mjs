// Scan the visible text of every built page for em/en dashes and spaced hyphen separators.
import fs from "node:fs";
import path from "node:path";
const root = ".next/server/app";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(root);
const hits = {};
let total = 0;
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const body = html.split(/<body[^>]*>/)[1] ?? html;
  // Visible text only: drop scripts, styles, tags and attribute values.
  const text = body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (/[—–]|[A-Za-z)] - [A-Za-z(]/.test(t)) {
      total++;
      const key = t.slice(0, 90);
      (hits[key] ??= new Set()).add(f.slice(root.length).replace(/\\/g, "/"));
    }
  }
}
console.log(`pages scanned: ${files.length}, visible text lines with a dash: ${total}, distinct: ${Object.keys(hits).length}`);
for (const [k, v] of Object.entries(hits).slice(0, 40)) console.log(`${String(v.size).padStart(4)}× ${k}   [${[...v][0]}]`);

// Create placeholder SVGs for <ImageSlot> paths that don't have a file yet.
// Scans src/ for ImageSlot usages: src="/images/..." width={W} height={H}.
// Never overwrites an existing file, so real artwork you drop in is safe.
// usage: node scripts/make-placeholders.mjs
import fs from "node:fs";
import path from "node:path";

const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.tsx$/.test(f.name)) files.push(p); } };
walk("src");

const re = /<ImageSlot\b[^>]*?src=["'`](\/images\/[^"'`]+)["'`][^>]*?width=\{(\d+)\}[^>]*?height=\{(\d+)\}/gs;
let made = 0;
for (const f of files) {
  for (const [, src, w, h] of fs.readFileSync(f, "utf8").matchAll(re)) {
    const out = path.join("public", src);
    if (fs.existsSync(out)) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const label = src.replace(/^\/images\//, "");
    const fs1 = Math.max(12, Math.round(Math.min(+w, +h) / 18));
    fs.writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="100%" height="100%" fill="#e8eef4"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#b9c7d4" stroke-width="2" stroke-dasharray="10 8"/>
<path d="M${w / 2 - 30} ${h / 2 - 14}h60v40h-60z" fill="none" stroke="#8aa0b4" stroke-width="3"/><circle cx="${w / 2 - 14}" cy="${h / 2}" r="5" fill="#8aa0b4"/><path d="M${w / 2 - 30} ${h / 2 + 22}l18-16 12 10 10-8 20 14" fill="none" stroke="#8aa0b4" stroke-width="3"/>
<text x="50%" y="${h / 2 + 52}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${fs1}" fill="#5b7186">${label} · ${w}×${h}</text>
</svg>\n`);
    made++;
    console.log("created", out);
  }
}
console.log(`${made} placeholder(s) created`);

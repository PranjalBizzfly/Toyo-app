const base = "http://localhost:3121";
const idx = await (await fetch(base + "/search/index.json")).json();
const counts = {}; for (const e of idx) counts[e.type] = (counts[e.type] ?? 0) + 1;
console.log("total", idx.length, counts);
const long = idx.filter((e) => e.description.length > 180); console.log("desc>180", long.length);
const dupes = idx.length - new Set(idx.map(e=>e.type==="FAQ"||(e.type==="Feature"&&!e.href.includes("/features/"))?e.href+"|"+e.title.toLowerCase():e.href)).size; console.log("dupes", dupes);
console.log("pending", idx.filter(e=>e.type==="Product"&&e.status).map(e=>e.title+":"+e.status).join(", "));
const urls = [...new Set(idx.map((e) => e.href))];
let bad = 0;
const htmlCache = {};
for (const u of urls) {
  const [path, hash] = u.split("#");
  const r = await fetch(base + path, { redirect: "manual" });
  if (r.status !== 200) { bad++; console.log("BAD", r.status, u); continue; }
  if (hash) { const h = await r.text(); if (!h.includes(`id="${hash}"`)) { bad++; console.log("NOANCHOR", u); } }
}
console.log("urls", urls.length, "bad", bad);

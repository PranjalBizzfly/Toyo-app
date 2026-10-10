// Places batch-2 photos (incoming-images/b2). Trims the bottom-right generator watermark first,
// then crops around the people ("attention") to each slot's shape.
import fs from "node:fs";
import sharp from "sharp";

const src = "incoming-images/b2";
const out = (p) => (fs.mkdirSync(p.replace(/\/[^/]+$/, ""), { recursive: true }), p);
async function place(file, targets) {
  const img = sharp(`${src}/${file}`);
  const { width, height } = await img.metadata();
  const clean = await img.extract({ left: 0, top: 0, width: Math.round(width * 0.9), height: Math.round(height * 0.88) }).toBuffer();
  for (const [path, w, h] of targets) {
    await sharp(clean).resize(w, h, { fit: "cover", position: sharp.strategy.attention }).webp({ quality: 82 }).toFile(out(path));
    console.log(file, "→", path);
  }
}

await place("group-oda7-sales-execution.png", [
  ["public/images/products/oda7/groups/sales-execution-illustration.webp", 900, 900],
  ["public/images/products/oda7/groups/sales-execution-band.webp", 720, 960],
]);
await place("solution-run-a-well-organised-office.png", [["public/images/solutions/run-a-well-organised-office.webp", 1600, 900]]);
await place("solution-manage-your-people-from-hire-to-growth.png", [["public/images/solutions/manage-your-people-from-hire-to-growth.webp", 1600, 900]]);
for (const p of ["fantom", "zorfly", "zuzu", "zapbuzzer"]) {
  if (fs.existsSync(`${src}/tile-${p}.png`)) await place(`tile-${p}.png`, [[`public/images/products/${p}/tile.webp`, 800, 450]]);
}

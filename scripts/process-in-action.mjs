// Converts incoming-images/<slug>.png into public/images/products/<slug>/in-action.webp,
// trimming the bottom-right corner (generator watermark) while keeping 16:9.
import fs from "node:fs";
import sharp from "sharp";

for (const f of fs.readdirSync("incoming-images").filter((f) => /\.(png|jpe?g|webp)$/i.test(f))) {
  const slug = f.replace(/\.\w+$/, "");
  const img = sharp(`incoming-images/${f}`);
  const { width, height } = await img.metadata();
  const w = Math.round(width * 0.9);
  const h = Math.round((w * 9) / 16);
  const dir = `public/images/products/${slug}`;
  fs.mkdirSync(dir, { recursive: true });
  await img
    .extract({ left: 0, top: Math.max(0, Math.round((height - h) * 0.25)), width: w, height: Math.min(h, height) })
    .resize({ width: 1280 })
    .webp({ quality: 82 })
    .toFile(`${dir}/in-action.webp`);
  console.log(slug, `${width}x${height} → ${dir}/in-action.webp`);
}

// Generates 800px-wide mobile copies of the header (priority) images, next to the originals,
// and writes src/lib/mobile-images.json, which ImageSlot uses to serve them to phones.
// Run again after adding or replacing a header image: node scripts/make-mobile-heroes.mjs
import fs from "node:fs";
import sharp from "sharp";

const HEROES = [
  "company/blog-hero", "company/careers-hero", "company/media-hero", "company/press-kit-hero",
  "company/publish-hero", "company/support-hero", "company/vendors-hero",
  "catalog/compare-hero", "catalog/products-hero",
  "categories/finance-and-compliance", "categories/hr-and-people", "categories/insights-and-research",
  "categories/operations-and-it", "categories/sales-and-marketing",
  "solutions/manage-your-people-from-hire-to-growth", "solutions/prepare-for-launch-and-fundraising", "solutions/run-a-well-organised-office",
];
const WIDTH = 800;
const manifest = {};
for (const h of HEROES) {
  const src = `public/images/${h}.webp`;
  if (!fs.existsSync(src)) { console.log("skip (missing)", src); continue; }
  const { width } = await sharp(src).metadata();
  if (width <= WIDTH) { console.log("skip (already <= 800px)", src); continue; }
  const out = `public/images/${h}-${WIDTH}.webp`;
  await sharp(src).resize({ width: WIDTH }).webp({ quality: 80, effort: 6 }).toFile(out);
  manifest[`/images/${h}.webp`] = `/images/${h}-${WIDTH}.webp`;
  console.log(`${src} ${Math.round(fs.statSync(src).size / 1024)}KB -> ${out} ${Math.round(fs.statSync(out).size / 1024)}KB`);
}
fs.writeFileSync("src/lib/mobile-images.json", JSON.stringify(manifest, null, 2) + "\n");

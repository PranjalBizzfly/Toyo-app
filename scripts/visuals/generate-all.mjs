import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { generateProductCards } from "./products.mjs";
import { generateIndustriesAndCategories } from "./industries-and-categories.mjs";
import { generateCatalogAndCompany } from "./catalog-and-company.mjs";
import { generateHomeVisuals } from "./home.mjs";
import { generateProductFeaturesEntity } from "./product-features-entity.mjs";

console.log("=== STARTING COMPLETE VISUAL GENERATION ===");

// 1. Generate all base artwork
generateProductCards();
generateIndustriesAndCategories();
generateCatalogAndCompany();
generateHomeVisuals();
generateProductFeaturesEntity();

console.log("=== SANITIZING AND CONVERTING ALL VISUALS TO WEBP ===");

const files = [];
const walk = (d) => {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.svg$/.test(f.name) && p !== path.join("public", "icon.svg")) files.push(p);
  }
};
walk(path.join("public", "images"));

let allPassed = true;
let totalWebpSize = 0;
let convertedCount = 0;

for (const f of files) {
  let content = fs.readFileSync(f, "utf8");

  // Sanitize any bare ampersands so SVG is 100% valid XML
  const sanitized = content.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+|#x[0-9a-fA-F]+;)/g, "&amp;");
  if (sanitized !== content) {
    fs.writeFileSync(f, sanitized, "utf8");
    content = sanitized;
  }

  // Target WebP file path
  const webpPath = f.replace(/\.svg$/, ".webp");

  try {
    const svgBuffer = Buffer.from(content, "utf8");
    await sharp(svgBuffer, { density: 144 })
      .webp({ quality: 92, effort: 4 })
      .toFile(webpPath);

    const stat = fs.statSync(webpPath);
    totalWebpSize += stat.size;
    convertedCount++;

    if (stat.size < 1000) {
      console.warn(`WARNING: ${webpPath} seems unusually small (${stat.size} bytes)!`);
      allPassed = false;
    }
  } catch (err) {
    console.error(`ERROR converting ${f} to WebP:`, err.message);
    allPassed = false;
  }
}

console.log(`=== VERIFICATION SUMMARY ===`);
console.log(`Converted ${convertedCount} of ${files.length} visuals into WebP format.`);
console.log(`Total WebP payload: ${(totalWebpSize / 1024).toFixed(1)} KB`);

if (allPassed && convertedCount === files.length) {
  console.log("SUCCESS: All visual positions are rendered and available in WebP format!");
} else {
  console.error("FAIL: Some images failed conversion or verification.");
  process.exit(1);
}

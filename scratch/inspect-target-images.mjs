import fs from 'node:fs';
import sharp from 'sharp';

// We can check image properties, mean colors, and check scripts/download-and-process-photos.mjs comments
const downloadScript = fs.readFileSync('scripts/download-and-process-photos.mjs', 'utf8');

const targetImages = [
  'public/images/company/about-team.webp',
  'public/images/company/vendors-hero.webp',
  'public/images/company/publish-hero.webp',
  'public/images/company/publish-steps.webp',
  'public/images/company/support-hero.webp',
  'public/images/company/blog-hero.webp',
  'public/images/company/careers-hero.webp',
  'public/images/company/media-hero.webp',
  'public/images/company/press-kit-hero.webp',
  'public/images/catalog/products-hero.webp',
  'public/images/catalog/compare-hero.webp',
  'public/images/catalog/integrations-hero.webp',
  'public/images/categories/sales-marketing.webp',
  'public/images/categories/operations-it.webp',
  'public/images/categories/hr-people.webp',
  'public/images/categories/finance-compliance.webp',
  'public/images/categories/insights-research.webp',
  'public/images/entity/hub-card.webp',
  'public/images/entity/product-tile.webp',
  'public/images/entity/solution-hero.webp',
  'public/images/entity/industry-hero.webp',
  'public/images/entity/integration-hero.webp',
  'public/images/entity/resource-featured.webp',
  'public/images/entity/resource-card.webp',
  'public/images/entity/resource-cover.webp',
  'public/images/pool/p0.webp',
  'public/images/pool/p1.webp',
  'public/images/pool/p2.webp',
  'public/images/pool/p3.webp',
  'public/images/pool/p4.webp',
  'public/images/pool/p5.webp',
  'public/images/pool/p6.webp',
  'public/images/pool/p7.webp',
  'public/images/products/hrmagix/hero-a.webp',
  'public/images/products/hrmagix/hero-b.webp',
  'public/images/products/hrmagix/card-team.webp',
  'public/images/products/hrmagix/card-recognition.webp',
  'public/images/products/hrmagix/card-payroll.webp',
  'public/images/product/spotlight-1.webp',
  'public/images/product/spotlight-2.webp',
  'public/images/product/spotlight-3.webp',
  'public/images/product/tour.webp',
  'public/images/product/section-card.webp',
  'public/images/features/area-illustration.webp',
  'public/images/features/area-band.webp',
  'public/images/features/group-hero.webp',
  'public/images/features/group-feature.webp',
  'public/images/features/feature-hero.webp',
  'public/images/features/feature-screen.webp',
  'public/images/features/item-hero.webp',
  'public/images/features/item-screen.webp'
];

for (const img of targetImages) {
  if (fs.existsSync(img)) {
    const stat = fs.statSync(img);
    // Search in download script for comments/alt
    const regex = new RegExp(`path:\\s*['\"]${img}['\"],\\s*width:\\s*(\\d+),\\s*height:\\s*(\\d+)(?:,\\s*alt:\\s*['\"]([^'\"]+)['\"])?`);
    const match = downloadScript.match(regex);
    console.log(`${img} | ${(stat.size / 1024).toFixed(1)} KB ${match ? `| Alt: "${match[3]}"` : '| NOT IN DOWNLOAD SCRIPT'}`);
  } else {
    console.log(`${img} | NOT FOUND`);
  }
}

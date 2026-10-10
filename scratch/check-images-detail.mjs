import fs from 'node:fs';
import sharp from 'sharp';

const filesToCheck = [
  'public/images/company/about-team.webp',
  'public/images/categories/hr-people.webp',
  'public/images/categories/finance-compliance.webp',
  'public/images/categories/insights-research.webp',
  'public/images/product/tour.webp',
  'public/images/pool/p4.webp',
  'public/images/pool/p6.webp',
  'public/images/pool/p7.webp',
  'public/images/products/hrmagix/hero-a.webp',
  'public/images/products/hrmagix/hero-b.webp',
  'public/images/products/hrmagix/card-team.webp',
  'public/images/products/hrmagix/card-recognition.webp',
  'public/images/products/hrmagix/card-payroll.webp',
];

for (const f of filesToCheck) {
  if (fs.existsSync(f)) {
    const meta = await sharp(f).metadata();
    const stats = fs.statSync(f);
    console.log(`${f}: ${meta.width}x${meta.height}, size: ${(stats.size/1024).toFixed(1)}KB, hasAlpha: ${meta.hasAlpha}`);
  } else {
    console.log(`${f}: NOT FOUND`);
  }
}

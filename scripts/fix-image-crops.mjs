import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const baseArtifactsDir = 'C:/Users/Dreams/.gemini/antigravity-ide/brain/0ff5dbc7-ebe2-4269-a9a2-1772a6805d64/';

const photos = [
  {
    artifact: 'careers_hero_1791609342312.jpg',
    dest: 'public/images/company/careers-hero.webp'
  },
  {
    artifact: 'publish_hero_1791608983614.jpg',
    dest: 'public/images/company/publish-hero.webp'
  },
  {
    artifact: 'press_kit_hero_1791609392903.jpg',
    dest: 'public/images/company/press-kit-hero.webp'
  },
  {
    artifact: 'support_hero_1791609285000.jpg',
    dest: 'public/images/company/support-hero.webp'
  },
  {
    artifact: 'blog_hero_1791609312929.jpg',
    dest: 'public/images/company/blog-hero.webp'
  },
  {
    artifact: 'media_hero_1791609368732.jpg',
    dest: 'public/images/company/media-hero.webp'
  },
  {
    artifact: 'vendor_onboarding_1791608900303.jpg',
    dest: 'public/images/company/vendors-hero.webp'
  },
  {
    artifact: 'about_team_1791608955438.jpg',
    dest: 'public/images/company/about-team.webp'
  },
  {
    artifact: 'products_hero_1791609422977.jpg',
    dest: 'public/images/catalog/products-hero.webp'
  },
  {
    artifact: 'compare_hero_1791609448896.jpg',
    dest: 'public/images/catalog/compare-hero.webp'
  },
  {
    artifact: 'sales_marketing_1791609477439.jpg',
    dest: 'public/images/categories/sales-marketing.webp'
  },
  {
    artifact: 'operations_it_1791609507729.jpg',
    dest: 'public/images/categories/operations-it.webp'
  },
  {
    artifact: 'publish_steps_1791609016642.jpg',
    dest: 'public/images/company/publish-steps.webp'
  }
];

async function fixCrops() {
  console.log('Re-exporting all photos WITHOUT CROPPING to preserve full heads and composition...');
  
  for (const item of photos) {
    const artPath = path.join(baseArtifactsDir, item.artifact);
    if (!fs.existsSync(artPath)) {
      console.error(`Artifact not found: ${artPath}`);
      continue;
    }

    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Convert directly preserving FULL 1376x768 uncropped frame with high quality
    await sharp(artPath)
      .webp({ quality: 92, effort: 4 })
      .toFile(item.dest);

    const meta = await sharp(item.dest).metadata();
    console.log(`✓ Re-exported ${item.dest} (${meta.width}x${meta.height}) - ZERO CROP`);
  }

  console.log('All images successfully fixed!');
}

fixCrops().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

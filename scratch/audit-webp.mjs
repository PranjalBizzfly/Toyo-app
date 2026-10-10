import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.webp')) {
      results.push(full.replace(/\\/g, '/'));
    }
  }
  return results;
}

async function audit() {
  const files = walk('public/images');
  console.log(`Found ${files.length} webp files.`);
  for (const f of files) {
    try {
      const meta = await sharp(f).metadata();
      const stats = fs.statSync(f);
      console.log(`${f} | ${meta.width}x${meta.height} | ${(stats.size / 1024).toFixed(1)} KB | format: ${meta.format}`);
    } catch (e) {
      console.log(`${f} | ERROR: ${e.message}`);
    }
  }
}

audit();

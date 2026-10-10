import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function checkProducts() {
  const dir = 'public/images/products';
  const prods = fs.readdirSync(dir);
  for (const p of prods) {
    const full = path.join(dir, p);
    if (fs.statSync(full).isDirectory()) {
      const files = fs.readdirSync(full);
      for (const f of files) {
        if (f.endsWith('.webp')) {
          const filePath = path.join(full, f);
          const meta = await sharp(filePath).metadata();
          const stats = fs.statSync(filePath);
          console.log(`${filePath} | ${meta.width}x${meta.height} | ${(stats.size/1024).toFixed(1)} KB`);
        }
      }
    }
  }
}

checkProducts();

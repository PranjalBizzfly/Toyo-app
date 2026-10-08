import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (full.endsWith('.svg')) {
      results.push(full);
    }
  }
  return results;
}

async function convertAll() {
  const svgs = walk('public/images');
  console.log(`Converting ${svgs.length} SVGs to WebP...`);

  let count = 0;
  for (const svgPath of svgs) {
    let content = fs.readFileSync(svgPath, 'utf8');
    // Ensure bare ampersands are escaped for librsvg
    content = content.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+|#x[0-9a-fA-F]+;)/g, '&amp;');
    
    // Also save the sanitized SVG back so the SVG itself is 100% valid W3C XML
    fs.writeFileSync(svgPath, content, 'utf8');

    const webpPath = svgPath.replace(/\.svg$/, '.webp');
    const svgBuffer = Buffer.from(content, 'utf8');

    try {
      await sharp(svgBuffer, { density: 144 })
        .webp({ quality: 92, effort: 4 })
        .toFile(webpPath);
      count++;
    } catch (err) {
      console.error(`Failed to convert ${svgPath}:`, err.message);
    }
  }

  console.log(`Successfully converted ${count} of ${svgs.length} images to WebP.`);
}

convertAll();

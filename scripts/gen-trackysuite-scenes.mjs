// Generates original painted landscape backgrounds for TrackySuite pages via
// Pollinations (text prompt only), then saves optimised WebP files.
// node scripts/gen-trackysuite-scenes.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/images/products/trackysuite";
mkdirSync(OUT, { recursive: true });
const STYLE = "painterly digital illustration, visible textured brush strokes, soft natural light, highly detailed, wide panoramic, no people, no text, no logo, no watermark";
const SCENES = [
  { name: "scene-hero", w: 1920, h: 1080, seed: 4127, prompt: `wide spring meadow full of wildflowers in pink, purple, white and yellow in the foreground, rolling green hills, small grassy cliffs with trees on the left and right edges, misty distant mountains, large soft blue sky with fluffy white clouds filling the upper half, ${STYLE}` },
  { name: "scene-meadow", w: 1920, h: 1080, seed: 9031, prompt: `lush green grass meadow with colourful wildflowers close up in the foreground, gentle hills, pale blue sky with soft clouds in the top third, ${STYLE}` },
  { name: "scene-night", w: 1920, h: 1080, seed: 2214, prompt: `dark green mountain valley at dusk, deep teal and navy sky, layered dark mountains and forested hills, moody calm atmosphere, ${STYLE}` },
];

for (const s of SCENES) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(s.prompt)}?width=${s.w}&height=${s.h}&seed=${s.seed}&nologo=true&model=flux`;
  const res = await fetch(url);
  if (!res.ok) { console.log(s.name, "HTTP", res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize(1920, 1080, { fit: "cover" }).webp({ quality: 82 }).toFile(`${OUT}/${s.name}.webp`);
  console.log(s.name, "ok", Math.round(buf.length / 1024) + "k");
}

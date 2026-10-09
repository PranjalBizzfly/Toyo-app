// Writes public/images/meadow-strip.svg — a wide meadow band (hills, grass, flowers)
// used at the bottom of TrackySuite inner-page heroes. Same drawing as Meadow.tsx.
import { writeFileSync } from "node:fs";
const r = (n) => ((n * 9301 + 49297) % 233280) / 233280;
const F = ["#ffffff", "#f5c842", "#e9578a", "#8b5cf6", "#1e9ce5"];
let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">`;
s += `<path d="M0 60 C 240 30, 480 60, 720 40 S 1160 20, 1440 50 V200 H0Z" fill="#a7cf8a"/>`;
s += `<path d="M0 100 C 300 70, 620 100, 900 85 S 1300 80, 1440 95 V200 H0Z" fill="#7bc142"/>`;
s += `<path d="M0 140 C 300 120, 700 145, 1000 130 S 1300 125, 1440 135 V200 H0Z" fill="#4f8a22"/>`;
for (let i = 0; i < 160; i++) {
  const x = r(i + 300) * 1440, y = 70 + r(i + 500) * 130, h = 6 + r(i + 900) * 16;
  s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q ${i % 2 ? 3 : -3} ${-h / 2} ${i % 2 ? 1 : -1} ${-h}" stroke="#2f6e17" stroke-width="2" fill="none" opacity=".7"/>`;
}
for (let i = 0; i < 60; i++) {
  const x = r(i + 1) * 1440, y = 110 + r(i + 101) * 85, z = 3 + (y - 110) / 14 + r(i + 7) * 3;
  s += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">`;
  for (const a of [0, 72, 144, 216, 288]) s += `<ellipse cy="${(-z * 0.55).toFixed(1)}" rx="${(z * 0.38).toFixed(1)}" ry="${(z * 0.62).toFixed(1)}" transform="rotate(${a})" fill="${F[i % 5]}"/>`;
  s += `<circle r="${(z * 0.3).toFixed(1)}" fill="#f5c842"/></g>`;
}
writeFileSync("public/images/meadow-strip.svg", s + "</svg>");
console.log("ok");

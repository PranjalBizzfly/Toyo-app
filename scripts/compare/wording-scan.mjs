// Scan site copy (content files + page/component string literals) for robotic,
// buzzword or unfamiliar wording. Prints hits per file and per term.
import fs from "node:fs";
import path from "node:path";

const TERMS = [
  "seamless", "seamlessly", "leverage", "leverages", "leveraging", "cutting-edge", "unlock", "unlocks", "empower", "empowers", "empowering",
  "elevate", "elevates", "robust", "holistic", "synergy", "streamline", "streamlines", "streamlined", "revolutioni", "game-chang", "next-generation", "next-gen",
  "state-of-the-art", "world-class", "best-in-class", "supercharge", "harness", "harnesses", "unparalleled", "unprecedented", "effortless", "effortlessly",
  "delve", "tapestry", "landscape", "realm", "paradigm", "utilize", "utilise", "utilization", "facilitate", "facilitates", "orchestrat", "operationaliz", "operationalis",
  "actionable", "frictionless", "end-to-end", "one-stop", "dynamic ", "comprehensive", "innovative", "transformative", "ecosystem", "mission-critical",
  "at scale", "in today's", "fast-paced", "ever-evolving", "journey", "unlock the", "take your", "to the next level", "peace of mind", "boost ", "drive growth",
  "enablement", "ideation", "telemetry", "cadence", "granular", "bespoke", "curated", "plethora", "myriad", "commence", "endeavour", "henceforth", "thereby", "wherein",
  "single source of truth", "source of truth", "out-of-the-box", "turnkey", "omnichannel", "synergies", "value-add", "deep dive", "circle back", "low-hanging",
];

const roots = ["src/content", "src/app", "src/components", "src/lib"];
const files = [];
(function walk(list) {
  for (const r of list) {
    for (const f of fs.readdirSync(r)) {
      const p = path.join(r, f);
      if (fs.statSync(p).isDirectory()) walk([p]);
      else if (/\.(ts|tsx)$/.test(p)) files.push(p);
    }
  }
})(roots);

const perFile = {};
const perTerm = {};
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // Only quoted strings / JSX text roughly: lines containing a quote or JSX text.
  const strings = src.match(/"[^"\n]{8,}"|`[^`]{8,}`|>[^<>{}\n]{8,}</g) || [];
  const text = strings.join("\n").toLowerCase();
  for (const t of TERMS) {
    const n = text.split(t).length - 1;
    if (!n) continue;
    perFile[f] = (perFile[f] ?? 0) + n;
    perTerm[t.trim()] = (perTerm[t.trim()] ?? 0) + n;
  }
}
console.log("Hits by term:");
Object.entries(perTerm).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(String(n).padStart(5), t));
console.log("\nHits by file:");
Object.entries(perFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(String(n).padStart(5), f));

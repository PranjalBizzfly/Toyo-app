// Theme/navigation check: `node scripts/theme-check.mjs [baseUrl]` against a running server.
// 1) every sampled page ships the pre-paint theme script, Home link and theme toggle;
// 2) WCAG contrast of key token pairs in both themes.
const base = process.argv[2] ?? "http://localhost:3000";
const pages = ["/", "/products", "/products/sigchanger", "/products/trackysuite/pricing", "/integrations", "/solutions/run-a-well-organised-office"];

let failed = 0;
for (const p of pages) {
  const html = await (await fetch(base + p)).text();
  const head = html.slice(0, html.indexOf("</head>"));
  const checks = {
    "theme script in <head>": head.includes("toyo-theme"),
    "Home link": /href="\/"[^>]*class="primary-nav__trigger"|class="primary-nav__trigger"[^>]*href="\/"/.test(html),
    "theme toggle": html.includes("theme-toggle"),
  };
  const bad = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  if (bad.length) failed++;
  console.log(`${bad.length ? "FAIL" : "ok  "} ${p}${bad.length ? " — missing " + bad.join(", ") : ""}`);
}

const hex = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255);
const lum = (h) => {
  const [r, g, b] = hex(h).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const pairs = {
  light: [["text", "#0f2235", "#f4f8fb"], ["text-secondary", "#3a516a", "#ffffff"], ["text-muted", "#5d7187", "#ffffff"], ["primary button", "#ffffff", "#0f7bbe"], ["primary link", "#0f7bbe", "#ffffff"], ["island text", "#dbe6f0", "#0f2235"], ["island muted", "#a9bccd", "#0f2235"], ["warning", "#8a6300", "#fef6dc"]],
  dark: [["text", "#dfe8f1", "#07121d"], ["text-secondary", "#b4c4d4", "#0c1b2a"], ["text-muted", "#8da1b5", "#0e1f30"], ["primary button", "#04121f", "#3aaef0"], ["primary link", "#3aaef0", "#0c1b2a"], ["island text", "#d5e2ee", "#0b1f33"], ["island muted", "#9fb3c7", "#0b1f33"], ["warning", "#f5c842", "#0c1b2a"]],
};
console.log("\nContrast (AA body text needs 4.5:1)");
for (const [theme, list] of Object.entries(pairs)) {
  for (const [name, fg, bg] of list) {
    const r = ratio(fg, bg);
    if (r < 4.5) failed++;
    console.log(`${r >= 4.5 ? "ok  " : "LOW "} ${theme.padEnd(5)} ${name.padEnd(16)} ${r.toFixed(2)}:1`);
  }
}
console.log(failed ? `\n${failed} problem(s)` : "\nall passed");
process.exit(failed ? 1 : 0);

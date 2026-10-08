// Route smoke test: `node scripts/smoke.mjs [baseUrl]` against a running server.
// Checks status codes and that every 200 page has exactly one <h1>, a title and a canonical.
const base = process.argv[2] ?? "http://localhost:3000";

const expectations = [
  ["", 200],
  ["products", 200],
  ["products?q=gmail", 200],
  ["products/category/sales-marketing", 200],
  ["products/category/insights-research", 200],
  ["products/category/finance-compliance", 200], // 1 product: rendered but noindexed
  ["products/sigchanger", 200],
  ["products/sigchanger/features", 200],
  ["products/sigchanger/pricing", 200],
  ["products/sigchanger/integrations", 200],
  ["products/sigchanger/support", 200],
  ["products/cardizo", 200],
  ["products/cardizo/features", 200], // hub exists because features have pages
  ["products/sizoru/features/dual-method-convergence-test", 200], // real feature page
  ["products/sigchanger/security", 200],
  ["products/zorfly/features/five-minute-lessons", 200],
  ["products/hrmagix/pricing", 200], // pricing from the new official site
  ["products/sibu/features", 200],
  ["products/sibu/features/scene-detection", 404], // no feature body → no page
  ["products/sibu/features/group/ai", 200], // group intro from the new official site
  ["products/zuzu", 200],
  ["products/fleetras", 200], // pending verification: visible, noindex
  ["products/taskmagic", 200], // pending verification: visible, noindex
  ["products/taskmagic/pricing", 200],
  ["products/tracksuit", 200],
  ["integrations", 200],
  ["integrations/whatsapp", 200],
  ["solutions", 200],
  ["solutions/run-a-well-organised-office", 200],
  ["industries", 200],
  ["industries/accounting-tax-practices", 200],
  ["products/trackysuite/industries", 200],
  ["products/sigchanger/solutions", 200],
  ["products/hrmagix/industries", 200],
  ["products/hrmagix/industries/manufacturing", 200],
  ["products/oda7/features", 200],
  ["products/meetingmind", 200], // pending verification: visible, noindex
  ["resources", 200],
  ["publish", 200],
  ["contact", 200],
  ["sitemap.xml", 200],
  ["robots.txt", 200],
  ["does-not-exist", 404],
];

let failed = 0;
for (const [path, want] of expectations) {
  const res = await fetch(`${base}/${path}`);
  const html = await res.text();
  const problems = [];
  if (res.status !== want) problems.push(`status ${res.status} (want ${want})`);
  if (res.status === 200 && res.headers.get("content-type")?.includes("text/html")) {
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1) problems.push(`${h1} <h1>`);
    if (!/<title>[^<]+<\/title>/.test(html)) problems.push("no <title>");
    if (!/rel="canonical"/.test(html)) problems.push("no canonical");
  }
  if (problems.length) failed++;
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  console.log(`${problems.length ? "FAIL" : "ok  "} /${path}${robots ? `  [robots: ${robots}]` : ""}${problems.length ? `  — ${problems.join(", ")}` : ""}`);
}
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);

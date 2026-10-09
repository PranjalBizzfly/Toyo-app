// Checks the renamed page URLs load and the old URLs redirect to them.
const base = process.env.BASE ?? "http://localhost:3500";
const pages = ["contact-us", "about-toyoapps", "publish-and-sell-your-saas", "become-a-toyoapps-vendor", "media-and-news", "compare-products", "legal/privacy-policy", "legal/terms-of-service", "legal/cookie-policy"];
const old = ["contact", "company", "publish", "vendors", "media", "compare", "legal/privacy", "legal/terms", "legal/cookies"];
for (const p of pages) console.log(`/${p}`, (await fetch(`${base}/${p}`)).status);
for (const p of old) {
  const r = await fetch(`${base}/${p}`, { redirect: "manual" });
  console.log(`/${p}`, r.status, "->", r.headers.get("location"));
}
const html = await (await fetch(`${base}/compare-products`)).text();
const c = html.match(/href="(\/compare-products\/[^"]+)"/)?.[1];
if (c) console.log(c, (await fetch(base + c)).status);

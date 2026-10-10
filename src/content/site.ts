/**
 * Site-wide facts. Everything here is taken from the current toyoapps.com
 * page. Do not add claims, numbers or links that aren't verified.
 */
export const site = {
  name: "ToyoApps",
  legalName: "Toyo Apps",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://toyoapps.com").replace(/\/$/, ""),
  tagline: "Buy, sell & publish SaaS software in one place.",
  description:
    "ToyoApps is one home for business software. Discover, buy and use SaaS products organised by business function: sales and marketing, HR, operations and IT, finance and compliance, insights and research. You can also list and sell your own.",
  // Social profiles are linked from the current site; fill in the exact URLs.
  // Footer order follows the site owner's reference (2026-10-10).
  social: [
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "X", href: "" },
    { label: "YouTube", href: "" },
  ],
  contactEmail: "",
  // Footer badge row (confirmed by the site owner, 2026-10-10). Add each store
  // URL when it is available; badges without a URL render but are not links.
  badges: {
    apps: [
      { kind: "chrome", top: "Install", bottom: "Extension Now", href: "" },
      { kind: "play", top: "Get it on", bottom: "Google Play", href: "" },
      { kind: "apple", top: "Download on the", bottom: "App Store", href: "" },
    ],
    partner: { top: "Meta", bottom: "Business Partner" },
    payments: ["Mastercard", "Maestro", "Diners Club", "PayPal", "American Express", "Visa"],
  },
};

/** Publisher journey, from the current toyoapps.com page. */
export const publisherSteps = [
  { title: "Create a listing", description: "Add your product with pricing, demos and screenshots. There's no storefront to build." },
  { title: "Go live", description: "Your product becomes visible in the ToyoApps marketplace, where buyers browse software by business function." },
  { title: "Get paid", description: "Subscription and one-time billing are handled for you, with payouts." },
  { title: "Grow", description: "Use analytics, ratings and promotions to reach more customers." },
];

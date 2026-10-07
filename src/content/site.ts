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
    "ToyoApps is one home for business software — discover, buy and use SaaS products organised by what your business needs, or publish your own.",
  // Social profiles are linked from the current site; fill in the exact URLs.
  social: [
    { label: "X", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],
  contactEmail: "",
};

/** Publisher journey, from the current toyoapps.com page. */
export const publisherSteps = [
  { title: "Create a listing", description: "Add your product with pricing, demos and screenshots — no storefront to build." },
  { title: "Go live", description: "Your product becomes visible in the ToyoApps marketplace." },
  { title: "Get paid", description: "Subscription and one-time billing are handled for you, with payouts." },
  { title: "Grow", description: "Use analytics, ratings and promotions to reach more customers." },
];

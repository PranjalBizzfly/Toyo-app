import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Page URLs renamed to match their page names (URL name audit, 2026-10-12): old → new. */
const pageNameRedirects: { source: string; destination: string; permanent: boolean }[] = JSON.parse(
  readFileSync(join(process.cwd(), "src/content/url-redirects.json"), "utf8"),
);

const nextConfig: NextConfig = {
  // Optional separate build folder (e.g. NEXT_DIST_DIR=.next-check) so a test build cannot be
  // overwritten by another build running at the same time. Unset = the default ".next".
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  // Old URLs permanently redirect to the URLs that match each page's name.
  async redirects() {
    return [
      { source: "/resources/blog", destination: "/blog", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/company", destination: "/about-toyoapps", permanent: true },
      { source: "/publish", destination: "/publish-and-sell-your-saas", permanent: true },
      { source: "/vendors", destination: "/become-a-toyoapps-vendor", permanent: true },
      { source: "/media", destination: "/media-and-news", permanent: true },
      { source: "/products/getbenj", destination: "/products/benj", permanent: true },
      { source: "/products/getbenj/:path*", destination: "/products/benj/:path*", permanent: true },
      { source: "/solutions/manage-people-from-hire-to-growth", destination: "/solutions/manage-your-people-from-hire-to-growth", permanent: true },
      { source: "/products/taskmagic", destination: "/products/taskmagix", permanent: true },
      { source: "/products/taskmagic/:path*", destination: "/products/taskmagix/:path*", permanent: true },
      { source: "/compare", destination: "/compare-products", permanent: true },
      { source: "/compare/:slug", destination: "/compare-products/:slug", permanent: true },
      { source: "/legal/privacy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/legal/terms", destination: "/legal/terms-of-service", permanent: true },
      { source: "/legal/cookies", destination: "/legal/cookie-policy", permanent: true },
      { source: "/resources/updates", destination: "/resources/product-updates", permanent: true },
      { source: "/resources/updates/:slug", destination: "/resources/product-updates/:slug", permanent: true },
      ...pageNameRedirects,
    ];
  },
};

export default nextConfig;

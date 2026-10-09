import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: "/compare", destination: "/compare-products", permanent: true },
      { source: "/compare/:slug", destination: "/compare-products/:slug", permanent: true },
      { source: "/legal/privacy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/legal/terms", destination: "/legal/terms-of-service", permanent: true },
      { source: "/legal/cookies", destination: "/legal/cookie-policy", permanent: true },
    ];
  },
};

export default nextConfig;

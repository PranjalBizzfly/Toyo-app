import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // One canonical blog URL: the hub is /blog. Individual posts stay at /resources/blog/{slug}.
  async redirects() {
    return [{ source: "/resources/blog", destination: "/blog", permanent: true }];
  },
};

export default nextConfig;

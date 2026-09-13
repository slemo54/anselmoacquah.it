import type { NextConfig } from "next";

/**
 * Routing source of truth: Next.js App Router.
 * `/portfolio` is the public UI. Static HTML must not be served.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/portfolio",
        permanent: false,
      },
      {
        source: "/portfolio/index.html",
        destination: "/portfolio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

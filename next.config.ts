import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Redirect root to portfolio */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/portfolio/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

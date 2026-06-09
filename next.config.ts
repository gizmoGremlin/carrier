import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Clean URL for the static Terms & Conditions page (public/terms-and-conditions.html).
      { source: "/terms-and-conditions", destination: "/terms-and-conditions.html" },
    ];
  },
  async headers() {
    return [
      {
        // Keep the whole site out of search indexes (pre-launch).
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;

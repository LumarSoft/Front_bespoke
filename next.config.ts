import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats: Next optimizes remote assets to AVIF/WebP on demand.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arquitecturabespoke.ar",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;

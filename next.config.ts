import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
    qualities: [75, 100],
    minimumCacheTTL: 31536000,
    formats: ["image/webp"],
  },
};

export default nextConfig;

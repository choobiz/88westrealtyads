import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "88westrealty.com" },
    ],
  },
};

export default nextConfig;

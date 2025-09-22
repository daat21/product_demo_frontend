import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Allow larger payloads for Server Actions (client -> Next server)
    serverActions: {
      bodySizeLimit: "64mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "insuretechstorage.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
  env: {
    DATABASE_URL_NEON: process.env.DATABASE_URL_NEON,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;

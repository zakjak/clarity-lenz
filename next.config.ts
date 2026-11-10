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
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  env: {
    DATABASE_URL_NEON: process.env.DATABASE_URL_NEON,
    API_URL: process.env.API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
    SMTP_SERVER_USERNAME: process.env.SMTP_SERVER_USERNAME,
    SMTP_SERVER_PASSWORD: process.env.SMTP_SERVER_PASSWORD,
    SMTP_SERVER_HOST: process.env.SMTP_SERVER_PASSWORD,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    ZOOM_LINK: process.env.ZOOM_LINK,
    PASSWORD: process.env.PASSWORD,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;

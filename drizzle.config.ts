import "dotenv/config";
import { defineConfig } from "drizzle-kit";
// schema: "./lib/db",
export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
});

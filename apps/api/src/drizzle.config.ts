import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./config/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.databaseUrl,
  },
});

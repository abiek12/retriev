import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Database } from "@repo/database";

export const auth = betterAuth({
  database: drizzleAdapter(Database, {
    provider: "pg",
  }),
});

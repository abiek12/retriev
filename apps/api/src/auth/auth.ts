import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import database from "../database";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
});

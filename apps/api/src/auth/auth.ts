import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import database from "../database";
import { env } from "../config/env";

export const auth = betterAuth({
  basePath: "/auth",
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    },
    github: {
      clientId: env.githubClientId,
      clientSecret: env.githubClientSecret,
    },
  },
  trustedOrigins: [env.clientUrl],
});

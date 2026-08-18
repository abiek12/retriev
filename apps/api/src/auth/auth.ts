import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "../database";
import { env } from "../config/env";
import * as schema from "@repo/database/schema";

export const auth = betterAuth({
  basePath: "api/v1/auth",
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("Password reset requested for:", user.email);
      console.log("Password reset URL:", url);
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // void sendEmail({
      //   to: user.email,
      //   subject: "Verify your email address",
      //   text: `Click the link to verify your email: ${url}`,
      // });
    },
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

import { betterAuth } from "better-auth/minimal";
import { dash, sentinel } from "@better-auth/infra";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "../database";
import { env } from "../config/env";
import * as schema from "@repo/database/schema";
import { emailService } from "../lib/email";

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  plugins: [
    dash({
      apiKey: env.betterAuthApiKey,
      apiUrl: env.betterAuthDashUrl,
    }),
    sentinel({
      apiKey:
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("reset pwd invoked:");
      await emailService.sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetUrl: url,
      })
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await emailService.sendVerificationEmail({
        email: user.email,
        name: user.name,
        verificationUrl: url
      })
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

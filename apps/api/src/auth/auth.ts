import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "../database";
import { env } from "../config/env";
import * as schema from "@repo/database/schema";
import { emailSender } from "../lib/email-sender";

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
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await emailSender.send({
        template: "reset-password",
        to: user.email,
        variables: {
          resetLink: url || `${env.clientUrl}/verify?token=${token}`,
          userEmail: user.email,
          userName: user.name,
          appName: "Retriev",
          expirationMinutes: "60",
        },
      });
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await emailSender.send({
        template: "verify-email",
        to: user.email,
        variables: {
          verificationUrl: url || `${env.clientUrl}/verify?token=${token}`,
          userEmail: user.email,
          verificationCode: "123456", // Optional: for code-based verification
          userName: user.email, // Optional
          appName: "Retriev", // Optional
          expirationMinutes: "60", // Optional
        },
      });
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

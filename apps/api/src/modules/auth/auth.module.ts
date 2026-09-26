import { db } from "../../infrastructure/database";
import AuthRepository from "./auth.repository";
import AuthService from "./auth.service";
import { betterAuth } from "better-auth/minimal";
import { dash } from "@better-auth/infra";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { env } from "../../config/env";
import * as schema from "@repo/database/schema";
import { emailService } from "../../infrastructure/email";
import { admin } from "better-auth/plugins";
import { logger } from "@/common/utils";

const authRepository = new AuthRepository(db);

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  secret: env.betterAuthSecret,
  advanced: {
    database: {
      generateId: "uuid",
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  database: drizzleAdapter(authRepository.database, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
      ...coreFields,
      role: "admin",
      banned: false,
      banReason: null,
      banExpires: null,
      ...additionalFields,
      id,
    }),
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      logger.info("reset pwd invoked:");
      await emailService.sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetUrl: url,
        token,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      logger.info(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      logger.info("Inoked verification mail!");
      await emailService.sendVerificationEmail({
        email: user.email,
        name: user.name,
        verificationUrl: url,
        token,
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
  plugins: [
    dash({
      apiKey: env.betterAuthApiKey,
      apiUrl: env.betterAuthDashUrl,
    }),
    admin({
      defaultRole: "admin",
      adminRoles: ["admin"],
      adminUserIds: ["056b3733-6ffb-4340-beba-b87cbeb94c1f"],
      impersonationSessionDuration: 60 * 60 * 24,
      defaultBanReason: "Spam",
      defaultBanExpiresIn: 60 * 60 * 24,
      bannedUserMessage: "You are banned from this service.",
    }),
  ],
});

export const authService = new AuthService(authRepository);

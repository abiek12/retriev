import { createEmailSender } from "@better-auth/infra";
import { env } from "../config/env";

export const emailSender = createEmailSender({
  apiKey: env.betterAuthSecret,
  apiUrl: env.betterAuthUrl,
});

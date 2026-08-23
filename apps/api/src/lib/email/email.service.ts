import { env } from "../../config/env";
import {
  EmailProvider,
  PasswordResetEmailData,
  VerificationEmailData,
} from "./email.types";

export class EmailService {
  constructor(private readonly provider: EmailProvider) {}

  async sendPasswordResetEmail({
    email,
    name,
    resetUrl,
    token,
  }: PasswordResetEmailData): Promise<void> {
    const clientActionUrl = `${env.clientUrl}/verify-email?token=${encodeURIComponent(token)}`;

    await this.provider.send({
      to: email,
      templateId: "password-reset",
      templateVariables: {
        currentYear: "2026",
        resetLink: clientActionUrl,
        userName: name || "User",
      },
    });
  }

  async sendVerificationEmail({
    email,
    name,
    verificationUrl,
    token,
  }: VerificationEmailData): Promise<void> {
    const clientActionUrl = `${env.clientUrl}/reset-password?token=${encodeURIComponent(token)}`;

    await this.provider.send({
      to: email,
      templateId: "email-verification",
      templateVariables: {
        currentYear: "2026",
        verificationUrl: clientActionUrl,
        userName: name || "User",
      },
    });
  }
}

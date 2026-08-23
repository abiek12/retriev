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
  }: PasswordResetEmailData): Promise<void> {
    await this.provider.send({
      to: email,
      templateId: "password-reset",
      templateVariables: {
        currentYear: 2026,
        resetLink: resetUrl,
        userName: name || "User",
      },
    });
  }

  async sendVerificationEmail({
    email,
    name,
    verificationUrl,
  }: VerificationEmailData): Promise<void> {
    await this.provider.send({
      to: email,
      templateId: "email-verification",
      templateVariables: {
        currentYear: 2026,
        verificationUrl: verificationUrl,
        userName: name || "User",
      },
    });
  }
}

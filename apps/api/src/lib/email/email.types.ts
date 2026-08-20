export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export interface EmailProvider {
  send(options: SendEmailOptions): Promise<void>;
}

export interface PasswordResetEmailData {
  email: string;
  name?: string | null;
  resetUrl: string;
}

export interface VerificationEmailData {
  email: string;
  name?: string | null;
  verificationUrl: string;
}

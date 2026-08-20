import { env } from "../../../config/env";
import { SendEmailOptions, EmailProvider } from "../email.types";
import { Resend } from "resend";

export class ResendEmailProvider implements EmailProvider {
  private readonly resend: Resend;
  
  constructor() {
    this.resend = new Resend(env.resendApiKey);
  }

  async send(options: SendEmailOptions): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: "onboarding@resend.dev",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}

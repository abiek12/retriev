import { env } from "../../../config/env";
import { Resend } from "resend";
import { SendEmailOptions } from "../types/email.types";
import { EmailProvider } from "../types/email.interface";

export class ResendEmailProvider implements EmailProvider {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(env.resendApiKey);
  }

  async send(options: SendEmailOptions): Promise<void> {
    if (!options.templateId || !options.templateVariables) {
      throw new Error(`Failed to send email, missing template details!`);
    }
    const { error } = await this.resend.emails.send({
      from: `Retriev <${env.resendFromEmail}>`,
      to: options.to,
      template: {
        id: options.templateId,
        variables: options.templateVariables,
      },
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}

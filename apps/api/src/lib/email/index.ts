import { EmailService } from "./email.service";
import { ResendEmailProvider } from "./providers/resend.provider";

const emailProvider = new ResendEmailProvider();

export const emailService = new EmailService(emailProvider);

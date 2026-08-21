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
      subject: "Reset your Retriev password",
      html: this.getPasswordResetTemplate({
        email,
        name,
        resetUrl,
      }),
      text: "",
    });
  }

  async sendVerificationEmail({
    email,
    name,
    verificationUrl,
  }: VerificationEmailData): Promise<void> {
    await this.provider.send({
      to: email,
      subject: "Verify your Retriev email",
      html: this.getVerificationTemplate({
        email,
        name,
        verificationUrl,
      }),
      text: "",
    });
  }

  private getPasswordResetTemplate({
    name,
    resetUrl,
  }: PasswordResetEmailData): string {
    return `
       <div>
         <h2>Reset your Retriev password</h2>

         <p>Hi ${name ?? "there"},</p>

         <p>
           We received a request to reset your Retriev password.
         </p>

         <p>
           <a href="${resetUrl}">
             Reset Password
           </a>
         </p>

         <p>
           If you didn't request a password reset, you can safely ignore
           this email.
         </p>

         <p>
           This link will expire according to your password reset policy.
         </p>

         <p>Thanks,<br />Retriev</p>
       </div>
     `;
  }

  private getVerificationTemplate({
    name,
    verificationUrl,
  }: VerificationEmailData): string {
    return `
       <div>
         <h2>Verify your Retriev email</h2>

         <p>Hi ${name ?? "there"},</p>

         <p>
           Please verify your email address to continue using Retriev.
         </p>

         <p>
           <a href="${verificationUrl}">
             Verify Email
           </a>
         </p>

         <p>
           If you didn't create a Retriev account, you can safely ignore
           this email.
         </p>

         <p>Thanks,<br />Retriev</p>
       </div>
     `;
  }
}

export type SendEmailOptions = {
  to: string;
  templateId?: string;
  templateVariables?: Record<string, string | number>;
  subject?: string;
  html?: string;
  text?: string;
};

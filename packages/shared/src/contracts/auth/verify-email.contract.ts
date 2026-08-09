import { z } from "zod";

export const verifyEmailRequestSchema = z.object({
  token: z.string(),
});

export type VerifyEmailRequest = z.infer<typeof verifyEmailRequestSchema>;

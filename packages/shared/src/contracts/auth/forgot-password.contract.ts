import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .email("Enter a valid email address")
    .trim()
    .min(1, "Email is required"),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

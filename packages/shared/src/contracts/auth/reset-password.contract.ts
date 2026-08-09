import z from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

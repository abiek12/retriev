import { password } from "bun";
import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

export type RegisterRequest = z.infer<typeof registerSchema>;

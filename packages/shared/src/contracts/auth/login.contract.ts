import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export type LoginRequest = z.infer<typeof loginSchema>;

import z from "zod";

export const apiErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number().int(),
    message: z.string().optional(),
    data: dataSchema,
    error: apiErrorSchema.optional(),
  });

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
  error: {
    code?: string;
    details?: unknown;
  } | null;
};

import z from "zod";

export const paginationRequestSchema = z.object({
  page: z.coerce.number().int().min(1).positive().default(1),
  limit: z.coerce.number().int().min(1).positive().max(100).default(10),
});

export const paginationResponseSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().min(0).nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    data: z.array(dataSchema),
    pagination: paginationResponseSchema,
  });

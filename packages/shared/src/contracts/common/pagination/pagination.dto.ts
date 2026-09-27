import z from "zod";
import {
  paginationRequestSchema,
  paginationResponseSchema,
} from "./pagination.schema";

export type PaginationRequestDto = z.infer<typeof paginationRequestSchema>;
export type PaginationResponseDto = z.infer<typeof paginationResponseSchema>;

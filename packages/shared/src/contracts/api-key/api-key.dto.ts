import z from "zod";
import {
  createApiKeyRequestSchema,
  createApiKeyResponseSchema,
  getApiKeyResponseSchema,
  getapiKeysRequestSchema,
  rotateApiKeyRequestSchema,
  rotateApiKeyresponseSchema,
  updateApiKeyRequestSchema,
  updateApiKeyResponseSchema,
} from "./api-key.schema";

// 1. Create api key
export type CreateApiKeyRequestDto = z.infer<typeof createApiKeyRequestSchema>;
export type CreateApiKeyResponseDto = z.infer<
  typeof createApiKeyResponseSchema
>;

// 2. Update api key
export type UpdateApiKeyRequestDto = z.infer<typeof updateApiKeyRequestSchema>;
export type UpdateApiKeyResponseDto = z.infer<
  typeof updateApiKeyResponseSchema
>;

// 3. Rotate api key
export type RotateApiKeyRequestDto = z.infer<typeof rotateApiKeyRequestSchema>;
export type RotateApiKeyResponseDto = z.infer<
  typeof rotateApiKeyresponseSchema
>;

// 4. Get api key
export type GetApiKeyRequestDto = z.infer<typeof getapiKeysRequestSchema>;
export type GetApiKeyResponseDto = z.infer<typeof getApiKeyResponseSchema>;

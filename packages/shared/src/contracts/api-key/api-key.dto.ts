import z from "zod";
import {
  createApiKeyRequestSchema,
  createApiKeyResponseSchema,
  getApiKeyResponseSchema,
  getapiKeysRequestSchema,
  rotateApiKeyRequestSchema,
  rotateApiKeyresponseSchema,
} from "./api-key.schema";

// 1. Create api key
export type CreateApiKeyRequestDto = z.infer<typeof createApiKeyRequestSchema>;
export type CreateApiKeyResponseDto = z.infer<
  typeof createApiKeyResponseSchema
>;

// 2. Rotate api key
export type RotateApiKeyRequestDto = z.infer<typeof rotateApiKeyRequestSchema>;
export type RotateApiKeyResponseDto = z.infer<
  typeof rotateApiKeyresponseSchema
>;

// 3. Get api key
export type GetApiKeyRequestDto = z.infer<typeof getapiKeysRequestSchema>;
export type GetApiKeyResponseDto = z.infer<typeof getApiKeyResponseSchema>;

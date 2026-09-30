import z, { uuid } from "zod";
import { llmProviderSchema } from "../../types";
import { ApiKeyCapabilitySchema } from "../../types/enums/api-key.enum";
import {
  createPaginatedResponseSchema,
  paginationRequestSchema,
} from "../common";

// 1. Create API key
export const createApiKeyRequestSchema = z.object({
  title: z.string().trim().min(1).max(100),
  provider: llmProviderSchema,
  capability: ApiKeyCapabilitySchema,
  encryptedKey: z.string().min(1),
});

export const createApiKeyResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
});

// 2. Update API key
export const updateApiKeyRequestSchema = z.object({
  title: z.string().trim().min(1).max(100),
});

export const updateApiKeyResponseSchema = z.object({
  id: z.string(),
});

// 3. Rotate api key
export const rotateApiKeyRequestSchema = z.object({
  encryptedKey: z.string().min(1),
});

export const rotateApiKeyresponseSchema = z.object({
  id: z.string(),
});

// 4. Get api keys
export const getapiKeysRequestSchema = paginationRequestSchema.extend({
  provider: llmProviderSchema.optional(),
});

export const apiKeyResponseSchema = z.object({
  id: uuid(),
  title: z.string(),
  provider: llmProviderSchema,
  capability: ApiKeyCapabilitySchema,
  isPlatform: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getApiKeyResponseSchema =
  createPaginatedResponseSchema(apiKeyResponseSchema);

import z, { uuid } from "zod";
import { llmProviderSchema } from "../../types";
import {
  createPaginatedResponseSchema,
  paginationRequestSchema,
} from "../common";

export const apiKeyTypeSchema = z.enum(["text", "embedding"]);

// 1. Create API key
export const createApiKeyRequestSchema = z.object({
  type: apiKeyTypeSchema,
  provider: llmProviderSchema,
  model: z.string().trim().min(1).max(150),
  apiKey: z.string().min(1),
});

export const createApiKeyResponseSchema = z.object({
  id: z.string(),
});

// 2. Rotate api key
export const rotateApiKeyRequestSchema = z.object({
  apiKey: z.string().min(1),
});

export const rotateApiKeyresponseSchema = z.object({
  id: z.string(),
});

// 3. Get api keys
export const getapiKeysRequestSchema = paginationRequestSchema.extend({
  provider: llmProviderSchema.optional(),
  type: apiKeyTypeSchema.optional(),
});

export const apiKeyResponseSchema = z.object({
  id: uuid(),
  type: apiKeyTypeSchema,
  provider: llmProviderSchema,
  model: z.string(),
  isPlatform: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getApiKeyResponseSchema =
  createPaginatedResponseSchema(apiKeyResponseSchema);

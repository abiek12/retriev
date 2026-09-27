import z from "zod";
import { llmProviderSchema } from "../../types";
import { ApiKeyCapabilitySchema } from "../../types/enums/api-key.enum";

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
  encryptedKey: z.string().min(1),
});

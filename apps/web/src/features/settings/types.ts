import type {
  CreateApiKeyRequestDto,
  GetApiKeyResponseDto,
} from "@repo/shared";

export type ApiKeyType = CreateApiKeyRequestDto["type"];
export type ApiKeyProvider = CreateApiKeyRequestDto["provider"];
export type ApiKeyConfiguration = GetApiKeyResponseDto["data"][number];
export type ApiKeyConfigurations = Record<
  ApiKeyType,
  ApiKeyConfiguration | null
>;
export type ApiKeyPreviewInput = Pick<
  CreateApiKeyRequestDto,
  "provider" | "model"
>;

export const apiKeyTypes: { value: ApiKeyType; label: string }[] = [
  { value: "text", label: "Text Generation" },
  { value: "embedding", label: "Embedding" },
];

export const apiKeyProviders: { value: ApiKeyProvider; label: string }[] = [
  { value: "openai", label: "OpenAI" },
  { value: "openrouter", label: "OpenRouter" },
  { value: "anthropic", label: "Anthropic" },
  { value: "gemini", label: "Gemini" },
  { value: "groq", label: "Groq" },
];

export const providerLabel = (provider: ApiKeyProvider) =>
  apiKeyProviders.find(({ value }) => value === provider)?.label ?? provider;

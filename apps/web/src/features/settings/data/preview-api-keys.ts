import type { ApiKeyConfigurations } from "../types";

// Temporary metadata for the UI review. Replace with API data in the next phase.
// Never put API-key secrets in this fixture or in configuration state.
export const previewApiKeys: ApiKeyConfigurations = {
  text: {
    id: "00000000-0000-4000-8000-000000000001",
    type: "text",
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    isPlatform: false,
    createdAt: "2026-10-18T00:00:00.000Z",
    updatedAt: "2026-10-18T00:00:00.000Z",
  },
  embedding: null,
};

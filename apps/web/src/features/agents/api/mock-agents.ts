
export const mockAgents: Agent[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000001",
    name: "Customer Support",
    description:
      "Handles tier 1 support inquiries and routes complex issues to human agents.",
    avatar: null,
    systemPrompt: "You are a helpful customer support assistant.",
    model: "gpt-4o",
    provider: "openai",
    temperature: "0.70",
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-09-05T08:00:00.000Z",
    updatedAt: "2026-09-05T09:00:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000002",
    name: "Sales Analyst",
    description:
      "Analyzes quarterly pipeline data and generates localized sales forecasts.",
    avatar: null,
    systemPrompt: "You are a sales analytics assistant.",
    model: "claude-3-opus",
    provider: "anthropic",
    temperature: "0.50",
    maxTokens: 4096,
    status: "draft",
    createdAt: "2026-09-04T08:00:00.000Z",
    updatedAt: "2026-09-04T10:00:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000003",
    name: "DB Query Bot",
    description:
      "Translates natural language into complex SQL queries for the analytics team.",
    avatar: null,
    systemPrompt:
      "You translate natural language requests into safe SQL queries.",
    model: "gemini-1.5-pro",
    provider: "google",
    temperature: "0.20",
    maxTokens: 4096,
    status: "offline",
    createdAt: "2026-08-30T08:00:00.000Z",
    updatedAt: "2026-08-31T10:00:00.000Z",
  },
];

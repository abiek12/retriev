import { AgentResponseDto } from "@repo/shared/contracts";

export const mockAgents: AgentResponseDto[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000001",
    name: "Customer Support",
    description:
      "Handles tier 1 support inquiries and routes complex issues to human agents.",
    avatar: null,
    systemPrompt: "You are a helpful customer support assistant.",
    model: "gpt-4o",
    provider: "openai",
    temperature: 0.7,
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-05T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000002",
    name: "Sales Analyst",
    description:
      "Analyzes sales pipeline data and generates forecasts for the sales team.",
    avatar: null,
    systemPrompt: "You are a sales analytics assistant.",
    model: "claude-3-opus",
    provider: "anthropic",
    temperature: 0.5,
    maxTokens: 4096,
    status: "active",
    createdAt: "2026-08-28T08:00:00.000Z",
    updatedAt: "2026-09-04T10:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000003",
    name: "DB Query Bot",
    description:
      "Translates natural language into safe SQL queries for the analytics team.",
    avatar: null,
    systemPrompt:
      "You translate natural language requests into safe SQL queries.",
    model: "gemini-1.5-pro",
    provider: "google",
    temperature: 0.2,
    maxTokens: 4096,
    status: "offline",
    createdAt: "2026-08-25T08:00:00.000Z",
    updatedAt: "2026-08-31T10:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000004",
    name: "HR Assistant",
    description:
      "Answers employee questions about company policies, benefits, and leave.",
    avatar: null,
    systemPrompt: "You are an internal HR assistant.",
    model: "gpt-4o",
    provider: "openai",
    temperature: 0.4,
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-08-20T08:00:00.000Z",
    updatedAt: "2026-08-30T11:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000005",
    name: "Documentation Assistant",
    description:
      "Helps teams find, summarize, and explain internal documentation.",
    avatar: null,
    systemPrompt: "You are an internal documentation assistant.",
    model: "gpt-4o-mini",
    provider: "openai",
    temperature: 0.3,
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-08-18T08:00:00.000Z",
    updatedAt: "2026-08-29T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000006",
    name: "Marketing Writer",
    description:
      "Creates marketing copy for campaigns, landing pages, and product announcements.",
    avatar: null,
    systemPrompt: "You are a professional marketing copywriter.",
    model: "claude-3-opus",
    provider: "anthropic",
    temperature: 0.8,
    maxTokens: 4096,
    status: "draft",
    createdAt: "2026-08-15T08:00:00.000Z",
    updatedAt: "2026-08-28T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000007",
    name: "Code Reviewer",
    description:
      "Reviews pull requests and identifies bugs, security issues, and maintainability concerns.",
    avatar: null,
    systemPrompt:
      "You are an experienced software engineer performing code reviews.",
    model: "gpt-4o",
    provider: "openai",
    temperature: 0.2,
    maxTokens: 4096,
    status: "active",
    createdAt: "2026-08-12T08:00:00.000Z",
    updatedAt: "2026-08-27T12:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000008",
    name: "Research Assistant",
    description:
      "Summarizes research material and extracts important findings from documents.",
    avatar: null,
    systemPrompt:
      "You are a research assistant focused on accurate summarization.",
    model: "gemini-1.5-pro",
    provider: "google",
    temperature: 0.4,
    maxTokens: 8192,
    status: "active",
    createdAt: "2026-08-10T08:00:00.000Z",
    updatedAt: "2026-08-26T14:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000009",
    name: "Finance Assistant",
    description:
      "Answers finance-related questions and helps prepare internal financial reports.",
    avatar: null,
    systemPrompt: "You are a finance operations assistant.",
    model: "gpt-4o",
    provider: "openai",
    temperature: 0.3,
    maxTokens: 4096,
    status: "draft",
    createdAt: "2026-08-05T08:00:00.000Z",
    updatedAt: "2026-08-25T10:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000010",
    name: "Onboarding Assistant",
    description:
      "Guides new employees through onboarding tasks and company resources.",
    avatar: null,
    systemPrompt: "You help new employees complete their onboarding.",
    model: "claude-3-opus",
    provider: "anthropic",
    temperature: 0.6,
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-24T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000011",
    name: "Product Assistant",
    description:
      "Provides product information and helps teams understand feature capabilities.",
    avatar: null,
    systemPrompt: "You are a product knowledge assistant.",
    model: "gpt-4o-mini",
    provider: "openai",
    temperature: 0.5,
    maxTokens: 2048,
    status: "offline",
    createdAt: "2026-07-28T08:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000012",
    name: "Legal Assistant",
    description:
      "Helps teams locate and summarize internal legal policies and agreements.",
    avatar: null,
    systemPrompt: "You are an internal legal information assistant.",
    model: "gemini-1.5-pro",
    provider: "google",
    temperature: 0.2,
    maxTokens: 8192,
    status: "active",
    createdAt: "2026-07-25T08:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000000013",
    name: "IT Helpdesk",
    description:
      "Handles common IT support requests and guides employees through troubleshooting.",
    avatar: null,
    systemPrompt: "You are an IT helpdesk assistant.",
    model: "gpt-4o",
    provider: "openai",
    temperature: 0.4,
    maxTokens: 2048,
    status: "active",
    createdAt: "2026-07-20T08:00:00.000Z",
    updatedAt: "2026-08-18T11:00:00.000Z",
  },

  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-000000001208",
    name: "Research Assistant",
    description:
      "Summarizes research material and extracts important findings from documents.",
    avatar: null,
    systemPrompt:
      "You are a research assistant focused on accurate summarization.",
    model: "gemini-1.5-pro",
    provider: "google",
    temperature: 0.4,
    maxTokens: 8192,
    status: "active",
    createdAt: "2026-08-10T08:00:00.000Z",
    updatedAt: "2026-08-26T14:00:00.000Z",
  },
];

export const getMockAgents = async (
  page: number = 1,
  pageSize: number = 10,
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const agents = mockAgents.slice(start, end);
  const total = mockAgents.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    statusCode: 200,
    message: "Agents fetched successfully",

    data: {
      agents,

      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    },

    error: null,
  };
};

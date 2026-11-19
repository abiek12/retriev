import type {
  KnowledgeListRequestDto,
  KnowledgeListResponseDto,
  KnowledgeResponseDto,
} from "@repo/shared/contracts";

// Mirrors the knowledge base list contract derived from the Drizzle schema.
export const mockKnowledgeBases: KnowledgeResponseDto[] = [
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000001",
    title: "Customer Support FAQ",
    description: "Answers to common customer questions.",
    type: "text",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000002",
    title: "Product Guide.pdf",
    description: "Product features and setup instructions.",
    type: "file",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-02T08:00:00.000Z",
    updatedAt: "2026-09-02T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000003",
    title: "Company Policies",
    description: "Internal policies and employee benefits.",
    type: "text",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-03T08:00:00.000Z",
    updatedAt: "2026-09-03T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000004",
    title: "API Reference.pdf",
    description: "Endpoints, authentication, and integration examples.",
    type: "file",
    status: "processing",
    errorMessage: null,
    createdAt: "2026-09-04T08:00:00.000Z",
    updatedAt: "2026-09-04T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000005",
    title: "Sales Playbook",
    description: "Sales processes and objection handling.",
    type: "text",
    status: "queued",
    errorMessage: null,
    createdAt: "2026-09-05T08:00:00.000Z",
    updatedAt: "2026-09-05T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000006",
    title: "Employee Handbook.pdf",
    description: "A reference for new and existing employees.",
    type: "file",
    status: "uploading",
    errorMessage: null,
    createdAt: "2026-09-06T08:00:00.000Z",
    updatedAt: "2026-09-06T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000007",
    title: "Troubleshooting Guide",
    description: "Steps for resolving common technical issues.",
    type: "text",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-07T08:00:00.000Z",
    updatedAt: "2026-09-07T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000008",
    title: "Release Notes",
    description: "Recent product changes and improvements.",
    type: "text",
    status: "processing",
    errorMessage: null,
    createdAt: "2026-09-08T08:00:00.000Z",
    updatedAt: "2026-09-08T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000009",
    title: "Pricing Overview.pdf",
    description: "Plans, billing terms, and pricing details.",
    type: "file",
    status: "failed",
    errorMessage:
      "Unable to extract text from the uploaded PDF. Please upload a readable copy.",
    createdAt: "2026-09-09T08:00:00.000Z",
    updatedAt: "2026-09-09T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000010",
    title: "Onboarding Checklist",
    description: "Tasks and resources for getting started.",
    type: "text",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-10T08:00:00.000Z",
    updatedAt: "2026-09-10T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000011",
    title: "Security Guidelines.pdf",
    description: "Security practices and access requirements.",
    type: "file",
    status: "queued",
    errorMessage: null,
    createdAt: "2026-09-11T08:00:00.000Z",
    updatedAt: "2026-09-11T09:00:00.000Z",
  },
  {
    id: "b1b2c3d4-e5f6-4a7b-8c9d-000000000012",
    title: "Brand Guidelines.pdf",
    description: "Brand voice and visual identity standards.",
    type: "file",
    status: "ready",
    errorMessage: null,
    createdAt: "2026-09-12T08:00:00.000Z",
    updatedAt: "2026-09-12T09:00:00.000Z",
  },
];

export const getKnowledgeBases = async ({
  page,
  limit,
}: KnowledgeListRequestDto): Promise<KnowledgeListResponseDto> => {
  const start = 1;
  const end = 2;

  return new Promise((resolve) => {
    setTimeout(() => {
      const knowledgeBases = mockKnowledgeBases.slice(start, end);
      const total = mockKnowledgeBases.length;
      const totalPages = Math.ceil(total / limit);

      const resData = {
        data: knowledgeBases,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };

      resolve(resData);
    }, 2000);
  });
};

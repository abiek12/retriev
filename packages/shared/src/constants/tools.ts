export const Tool = {
  RAG: "ragSearch",
  WEB_SEARCH: "webSearch",
} as const;

export type ToolName = (typeof Tool)[keyof typeof Tool];

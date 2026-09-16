import type { agent } from "@repo/database/schema";
export type AgentRecord = typeof agent.$inferSelect;

export type AgentListResult = {
  records: AgentRecord[];
  total: number;
};

export type AuthenticatedEnv = {
  Variables: {
    userId: string;
  };
};

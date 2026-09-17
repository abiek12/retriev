import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { agent } from "@repo/database/schema";

export type Agent = InferSelectModel<typeof agent>;
export type NewAgent = InferInsertModel<typeof agent>;

export type AgentListResult = {
  records: Agent[];
  total: number;
};

export type AuthenticatedEnv = {
  Variables: {
    userId: string;
  };
};

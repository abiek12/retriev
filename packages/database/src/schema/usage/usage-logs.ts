import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";
import { usersTable } from "../auth";

export const usageLogsTable = pgTable("usage_logs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  agentId: uuid("agent_id").notNull(),
  promptTokens: integer("prompt_tokens").notNull(),
  completionTokens: integer("completion_tokens").notNull(),
  cost: integer("cost").notNull(),
  ...auditColumns,
});

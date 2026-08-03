import { integer, numeric, pgTable, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";
import { usersTable } from "../auth";
import { agentsTable } from "../agents";

export const usageLogsTable = pgTable("usage_logs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agentsTable.id, {
      onDelete: "cascade",
    }),
  promptTokens: integer("prompt_tokens").notNull(),
  completionTokens: integer("completion_tokens").notNull(),
  cost: numeric("cost", { precision: 12, scale: 8 }).notNull(),
  ...auditColumns,
});

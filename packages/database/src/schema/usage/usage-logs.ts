import { integer, numeric, pgTable, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";
import { user } from "../auth";
import { agent } from "../agents";

export const usageLog = pgTable("usage_logs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agent.id, {
      onDelete: "cascade",
    }),
  promptTokens: integer("prompt_tokens").notNull().default(0),
  completionTokens: integer("completion_tokens").notNull().default(0),
  cost: numeric("cost", { precision: 12, scale: 8 }).notNull(),
  ...auditColumns,
});

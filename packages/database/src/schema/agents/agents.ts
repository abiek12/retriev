import {
  integer,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { agentStatusEnum, auditColumns, providerEnum } from "../common";
import { usersTable } from "../auth";

export const agentsTable = pgTable("agents", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  name: varchar("name").notNull(),
  description: varchar("description"),
  avatar: varchar("avatar"),
  systemPrompt: text("system_prompt"),
  model: varchar("model"),
  provider: providerEnum("provider").default("openai"),
  temperature: numeric("temperature", { precision: 3, scale: 2 }),
  maxTokens: integer("max_tokens"),
  status: agentStatusEnum("status").default("active"),
  ...auditColumns,
});

import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { agentStatusEnum, providerEnum } from "./enum";
import { auditColumns } from "./audit";

export const agentsTable = pgTable("agents", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  avatar: varchar("avatar"),
  systemPrompt: text("system_prompt"),
  model: varchar("model"),
  provider: providerEnum("provider").default("openai"),
  temperature: varchar("temperature"),
  maxTokens: varchar("max_tokens"),
  status: agentStatusEnum("status").default("active"),
  ...auditColumns,
});

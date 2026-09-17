import {
  integer,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { agentStatusEnum, auditColumns, providerEnum } from "../common";
import { user } from "../auth";

export const agent = pgTable("agents", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  name: varchar("name").notNull(),
  description: varchar("description"),
  avatar: varchar("avatar"),
  systemPrompt: text("system_prompt").notNull(),
  model: varchar("model", { length: 150 })
    .notNull()
    .default("openai/gpt-oss-120b"),
  provider: providerEnum("provider").default("groq").notNull(),
  temperature: numeric("temperature", {
    precision: 3,
    scale: 2,
    mode: "number",
  })
    .notNull()
    .default(0.7),
  maxTokens: integer("max_tokens").notNull().default(2048),
  status: agentStatusEnum("status").default("active").notNull(),
  ...auditColumns,
});

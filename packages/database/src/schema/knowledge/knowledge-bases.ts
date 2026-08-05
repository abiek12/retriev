import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { agent } from "../agents";
import {
  auditColumns,
  knowledgeBaseStatusEnum,
  knowledgeBaseTypeEnum,
} from "../common";

export const knowledgeBase = pgTable("knowledge_bases", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agent.id, {
      onDelete: "cascade",
    }),
  type: knowledgeBaseTypeEnum("type").default("text").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  status: knowledgeBaseStatusEnum("status").default("active").notNull(),
  ...auditColumns,
});

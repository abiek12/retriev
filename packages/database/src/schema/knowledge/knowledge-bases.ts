import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { agentsTable } from "../agents";
import {
  auditColumns,
  knowledgeBaseStatusEnum,
  knowledgeBaseTypeEnum,
} from "../common";

export const knowledgeBasesTable = pgTable("knowledge_bases", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  isGlobal: boolean("is_global").default(false),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agentsTable.id, {
      onDelete: "cascade",
    }),
  type: knowledgeBaseTypeEnum("type").default("text"),
  title: varchar("title").notNull(),
  description: varchar("description"),
  status: knowledgeBaseStatusEnum("status").default("active"),
  ...auditColumns,
});

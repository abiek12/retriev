import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import {
  auditColumns,
  knowledgeBaseStatusEnum,
  knowledgeBaseTypeEnum,
} from "../common";
import { user } from "../auth";

export const knowledgeBase = pgTable(
  "knowledge_bases",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: knowledgeBaseTypeEnum("type").default("text").notNull(),
    title: varchar("title").notNull(),
    description: varchar("description"),
    status: knowledgeBaseStatusEnum("status").default("active").notNull(),
    ...auditColumns,
  },
  (table) => [index("knowledge_bases_user_id_idx").on(table.userId)],
);

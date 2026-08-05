import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { knowledgeBase } from "./knowledge-bases";

export const textSource = pgTable("text_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id")
    .notNull()
    .unique()
    .references(() => knowledgeBase.id, {
      onDelete: "cascade",
    }),
  content: text("content").notNull(),
  ...auditColumns,
});

import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { knowledgeBasesTable } from "./knowledge-bases";

export const textSourcesTable = pgTable("text_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id")
    .notNull()
    .references(() => knowledgeBasesTable.id, {
      onDelete: "cascade",
    }),
  content: varchar("content", { length: 255 }),
  ...auditColumns,
});

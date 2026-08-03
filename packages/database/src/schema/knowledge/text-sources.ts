import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";

export const textSourcesTable = pgTable("text_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id").notNull(),
  content: varchar("content", { length: 255 }),
  ...auditColumns,
});

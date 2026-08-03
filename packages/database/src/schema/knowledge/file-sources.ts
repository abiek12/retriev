import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";

export const fileSourcesTable = pgTable("file_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id").notNull(),
  fileName: varchar("file_name").notNull(),
  storageUrl: varchar("storage_url").notNull(),
  mimeType: varchar("mime_type").notNull(),
  size: varchar("size").notNull(),
  ...auditColumns,
});

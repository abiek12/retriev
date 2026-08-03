import { bigint, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { knowledgeBasesTable } from "./knowledge-bases";

export const fileSourcesTable = pgTable("file_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id")
    .notNull()
    .references(() => knowledgeBasesTable.id, {
      onDelete: "cascade",
    }),
  fileName: varchar("file_name").notNull(),
  storageUrl: varchar("storage_url").notNull(),
  mimeType: varchar("mime_type").notNull(),
  sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
  ...auditColumns,
});

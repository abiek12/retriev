import { bigint, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { knowledgeBase } from "./knowledge-bases";

export const fileSource = pgTable("file_sources", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  knowledgeBaseId: uuid("knowledge_base_id")
    .notNull()
    .unique()
    .references(() => knowledgeBase.id, {
      onDelete: "cascade",
    }),
  fileName: varchar("file_name").notNull(),
  storageUrl: varchar("storage_url").notNull(),
  mimeType: varchar("mime_type").notNull(),
  sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
  ...auditColumns,
});

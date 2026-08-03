import { AnyPgColumn, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { messageRoleEnum } from "../common/enum";
import { conversationsTable } from "./conversations";

export const messagesTable = pgTable("messages", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversationsTable.id, {
      onDelete: "cascade",
    }),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull().default("user"),
  promptToken: integer("prompt_token").notNull(),
  completionToken: integer("completion_token").notNull(),
  parentId: uuid("parent_id").references((): AnyPgColumn => messagesTable.id, {
    onDelete: "set null",
  }),
  ...auditColumns,
});

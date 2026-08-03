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
  promptTokens: integer("prompt_tokens").notNull().default(0),
  completionTokens: integer("completion_tokens").notNull().default(0),
  parentId: uuid("parent_id").references((): AnyPgColumn => messagesTable.id, {
    onDelete: "set null",
  }),
  ...auditColumns,
});

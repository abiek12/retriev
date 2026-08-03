import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { messageRoleEnum } from "../common/enum";

export const messagesTable = pgTable("messages", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  conversationId: uuid("conversation_id").notNull(),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull().default("user"),
  promptToken: integer("prompt_token").notNull(),
  completionToken: integer("completion_token").notNull(),
  parentId: uuid("parent_id"),
  ...auditColumns,
});

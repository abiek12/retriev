import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "./audit";

export const messageToolCallTable = pgTable("message_tool_calls", {
  id: uuid("id").primaryKey().notNull(),
  messageId: uuid("message_id").notNull(),
  toolName: varchar("tool_name").notNull(),
  toolCallId: varchar("tool_call_id").notNull(),
  arguments: text("arguments"),
  result: text("result"),
  status: varchar("status"),
  ...auditColumns,
});

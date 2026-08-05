import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { message } from "./messages";

export const messageToolCall = pgTable("message_tool_calls", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  messageId: uuid("message_id")
    .notNull()
    .references(() => message.id, {
      onDelete: "cascade",
    }),
  toolName: varchar("tool_name").notNull(),
  toolCallId: varchar("tool_call_id").notNull(),
  arguments: text("arguments"),
  result: text("result"),
  status: varchar("status"),
  ...auditColumns,
});

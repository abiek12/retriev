import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { conversationStatusEnum } from "./enum";
import { auditColumns } from "./audit";

export const conversationsTable = pgTable("conversations", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  agentId: uuid("agent_id").notNull(),
  userId: uuid("user_id").notNull(),
  title: varchar("title").notNull(),
  summary: varchar("summary").notNull(),
  status: conversationStatusEnum("status").default("active"),
  lastMessagedAt: timestamp("last_messaged_at").notNull().defaultNow(),
  ...auditColumns,
});

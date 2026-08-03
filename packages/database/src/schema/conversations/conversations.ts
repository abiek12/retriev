import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns, conversationStatusEnum } from "../common";
import { agentsTable } from "../agents";
import { usersTable } from "../auth";

export const conversationsTable = pgTable("conversations", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agentsTable.id, {
      onDelete: "cascade",
    }),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  title: varchar("title").notNull(),
  summary: varchar("summary").notNull(),
  status: conversationStatusEnum("status").default("active"),
  lastMessagedAt: timestamp("last_messaged_at").notNull().defaultNow(),
  ...auditColumns,
});

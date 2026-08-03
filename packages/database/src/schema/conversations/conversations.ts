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
  summary: varchar("summary").notNull().default(""),
  status: conversationStatusEnum("status").default("active").notNull(),
  lastMessagedAt: timestamp("last_messaged_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  ...auditColumns,
});

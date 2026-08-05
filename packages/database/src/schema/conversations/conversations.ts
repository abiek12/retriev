import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns, conversationStatusEnum } from "../common";
import { agent } from "../agents";
import { user } from "../auth";

export const conversation = pgTable("conversations", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agent.id, {
      onDelete: "cascade",
    }),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
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

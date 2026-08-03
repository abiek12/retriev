import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditActionEnum, auditColumns, resourceTypeEnum } from "../common";
import { usersTable } from "../auth";

export const auditLogsTable = pgTable("audit_logs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  action: auditActionEnum("action").default("create").notNull(),
  resourceType: resourceTypeEnum("resource_type").default("user").notNull(),
  resourceId: uuid("resource_id").notNull(),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  ...auditColumns,
});

import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditActionEnum, resourceTypeEnum } from "./enum";
import { auditColumns } from "./audit";

export const auditLogsTable = pgTable("audit_logs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  action: auditActionEnum("action").default("create"),
  resourceType: resourceTypeEnum("resource_type").default("user"),
  resource_id: uuid("resource_id").notNull(),
  metadata: jsonb("metadata"),
  ip_address: varchar("ip_address"),
  user_agent: varchar("user_agent"),
  ...auditColumns,
});

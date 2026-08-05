import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    ...auditColumns,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

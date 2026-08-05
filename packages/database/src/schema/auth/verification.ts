import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";

export const verification = pgTable(
  "verification",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    ...auditColumns,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

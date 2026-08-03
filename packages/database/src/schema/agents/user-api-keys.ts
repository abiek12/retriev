import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { providerEnum } from "../common/enum";
import { usersTable } from "../auth";

export const userApiKeysTable = pgTable("user_api_keys", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  provider: providerEnum("provider").default("openai").notNull(),
  encryptedKey: varchar("encrypted_key").notNull(),
  ...auditColumns,
});

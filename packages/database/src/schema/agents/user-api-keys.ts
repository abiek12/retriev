import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { providerEnum } from "../common/enum";
import { user } from "../auth";

export const userApiKey = pgTable("user_api_keys", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  provider: providerEnum("provider").default("openai").notNull(),
  encryptedKey: varchar("encrypted_key").notNull(),
  ...auditColumns,
});

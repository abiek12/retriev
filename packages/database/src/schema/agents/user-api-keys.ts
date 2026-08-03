import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { providerEnum } from "../common/enum";

export const userApiKeysTable = pgTable("user_api_keys", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id").notNull(),
  provider: providerEnum("provider").default("openai"),
  encryptedKey: varchar("encrypted_key").notNull(),
  ...auditColumns,
});

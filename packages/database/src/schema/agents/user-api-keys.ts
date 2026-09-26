import { boolean, index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { llmApiKeyTypeEnum, providerEnum } from "../common/enum";
import { user } from "../auth";

export const userApiKey = pgTable(
  "user_api_keys",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: varchar("title").default("platform-key(chat)").notNull(),
    userId: uuid("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
    provider: providerEnum("provider").default("openai").notNull(),
    encryptedKey: varchar("encrypted_key").notNull(),
    type: llmApiKeyTypeEnum("type").default("chat").notNull(),
    isPlatform: boolean("is_platform").default(false).notNull(),
    ...auditColumns,
  },
  (table) => [index("user_api_keys_user_id_idx").on(table.userId)],
);

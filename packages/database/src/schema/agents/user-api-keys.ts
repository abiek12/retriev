import {
  boolean,
  index,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { auditColumns } from "../common/audit";
import { apiKeyCapabilityEnum, providerEnum } from "../common/enum";
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
    capability: apiKeyCapabilityEnum("capability").default("chat").notNull(),
    isPlatform: boolean("is_platform").default(false).notNull(),
    ...auditColumns,
  },
  (table) => [
    uniqueIndex("api_keys_user_provider_unique").on(
      table.userId,
      table.provider,
    ),
    index("api_keys_user_capability_idx").on(table.userId, table.capability),
  ],
);

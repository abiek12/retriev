import {
  boolean,
  index,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { auditColumns } from "../common/audit";
import { apiKeyTypeEnum, providerEnum } from "../common/enum";
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
    type: apiKeyTypeEnum("type").notNull(),
    model: varchar("model", { length: 150 }).notNull(),
    isPlatform: boolean("is_platform").default(false).notNull(),
    ...auditColumns,
  },
  (table) => [
    index("api_keys_user_id_idx").on(table.userId),
    uniqueIndex("api_keys_user_type_unique")
      .on(table.userId, table.type)
      .where(sql`${table.userId} is not null`),
  ],
);

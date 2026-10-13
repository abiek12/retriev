import {
  boolean,
  check,
  index,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { auditColumns } from "../common/audit";
import { providerEnum } from "../common/enum";
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
    supportText: boolean("support_text").notNull().default(false),
    supportEmbedding: boolean("support_embedding").notNull().default(false),
    isPlatform: boolean("is_platform").default(false).notNull(),
    ...auditColumns,
  },
  (table) => [
    check(
      "api_keys_at_least_one_capability_check",
      sql`${table.supportText} or ${table.supportEmbedding}`,
    ),
    index("api_keys_user_id_idx").on(table.userId),
    uniqueIndex("api_keys_user_text_unique")
      .on(table.userId)
      .where(sql`${table.userId} is not null and ${table.supportText}`),
    uniqueIndex("api_keys_user_embedding_unique")
      .on(table.userId)
      .where(sql`${table.userId} is not null and ${table.supportEmbedding}`),
  ],
);

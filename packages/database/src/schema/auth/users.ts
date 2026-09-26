import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { roleEnum } from "../common/enum";
import { auditColumns } from "../common/audit";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { precision: 6, withTimezone: true }),
  ...auditColumns,
});

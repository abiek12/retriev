import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { roleEnum } from "../common/enum";
import { auditColumns } from "../common/audit";

export const usersTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
  ...auditColumns,
});

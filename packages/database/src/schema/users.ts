import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { roleEnum, userStatusEnum } from "./enum";
import { auditColumns } from "./audit";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  status: userStatusEnum("status").default("active").notNull(),
  role: roleEnum("role").default("user").notNull(),
  ...auditColumns,
});

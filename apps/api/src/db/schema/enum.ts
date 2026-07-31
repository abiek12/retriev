import { pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", ["active", "inActive"]);
export const roleEnum = pgEnum("role", ["admin", "user"]);

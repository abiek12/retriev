import { createDatabase } from "@repo/database";
import { env } from "../config/env";

const database = createDatabase(env.databaseUrl);

export const db = database.db;
export const client = database.client;

export default database;

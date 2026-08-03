import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const createDatabase = (connectionString: string) => {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle({ client });

  return {
    db,
    client,
  };
};

export type Database = ReturnType<typeof createDatabase>["db"];

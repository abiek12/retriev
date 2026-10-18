import { describe, expect, test } from "bun:test";
import { drizzle } from "drizzle-orm/pg-proxy";
import type { Database } from "@repo/database";
import ApiKeyRepository from "./api-key.repository";

function setup() {
  const queries: { sql: string; params: unknown[] }[] = [];
  const database = drizzle(async (sql, params) => {
    queries.push({ sql, params });
    return { rows: [] };
  });
  // Use the proxy adapter to inspect real SQL without connecting to PostgreSQL.
  const repository = new ApiKeyRepository(database as unknown as Database);
  return { repository, queries };
}

describe("platform API-key protection", () => {
  for (const operation of [
    "findById",
    "update",
    "delete",
    "findTypeConflict",
  ] as const) {
    test(`${operation} only targets the user's non-platform keys`, async () => {
      const { repository, queries } = setup();
      if (operation === "update") {
        await repository.update("key-id", "user-id", {
          encryptedKey: "replacement",
        });
      } else if (operation === "findTypeConflict") {
        await repository.findTypeConflict("user-id", "text");
      } else {
        await repository[operation]("key-id", "user-id");
      }

      expect(queries).toHaveLength(1);
      expect(queries[0]!.sql).toContain('"user_id" =');
      expect(queries[0]!.sql).toContain('"is_platform" =');
      expect(queries[0]!.params).toContain("user-id");
      expect(queries[0]!.params).toContain(false);
    });
  }
});

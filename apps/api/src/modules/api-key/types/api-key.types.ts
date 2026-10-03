import { userApiKey } from "@repo/database";
import { InferSelectModel } from "drizzle-orm";

export type ApiKey = InferSelectModel<typeof userApiKey>;
export type NewApiKey = InferSelectModel<typeof userApiKey>;

export type ApiKeyListResult = {
  records: ApiKey[];
  total: number;
};

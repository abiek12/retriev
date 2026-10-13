import { userApiKey } from "@repo/database";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { CommonListQuery } from "@/common/types/common.type";

export type ApiKey = InferSelectModel<typeof userApiKey>;
export type NewApiKey = InferInsertModel<typeof userApiKey>;

export type ApiKeyListQuery = CommonListQuery & {
  provider?: ApiKey["provider"];
};

export type ApiKeyListResult = {
  records: ApiKey[];
  total: number;
};

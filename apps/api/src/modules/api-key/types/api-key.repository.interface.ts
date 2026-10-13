import { IBaseRepository } from "@/core/repositories";
import { NewApiKey, ApiKey } from "./api-key.types";
import { ApiKeyListQuery, ApiKeyListResult } from "./api-key.types";

export interface IApiKeyRepository extends IBaseRepository {
  create: (data: NewApiKey) => Promise<Pick<ApiKey, "id" | "title">>;

  findMany: (
    userId: string,
    queries: ApiKeyListQuery,
  ) => Promise<ApiKeyListResult>;

  findById: (id: string, userId: string) => Promise<ApiKey | null>;

  update: (
    id: string,
    userId: string,
    data: Partial<NewApiKey>,
  ) => Promise<ApiKey | null>;

  delete: (id: string, userId: string) => Promise<boolean>;

  findByUserAndProvider: (
    userId: string,
    provider: ApiKey["provider"],
  ) => Promise<ApiKey | null>;
}

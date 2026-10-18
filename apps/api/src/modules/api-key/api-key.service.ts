import {
  CreateApiKeyRequestDto,
  CreateApiKeyResponseDto,
  GetApiKeyRequestDto,
  GetApiKeyResponseDto,
  RotateApiKeyRequestDto,
  RotateApiKeyResponseDto,
} from "@repo/shared";
import { HTTPException } from "hono/http-exception";
import { encrypt } from "@/infrastructure/security";
import { BaseService } from "@/core/services";
import type {
  ApiKeyProvider,
  ApiKeyValidatorResolver,
} from "@/core/ports/api-key-validator.interface";
import { ApiKey, IApiKeyRepository, IApiKeyService } from "./types";

class ApiKeyService
  extends BaseService<IApiKeyRepository>
  implements IApiKeyService
{
  constructor(
    repository: IApiKeyRepository,
    private readonly getValidator: ApiKeyValidatorResolver,
  ) {
    super(repository);
  }

  create = async (
    userId: string,
    data: CreateApiKeyRequestDto,
  ): Promise<CreateApiKeyResponseDto> => {
    const existing = await this.repository.findTypeConflict(userId, data.type);

    if (existing) {
      throw new HTTPException(409, {
        message: `An API key already exists for ${data.type}.`,
      });
    }

    await this.validateKey(data.provider, data.apiKey);

    try {
      return await this.repository.create({
        userId,
        title: `${data.provider} ${data.type}`,
        provider: data.provider,
        type: data.type,
        model: data.model,
        encryptedKey: encrypt(data.apiKey),
        isPlatform: false,
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new HTTPException(409, {
          message: `An API key already exists for ${data.type}.`,
        });
      }

      throw error;
    }
  };

  list = async (
    userId: string,
    data: GetApiKeyRequestDto,
  ): Promise<GetApiKeyResponseDto> => {
    const { records, total } = await this.repository.findMany(userId, data);

    return {
      data: records.map(toApiKeyResponse),
      pagination: {
        page: data.page,
        limit: data.limit,
        total,
        totalPages: Math.ceil(total / data.limit),
      },
    };
  };

  rotate = async (
    id: string,
    userId: string,
    data: RotateApiKeyRequestDto,
  ): Promise<RotateApiKeyResponseDto> => {
    const existing = await this.repository.findById(id, userId);

    if (!existing) {
      throw new HTTPException(404, { message: "API key not found." });
    }

    await this.validateKey(existing.provider, data.apiKey);

    const record = await this.repository.update(id, userId, {
      encryptedKey: encrypt(data.apiKey),
    });

    if (!record) {
      throw new HTTPException(404, { message: "API key not found." });
    }

    return { id: record.id };
  };

  delete = async (id: string, userId: string): Promise<void> => {
    const deleted = await this.repository.delete(id, userId);

    if (!deleted) {
      throw new HTTPException(404, { message: "API key not found." });
    }
  };

  private async validateKey(provider: ApiKeyProvider, apiKey: string) {
    const result = await this.getValidator(provider).validate(apiKey);
    if (!result.valid) {
      throw new HTTPException(
        result.reason === "validation_unavailable" ? 503 : 422,
        { message: result.message },
      );
    }
  }
}

const toApiKeyResponse = (record: ApiKey) => ({
  id: record.id,
  type: record.type,
  provider: record.provider,
  model: record.model,
  isPlatform: record.isPlatform,
  createdAt: record.createdAt.toISOString(),
  updatedAt: record.updatedAt.toISOString(),
});

const isUniqueConstraintViolation = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return error.code === "23505";
};

export default ApiKeyService;

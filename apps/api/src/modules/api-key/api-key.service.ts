import {
  CreateApiKeyRequestDto,
  CreateApiKeyResponseDto,
  GetApiKeyRequestDto,
  GetApiKeyResponseDto,
  RotateApiKeyRequestDto,
  RotateApiKeyResponseDto,
  UpdateApiKeyRequestDto,
  UpdateApiKeyResponseDto,
} from "@repo/shared";
import { HTTPException } from "hono/http-exception";
import { encrypt } from "@/infrastructure/security";
import { BaseService } from "@/core/services";
import { ApiKey, IApiKeyRepository, IApiKeyService } from "./types";

class ApiKeyService
  extends BaseService<IApiKeyRepository>
  implements IApiKeyService
{
  create = async (
    userId: string,
    data: CreateApiKeyRequestDto,
  ): Promise<CreateApiKeyResponseDto> => {
    const existing = await this.repository.findByUserAndProvider(
      userId,
      data.provider,
    );

    if (existing) {
      throw new HTTPException(409, {
        message: "An API key for this provider already exists.",
      });
    }

    try {
      return await this.repository.create({
        userId,
        title: data.title,
        provider: data.provider,
        capability: data.capability,
        encryptedKey: encrypt(data.encryptedKey),
        isPlatform: false,
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new HTTPException(409, {
          message: "An API key for this provider already exists.",
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

  update = async (
    id: string,
    userId: string,
    data: UpdateApiKeyRequestDto,
  ): Promise<UpdateApiKeyResponseDto> => {
    const record = await this.repository.update(id, userId, data);

    if (!record) {
      throw new HTTPException(404, { message: "API key not found." });
    }

    return { id: record.id };
  };

  rotate = async (
    id: string,
    userId: string,
    data: RotateApiKeyRequestDto,
  ): Promise<RotateApiKeyResponseDto> => {
    const record = await this.repository.update(id, userId, {
      encryptedKey: encrypt(data.encryptedKey),
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
}

const toApiKeyResponse = (record: ApiKey) => ({
  id: record.id,
  title: record.title,
  provider: record.provider,
  capability: record.capability,
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

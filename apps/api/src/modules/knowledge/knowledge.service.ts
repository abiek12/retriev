import {
  CreateKnowledgeRequestDto,
  CreateKnowledgeResponseDto,
  DeleteKnowledgeResponseDto,
  KnowledgeListRequestDto,
  KnowledgeListResponseDto,
  KnowledgeResponseDto,
  UpdateKnowledgeRequestDto,
  UpdateKnowledgeResponseDto,
} from "@repo/shared";
import { BaseService } from "../../core/services";
import { IKnowledgeRepository, IKnowledgeService } from "./types";
import { HTTPException } from "hono/http-exception";
import { logger } from "@/common/utils";
import { ICacheProvider } from "@/infrastructure/cache/types/cache.interface";
import { createCacheKey } from "@/common/utils/cache-key.util";

class KnowledgeService
  extends BaseService<IKnowledgeRepository>
  implements IKnowledgeService
{
  private cacheProvider: ICacheProvider;

  constructor(repository: IKnowledgeRepository, cacheProvider: ICacheProvider) {
    super(repository);
    this.cacheProvider = cacheProvider;
  }

  create = async (
    userId: string,
    payload: CreateKnowledgeRequestDto,
  ): Promise<CreateKnowledgeResponseDto> => {
    let result: CreateKnowledgeResponseDto;

    // 1. Create knowledge base
    switch (payload.type) {
      case "text": {
        const record = await this.repository.createText({
          userId,
          title: payload.title,
          description: payload.description,
          content: payload.content,
        });

        result = {
          id: record.id,
          title: record.title,
          description: record.description,
          type: "text",
          status: record.status,
          errorMessage: record.errorMessage,
          createdAt: record.createdAt.toISOString(),
          updatedAt: record.updatedAt.toISOString(),
        };
        break;
      }

      case "file":
        throw new HTTPException(501, {
          message: "File knowledge creation is not implemented yet",
        });

      case "url":
        throw new HTTPException(501, {
          message: "URL knowledge creation is not implemented yet",
        });
    }

    // 2. Invalidate cache
    const targetCachePattern = createCacheKey("knowledge-bases", userId, "*");
    try {
      await this.cacheProvider.deleteByPattern(targetCachePattern);
    } catch (error) {
      logger.warn(error, "Failed to invalidate knowledge-base cache");
    }

    return result;
  };

  list = async (
    userId: string,
    query: KnowledgeListRequestDto,
  ): Promise<KnowledgeListResponseDto> => {
    void userId;
    void query;
    throw new HTTPException(501, {
      message: "Knowledge-base listing is not implemented yet",
    });
  };

  getById = async (
    id: string,
    userId: string,
  ): Promise<KnowledgeResponseDto> => {
    void id;
    void userId;
    throw new HTTPException(501, {
      message: "Knowledge-base retrieval is not implemented yet",
    });
  };

  update = async (
    id: string,
    userId: string,
    payload: UpdateKnowledgeRequestDto,
  ): Promise<UpdateKnowledgeResponseDto> => {
    void id;
    void userId;
    void payload;
    throw new HTTPException(501, {
      message: "Knowledge-base updates are not implemented yet",
    });
  };

  delete = async (
    id: string,
    userId: string,
  ): Promise<DeleteKnowledgeResponseDto> => {
    void id;
    void userId;
    throw new HTTPException(501, {
      message: "Knowledge-base deletion is not implemented yet",
    });
  };

  completeFileUpload = async (id: string, userId: string): Promise<never> => {
    void id;
    void userId;
    throw new HTTPException(501, {
      message: "File upload completion is not implemented yet",
    });
  };
}

export default KnowledgeService;

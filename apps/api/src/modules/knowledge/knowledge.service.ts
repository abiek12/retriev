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
    let returnData: CreateKnowledgeResponseDto;

    // 1. Create knowledge base
    switch (payload.type) {
      case "text": {
        const record = await this.repository.createText({
          userId,
          ...payload,
        });

        returnData = {
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
    const targetCachePattern = createCacheKey("knowledge", userId, "*");
    try {
      await this.cacheProvider.deleteByPattern(targetCachePattern);
    } catch (error) {
      logger.error(error, "Failed to invalidate agent cache");
      throw new HTTPException(500, {
        message: "Error while invalidate cache!",
      });
    }

    // 3. Publish message to queue
    try {
      // publish message
    } catch (error) {
      // Failed to queue knowledge for processing
      await this.repository.markFailed(
        returnData.id,
        userId,
        "Failed to queue knowledge for processing",
      );
      logger.error(error, "Failed to publish message queue");
      throw new HTTPException(503, {
        message: "Knowledge was created but could not be queued",
      });
    }

    // 4. Return
    return returnData;
  };

  list = async (
    userId: string,
    query: KnowledgeListRequestDto,
  ): Promise<KnowledgeListResponseDto> => {
    void userId;
    void query;

    throw new HTTPException(503, {
      message: "Not implemented yet",
    });
  };

  getById = async (
    id: string,
    userId: string,
  ): Promise<KnowledgeResponseDto> => {
    void id;
    void userId;
    throw new HTTPException(503, {
      message: "Not implemented yet",
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
    throw new HTTPException(503, {
      message: "Not implemented yet",
    });
  };

  delete = async (
    id: string,
    userId: string,
  ): Promise<DeleteKnowledgeResponseDto> => {
    void id;
    void userId;
    throw new HTTPException(503, {
      message: "Not implemented yet",
    });
  };

  completeFileUpload = async (id: string, userId: string): Promise<void> => {
    void id;
    void userId;
    throw new HTTPException(503, {
      message: "Not implemented yet",
    });
  };
}

export default KnowledgeService;

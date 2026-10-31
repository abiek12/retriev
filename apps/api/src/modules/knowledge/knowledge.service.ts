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
import { IKnowledgeRepository, IKnowledgeService, Knowledge } from "./types";
import { HTTPException } from "hono/http-exception";
import { logger } from "@/common/utils";
import { ICacheProvider } from "@/infrastructure/cache/types/cache.interface";
import { createCacheKey } from "@/common/utils/cache-key.util";
import { CACHE_LIST_API_TTL } from "@/common/constants/app.constants";

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
    // 1. Prepare cache key
    const cacheParts = [String(query.page), String(query.limit)];
    if (query.search) cacheParts.push(`search:${query.search}`);
    if (query.status) cacheParts.push(`status:${query.status}`);
    if (query.type) cacheParts.push(`type:${query.type}`);

    const cacheKey = createCacheKey(
      "knowledge",
      userId,
      "lists",
      ...cacheParts,
    );

    // 2. Cache check
    const cached =
      await this.cacheProvider.get<KnowledgeListResponseDto>(cacheKey);
    if (cached) return cached;

    // 3. Fetch data
    const { records, total } = await this.repository.findMany(userId, query);

    // 4. Format
    const data: KnowledgeResponseDto[] = records.map(this.toResponseDto);
    const responseData: KnowledgeListResponseDto = {
      data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };

    // 5. Update cache
    await this.cacheProvider.set(cacheKey, responseData, {
      ttl: CACHE_LIST_API_TTL,
    });

    // 6. Return response
    return responseData;
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

  // Private methods
  private toResponseDto = (record: Knowledge): KnowledgeResponseDto => ({
    id: record.id,
    title: record.title,
    type: record.type,
    description: record.description,
    status: record.status,
    errorMessage: record.errorMessage,
    createdAt: record.createdAt.toDateString(),
    updatedAt: record.updatedAt.toDateString(),
  });
}

export default KnowledgeService;

import {
  AgentListRequestDto,
  AgentListResponseDto,
  AgentResponseDto,
  CreateAgentRequestDto,
  CreateAgentResponseDto,
  UpdateAgentRequestDto,
  UpdateAgentResponseDto,
} from "@repo/shared";
import { BaseService } from "../../core/services";
import { Agent, IAgentRepository, IAgentService } from "./types";
import { HTTPException } from "hono/http-exception";
import { ICacheProvider } from "@/infrastructure/cache/types/cache.interface";
import { createCacheKey } from "@/common/utils/cache-key.util";
import { user } from "@repo/database";
import {
  CACHE_DETAIL_API_TTL,
  CACHE_LIST_API_TTL,
} from "@/common/constants/app.constants";

class AgentService
  extends BaseService<IAgentRepository>
  implements IAgentService
{
  private cacheProvider: ICacheProvider;

  constructor(repository: IAgentRepository, cacheProvider: ICacheProvider) {
    super(repository);
    this.cacheProvider = cacheProvider;
  }

  // List all agents
  list = async (
    userId: string,
    query: AgentListRequestDto,
  ): Promise<AgentListResponseDto> => {
    const cacheParts = [String(query.page), String(query.limit)];
    if (query.search) cacheParts.push(`search:${query.search}`);
    if (query.status) cacheParts.push(`status:${query.status}`);

    // Create cache key
    const key = createCacheKey("agents", "list", userId, ...cacheParts);

    // Check cache
    const cached = await this.cacheProvider.get<AgentListResponseDto>(key);
    if (cached) {
      return cached;
    }

    const { records, total } = await this.repository.findMany(userId, query);

    const data: AgentResponseDto[] = records.map(this.toAgentResponseDto);

    const result: AgentListResponseDto = {
      data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };

    // Set cache
    await this.cacheProvider.set(key, result, { ttl: CACHE_LIST_API_TTL });

    return result;
  };

  // Create agent
  create = async (
    userId: string,
    payload: CreateAgentRequestDto,
  ): Promise<CreateAgentResponseDto> => {
    const record = await this.repository.create({
      userId,
      ...payload,
    });

    return record;
  };

  // Get by id
  getById = async (
    id: string,
    userId: string,
  ): Promise<AgentResponseDto | null> => {
    // Cache key
    const key = createCacheKey("agents", "detail", userId, id);

    // Cache check
    const cached = await this.cacheProvider.get<AgentResponseDto>(key);
    // Cache hit
    if (cached) {
      return cached;
    }

    // Cache miss
    const record = await this.repository.findById(id, userId);

    if (!record) {
      throw new HTTPException(404, { message: "Agent not found!" });
    }

    const result = this.toAgentResponseDto(record);

    // Store in cache
    await this.cacheProvider.set(key, result, { ttl: CACHE_DETAIL_API_TTL });

    return result;
  };

  // Update agent
  update = async (
    id: string,
    userId: string,
    payload: UpdateAgentRequestDto,
  ): Promise<UpdateAgentResponseDto | null> => {
    const record = await this.repository.updateById(id, userId, payload);

    if (!record) {
      throw new HTTPException(404, { message: "Agent not found!" });
    }

    return record;
  };

  // Delete agent
  delete = async (id: string, userId: string): Promise<void> => {
    const record = await this.repository.deleteById(id, userId);

    if (!record) {
      throw new HTTPException(404, { message: "Agent not found!" });
    }
  };

  // Private utility methods
  private toAgentResponseDto = (record: Agent): AgentResponseDto => ({
    id: record.id,
    name: record.name,
    description: record.description,
    avatar: record.avatar,
    systemPrompt: record.systemPrompt,
    model: record.model,
    provider: record.provider,
    temperature:
      record.temperature === null ? null : Number(record.temperature),
    maxTokens: record.maxTokens,
    status: record.status,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  });
}

export default AgentService;

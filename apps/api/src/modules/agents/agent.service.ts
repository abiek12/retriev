import {
  AgentListRequestDto,
  AgentListResponseDto,
  AgentResponseDto,
  CreateAgentRequestDto,
  CreateAgentResponseDto,
  GetAgentResponseDto,
} from "@repo/shared";
import { BaseService } from "../../core/services";
import { IAgentRepository, IAgentService } from "./types";

class AgentService
  extends BaseService<IAgentRepository>
  implements IAgentService
{
  constructor(repository: IAgentRepository) {
    super(repository);
  }

  list = async (
    userId: string,
    query: AgentListRequestDto,
  ): Promise<AgentListResponseDto> => {
    const { records, total } = await this.repository.findMany(userId, query);

    const data: AgentResponseDto[] = records.map((record) => ({
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
    }));

    return {
      data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  };

  create = async (
    userId: string,
    payload: CreateAgentRequestDto,
  ): Promise<CreateAgentResponseDto> => {
    const res = await this.repository.create({
      userId,
      ...payload,
    });

    return res;
  };

  getById = async (
    id: string,
    userId: string,
  ): Promise<AgentResponseDto | null> => {
    const record = await this.repository.findById(id, userId);

    if (!record) {
      throw new Error("Agent not found!");
    }

    return {
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
    };
  };
}

export default AgentService;

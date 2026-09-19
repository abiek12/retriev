import {
  AgentListRequestDto,
  AgentListResponseDto,
  AgentResponseDto,
  CreateAgentRequestDto,
  CreateAgentResponseDto,
  GetAgentResponseDto,
  UpdateAgentRequestDto,
  UpdateAgentResponseDto,
} from "@repo/shared";
import { BaseService } from "../../core/services";
import { IAgentRepository, IAgentService } from "./types";
import { HTTPException } from "hono/http-exception";

class AgentService
  extends BaseService<IAgentRepository>
  implements IAgentService
{
  constructor(repository: IAgentRepository) {
    super(repository);
  }

  // List all agents
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
    const record = await this.repository.findById(id, userId);

    if (!record) {
      throw new HTTPException(404, { message: "Agent not found!" });
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
}

export default AgentService;

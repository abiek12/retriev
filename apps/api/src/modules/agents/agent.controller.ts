import { Context } from "hono";
import {
  AgentListRequestDto,
  CreateAgentRequestDto,
  updateAgentRequestSchema,
} from "@repo/shared";
import { IAgentService } from "./types";
import { ApiResponse } from "../../common/utils";

class AgentController {
  constructor(private agentService: IAgentService) {}

  list = async (c: Context, query: AgentListRequestDto) => {
    const userId = c.get("userId");
    const res = await this.agentService.list(userId, query);

    return c.json(ApiResponse.success(res));
  };

  getById = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");

    if (!id) {
      throw new Error("Agent ID is required");
    }

    const agent = await this.agentService.getById(id, userId);

    return c.json(ApiResponse.success(agent));
  };

  create = async (c: Context) => {
    const userId = c.get("userId");
    const payload: CreateAgentRequestDto = await c.req.json();
    const res = await this.agentService.create(userId, payload);

    return c.json(ApiResponse.success(res));
  };

  update = async (c: Context) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    const payload = await c.req.json();

    if (!id) {
      throw new Error("Agent ID is required");
    }

    const validatedPayload = updateAgentRequestSchema.parse(payload);

    const agent = await this.agentService.update(id, userId, validatedPayload);

    return c.json(ApiResponse.success(agent));
  };

  delete = async (c: Context) => {
    const userId = c.get("userId");

    const id = c.req.param("id");

    if (!id) {
      throw new Error("Agent ID is required");
    }

    await this.agentService.delete(id, userId);

    return c.json(ApiResponse.success(null));
  };
}

export default AgentController;

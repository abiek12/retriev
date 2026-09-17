import { Context } from "hono";
import { AgentListRequestDto, CreateAgentRequestDto } from "@repo/shared";
import { IAgentService } from "./types";
import { ApiResponse } from "../../common/utils";

class AgentController {
  constructor(private agentService: IAgentService) {}

  list = async (c: Context, query: AgentListRequestDto) => {
    const userId = "71bb5cd9-0a04-4a97-a92c-efa4bdf45dc5";
    const res = await this.agentService.list(userId, query);

    return c.json(ApiResponse.success(res));
  };

  getById = async (c: Context) => {};

  create = async (c: Context) => {
    const userId = "71bb5cd9-0a04-4a97-a92c-efa4bdf45dc5";
    const payload: CreateAgentRequestDto = await c.req.json();
    const res = await this.agentService.create(userId, payload);

    return c.json(ApiResponse.success(res));
  };

  update = async (c: Context) => {};

  delete = async (c: Context) => {};
}

export default AgentController;

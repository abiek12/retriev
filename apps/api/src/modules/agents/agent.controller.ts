import { Context } from "hono";
import { AgentListRequestDto } from "@repo/shared";
import { IAgentService } from "./types";

class AgentController {
  constructor(private agentService: IAgentService) {}

  list = async (c: Context, query: AgentListRequestDto) => {
    const userId = "71bb5cd9-0a04-4a97-a92c-efa4bdf45dc5";
    const agents = await this.agentService.list(userId, query);
    return c.json(agents);
  };

  getById = async (c: Context) => {};

  create = async (c: Context) => {};

  update = async (c: Context) => {};

  delete = async (c: Context) => {};
}

export default AgentController;

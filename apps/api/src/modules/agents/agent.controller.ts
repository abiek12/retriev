import { Context } from "hono";
import { IAgentService } from "./types/agent.service.interface";

class AgentController {
  constructor(private agentService: IAgentService) {}

  list = async (c: Context) => {};

  getById = async (c: Context) => {};

  create = async (c: Context) => {};

  update = async (c: Context) => {};

  delete = async (c: Context) => {};
}

export default AgentController;

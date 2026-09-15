import { BaseService } from "../../core/services";
import { IAgentRepository } from "./types/agent.repository.interface";
import { IAgentService } from "./types/agent.service.interface";

class AgentService
  extends BaseService<IAgentRepository>
  implements IAgentService
{
  constructor(repository: IAgentRepository) {
    super(repository);
  }
}

export default AgentService;

import { BaseRepository } from "../../core/repositories";
import { IAgentRepository } from "./types/agent.repository.interface";

class AgentRepository extends BaseRepository implements IAgentRepository {}

export default AgentRepository;

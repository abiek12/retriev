import { createInfrastructure } from "@/config/infrastructure";
import { db } from "../../infrastructure/database";
import AgentController from "./agent.controller";
import AgentRepository from "./agent.repository";
import AgentService from "./agent.service";

// Infra
const { cacheProvider } = createInfrastructure();

// Agent repository instance with db DI
const agentRepository = new AgentRepository(db);

// Agent service instance with repository DI
const agentService = new AgentService(agentRepository, cacheProvider);

// Agent controller instance with service DI
export const agentController = new AgentController(agentService);

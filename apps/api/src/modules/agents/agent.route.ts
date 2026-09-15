import { Hono } from "hono";
import { agentController } from "./agent.module";

const agentRoutes = new Hono();

// Get all agents
agentRoutes.get("/", agentController.list);

// Get agent by ID
agentRoutes.get("/:id", agentController.getById);

// Create a new agent
agentRoutes.post("/", agentController.create);

// Update an agent
agentRoutes.put("/:id", agentController.update);

// Delete an agent
agentRoutes.delete("/:id", agentController.delete);

export default agentRoutes;

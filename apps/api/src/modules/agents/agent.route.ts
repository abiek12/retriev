import { Hono } from "hono";
import { agentController } from "./agent.module";
import { zValidator } from "@hono/zod-validator";
import {
  agentListRequestSchema,
  agentRequestSchema,
  createAgentRequestSchema,
  deleteAgentRequestSchema,
  updateAgentRequestSchema,
} from "@repo/shared";

const agentRoutes = new Hono();

// Get all agents
agentRoutes.get("/", zValidator("query", agentListRequestSchema), async (c) => {
  const query = c.req.valid("query");
  return agentController.list(c, query);
});

// Get agent by ID
agentRoutes.get(
  "/:id",
  zValidator("param", agentRequestSchema),
  agentController.getById,
);

// Create a new agent
agentRoutes.post(
  "/",
  zValidator("json", createAgentRequestSchema),
  agentController.create,
);

// Update an agent
agentRoutes.put(
  "/:id",
  zValidator("json", updateAgentRequestSchema),
  agentController.update,
);

// Delete an agent
agentRoutes.delete(
  "/:id",
  zValidator("query", deleteAgentRequestSchema),
  agentController.delete,
);

export default agentRoutes;

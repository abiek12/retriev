import { Hono } from "hono";
import { agentController } from "./agent.module";
import { zValidator } from "@hono/zod-validator";
import {
  agentIdSchema,
  agentListRequestSchema,
  agentRequestSchema,
  createAgentRequestSchema,
  deleteAgentRequestSchema,
  updateAgentRequestSchema,
} from "@repo/shared";
import { authMiddlware } from "@/common/middlewares/auth.middleware";

const agentRoutes = new Hono();

// Apply agent auth session middleware to all agent endpoints
agentRoutes.use("*", authMiddlware);

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
  zValidator("param", agentIdSchema),
  zValidator("json", updateAgentRequestSchema),
  agentController.update,
);

// Delete an agent
agentRoutes.delete(
  "/:id",
  zValidator("param", deleteAgentRequestSchema),
  agentController.delete,
);

export default agentRoutes;

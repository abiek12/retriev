import { Hono } from "hono";
import knowledgeRoutes from "./modules/knowledge/knowledge.route";
import chatRoutes from "./modules/chat/chat.route";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoute from "./modules/auth/auth.route";
import { env } from "./config/env";
import { globalExceptionHandler } from "./common/middlewares";
import agentRoutes from "./modules/agents/agent.route";

// Initialize the main application and set the global prefix
const app = new Hono().basePath("/api/v1");

// Apply the logger globally to all routes
app.use(logger());

// Cors
app.use(
  "*",
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

// Global exception handler
app.onError(globalExceptionHandler);

app.get("/", (c) => {
  return c.text("Hono server is running!");
});

// Register routes
app.route("/knowledge-bases", knowledgeRoutes);
app.route("/chat", chatRoutes);
app.route("/auth", authRoute);
app.route("/agent", agentRoutes);

export default app;

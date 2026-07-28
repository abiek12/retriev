import { Hono } from "hono";
import documentRoutes from "./document/document.route";
import chatRoutes from "./chat/chat.route";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import globalExceptionHandler from "./middlewares/execption-handler.middleware";

const app = new Hono();

// Apply the logger globally to all routes
app.use(logger());

// Cors
app.use("*", cors());
// Global exception handler
app.onError(globalExceptionHandler);

app.get("/", (c) => {
  return c.text("Hono server is running!");
});

// Register routes
app.route("/documents", documentRoutes);
app.route("/chat", chatRoutes);

export default app;

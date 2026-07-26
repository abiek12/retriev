import { Hono } from "hono";
import documentRoutes from "./document/document.route";
import chatRoutes from "./chat/chat.route";
import { cors } from "hono/cors";

const app = new Hono();

// Cors
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hono server is running!");
});

// Register routes
app.route("/documents", documentRoutes);
app.route("/chat", chatRoutes);

export default app;

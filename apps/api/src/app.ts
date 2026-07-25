import { Hono } from "hono";
import documentRoutes from "./document/document.route";
import { bootStrap } from "./config/bootstrap";

const app = new Hono();

// Bootstrap
export const { embeddingProvider, vectorStoreProvider } = bootStrap();

// Register routes
app.route("/documents", documentRoutes);

export default app;

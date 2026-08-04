import { Hono } from "hono";
import { auth } from "./auth";

const authRoute = new Hono();

authRoute.on(["GET", "POST"], "/*", async (c) => {
  return auth.handler(c.req.raw);
});

export default authRoute;

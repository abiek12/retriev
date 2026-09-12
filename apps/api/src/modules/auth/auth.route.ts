import { Hono } from "hono";
import { authService } from "./auth.module";

const authRoute = new Hono();

authRoute.on(["GET", "POST"], "/*", async (c) => {
  return authService.handler(c.req.raw);
});

export default authRoute;

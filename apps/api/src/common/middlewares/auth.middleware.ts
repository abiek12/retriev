import { auth } from "@/modules/auth/auth.module";
import { createMiddleware } from "hono/factory";
import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

type AuthEnv = {
  Variables: {
    session: typeof auth.$Infer.Session | null;
  };
};

export const sessionMiddleware = createMiddleware<AuthEnv>(
  async (c: Context, next: Next) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      throw new HTTPException(401);
    }

    const userId = session.user.id;

    c.set("session", session);
    c.set("userId", userId);

    await next();
  },
);

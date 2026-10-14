import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z, { uuid } from "zod";
import {
  createApiKeyRequestSchema,
  getapiKeysRequestSchema,
  rotateApiKeyRequestSchema,
  updateApiKeyRequestSchema,
} from "@repo/shared";
import { authMiddlware } from "@/common/middlewares/auth.middleware";
import { apiKeyController } from "./api-key.module";

const apiKeyRoutes = new Hono();
const apiKeyIdSchema = z.object({ id: uuid() });

apiKeyRoutes.use("*", authMiddlware);

apiKeyRoutes.get("/", zValidator("query", getapiKeysRequestSchema), async (c) =>
  apiKeyController.list(c, c.req.valid("query")),
);

apiKeyRoutes.post(
  "/",
  zValidator("json", createApiKeyRequestSchema),
  apiKeyController.create,
);

apiKeyRoutes.put(
  "/:id",
  zValidator("param", apiKeyIdSchema),
  zValidator("json", updateApiKeyRequestSchema),
  apiKeyController.update,
);

apiKeyRoutes.post(
  "/:id/rotate",
  zValidator("param", apiKeyIdSchema),
  zValidator("json", rotateApiKeyRequestSchema),
  apiKeyController.rotate,
);

apiKeyRoutes.delete(
  "/:id",
  zValidator("param", apiKeyIdSchema),
  apiKeyController.delete,
);

export default apiKeyRoutes;

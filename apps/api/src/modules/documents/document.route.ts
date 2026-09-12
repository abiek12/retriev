import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { indexDocumentSchema } from "@repo/shared/contracts";
import { documentController } from "./document.module";

const router = new Hono();

router.post(
  "/index-file",
  zValidator("json", indexDocumentSchema),
  documentController.indexFile,
);

router.post(
  "/index-text",
  zValidator("json", indexDocumentSchema),
  documentController.indexText,
);

export default router;

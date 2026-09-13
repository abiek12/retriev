import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { indexKnowledgeSourceSchema } from "@repo/shared/contracts";
import { knowledgeController } from "./knowledge.module";

const router = new Hono();

router.post(
  "/index-file",
  zValidator("json", indexKnowledgeSourceSchema),
  knowledgeController.indexFile,
);

router.post(
  "/index-text",
  zValidator("json", indexKnowledgeSourceSchema),
  knowledgeController.indexText,
);

export default router;

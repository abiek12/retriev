import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createKnowledgeRequestSchema,
  deleteKnowledgeRequestSchema,
  knowledgeListRequestSchema,
  knowledgeRequestSchema,
  updateKnowledgeRequestSchema,
} from "@repo/shared";
import { knowledgeController } from "./knowledge.module";

const router = new Hono();

// Create
router.post(
  "/",
  zValidator("json", createKnowledgeRequestSchema),
  knowledgeController.create,
);

// Get all
router.get("/", zValidator("query", knowledgeListRequestSchema), async (c) => {
  const query = c.req.valid("query");
  return knowledgeController.list(c, query);
});

// Get by id
router.get(
  "/:id",
  zValidator("param", knowledgeRequestSchema),
  knowledgeController.getById,
);

// Update
router.patch(
  "/:id",
  zValidator("param", knowledgeRequestSchema),
  zValidator("json", updateKnowledgeRequestSchema),
  knowledgeController.update,
);

// Delete
router.delete(
  "/:id",
  zValidator("param", deleteKnowledgeRequestSchema),
  knowledgeController.delete,
);

router.post(
  "/:id/upload-complete",
  zValidator("param", knowledgeRequestSchema),
  knowledgeController.completeFileUpload,
);

export default router;

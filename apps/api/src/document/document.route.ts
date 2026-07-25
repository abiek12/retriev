import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { IndexDocumentDto } from "./dto/index-document.dto";
import { documentController } from "./index";

const router = new Hono();

router.post(
  "/index-file",
  zValidator("json", IndexDocumentDto),
  documentController.indexFile,
);

router.post(
  "/index-text",
  zValidator("json", IndexDocumentDto),
  documentController.indexText,
);

export default router;

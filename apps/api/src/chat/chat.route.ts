import { Hono } from "hono";
import { chatController } from "./index";
import { zValidator } from "@hono/zod-validator";
import { userChatRequestSchema } from "@repo/shared/contracts";

const router = new Hono();

router.post(
  "/message",
  zValidator("json", userChatRequestSchema),
  chatController.chat,
);

export default router;

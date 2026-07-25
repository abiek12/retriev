import { Hono } from "hono";
import { chatController } from "./index";
import { zValidator } from "@hono/zod-validator";
import { UserChatQueryDto } from "./dto/query-chat.dto";

const router = new Hono();

router.post(
  "/messages",
  zValidator("json", UserChatQueryDto),
  chatController.chat,
);

export default router;

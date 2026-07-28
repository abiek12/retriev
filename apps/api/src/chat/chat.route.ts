import { Hono } from "hono";
import { chatController } from "./index";
import { zValidator } from "@hono/zod-validator";
import { UserChatReqDto } from "./dto/query-chat.dto";

const router = new Hono();

router.post(
  "/message",
  zValidator("json", UserChatReqDto),
  chatController.chat,
);

export default router;

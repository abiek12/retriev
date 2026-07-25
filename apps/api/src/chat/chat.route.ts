import { Hono } from "hono";
import { chatController } from "./index";

const router = new Hono();

router.post("/messages", chatController.chat);

export default router;

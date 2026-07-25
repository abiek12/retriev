import { Hono } from "hono";
import { chatController } from "./index";

const router = new Hono();

router.post("/chat/messages", chatController.chat);

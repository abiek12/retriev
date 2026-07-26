import { createInfrastructure } from "../config/infrastructure";
import ToolRegistry from "../tools/tool.registry";
import ChatController from "./chat.controller";
import ChatService from "./chat.service";

const { toolRegistry } = createInfrastructure();

// DI into instance of chat service
const chatService = new ChatService(toolRegistry);

export const chatController = new ChatController(chatService);

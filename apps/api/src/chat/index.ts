import { createInfrastructure } from "../config/infrastructure";
import llmConfig from "../config/llm.config";
import LlmFactory from "../llm/llm.factory";
import ChatController from "./chat.controller";
import ChatService from "./chat.service";

const { toolRegistry } = createInfrastructure();
const llmProvider = LlmFactory.create(llmConfig.provider);

// DI into instance of chat service
const chatService = new ChatService(toolRegistry, llmProvider);

export const chatController = new ChatController(chatService);

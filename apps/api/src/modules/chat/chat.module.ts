import { createInfrastructure } from "../../config/infrastructure";
import llmConfig from "../../config/llm.config";
import { db } from "../../infrastructure/database";
import LlmFactory from "../../infrastructure/llm/llm.factory";
import ChatController from "./chat.controller";
import ChatRepository from "./chat.repository";
import ChatService from "./chat.service";

const { toolRegistry } = createInfrastructure();
const llmProvider = LlmFactory.create(llmConfig.provider);
const chatRepository = new ChatRepository(db);

// DI into instance of chat service
const chatService = new ChatService(chatRepository, toolRegistry, llmProvider);

export const chatController = new ChatController(chatService);

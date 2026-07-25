import { createInfrastructure } from "../config/infrastructure";
import ChatController from "./chat.controller";
import ChatService from "./chat.service";

const { embeddingProvider, vectorStoreProvider } = createInfrastructure();

// DI into instance of chat service
const chatService = new ChatService(embeddingProvider, vectorStoreProvider);

export const chatController = new ChatController(chatService);

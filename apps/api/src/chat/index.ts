import { embeddingProvider, vectorStoreProvider } from "../app";
import ChatController from "./chat.controller";
import ChatService from "./chat.service";

// DI into instance of chat service
const chatService = new ChatService(embeddingProvider, vectorStoreProvider);

export const chatController = new ChatController(chatService);

import ChatController from "./chat.controller";
import ChatService from "./chat.service";

const chatService = new ChatService();

export const chatController = new ChatController(chatService);

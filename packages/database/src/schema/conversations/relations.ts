import { defineRelations } from "drizzle-orm";
import { conversation } from "./conversations";
import { agent } from "../agents";
import { user } from "../auth";
import { messageToolCall } from "./message-tool-call";
import { message } from "./messages";

export const messageRelations = defineRelations(
  {
    conversations: conversation,
    agents: agent,
    users: user,
    messages: message,
    messageToolCalls: messageToolCall,
  },
  (relations) => ({
    conversations: {
      agent: relations.one.agents({
        from: relations.conversations.agentId,
        to: relations.agents.id,
      }),
      user: relations.one.users({
        from: relations.conversations.userId,
        to: relations.users.id,
      }),
      messages: relations.many.messages(),
    },
    messages: {
      conversation: relations.one.conversations({
        from: relations.messages.conversationId,
        to: relations.conversations.id,
      }),
      parent: relations.one.messages({
        from: relations.messages.parentId,
        to: relations.messages.id,
        alias: "parent_message",
      }),
      children: relations.many.messages({
        alias: "parent_message",
      }),
      messageToolCalls: relations.many.messageToolCalls(),
    },
    messageToolCalls: {
      message: relations.one.messages({
        from: relations.messageToolCalls.messageId,
        to: relations.messages.id,
      }),
    },
    agents: {
      conversations: relations.many.conversations(),
    },
    users: {
      conversations: relations.many.conversations(),
    },
  }),
);

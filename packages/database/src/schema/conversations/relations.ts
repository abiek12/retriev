import { defineRelations } from "drizzle-orm";
import { conversationsTable } from "./conversations";
import { agentsTable } from "../agents";
import { usersTable } from "../auth";
import { messageToolCallTable } from "./message-tool-call";
import { messagesTable } from "./messages";

export const messageRelations = defineRelations(
  {
    conversations: conversationsTable,
    agents: agentsTable,
    users: usersTable,
    messages: messagesTable,
    messageToolCalls: messageToolCallTable,
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

import { pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", ["active", "inActive"]);
export const roleEnum = pgEnum("role", ["admin", "user"]);
export const auditActionEnum = pgEnum("audit_action", [
  "create",
  "update",
  "delete",
]);
export const resourceTypeEnum = pgEnum("resource_type", [
  "user",
  "agent",
  "user_api_keys",
  "knowledge_base",
  "conversation",
  "message",
  "session",
]);
export const providerEnum = pgEnum("provider", [
  "openai",
  "anthropic",
  "gemini",
]);
export const agentStatusEnum = pgEnum("agent_status", ["active", "inactive"]);
export const knowledgeBaseTypeEnum = pgEnum("knowledge_base_type", [
  "text",
  "file",
  "web",
  "youtube_video",
]);
export const knowledgeBaseStatusEnum = pgEnum("knowledge_base_status", [
  "active",
  "inactive",
]);
export const conversationStatusEnum = pgEnum("conversation_status", [
  "active",
  "inactive",
  "archived",
]);
export const messageRoleEnum = pgEnum("message_role", [
  "user",
  "assistant",
  "system",
  "tool",
]);

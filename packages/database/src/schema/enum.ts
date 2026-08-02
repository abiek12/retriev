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

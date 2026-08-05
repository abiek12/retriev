import { defineRelations } from "drizzle-orm";
import { user } from "../auth";
import { auditLog } from "./audit-logs";
import { usageLog } from "./usage-logs";
import { agent } from "../agents";

export const usageRelations = defineRelations(
  {
    users: user,
    auditLogs: auditLog,
    usageLogs: usageLog,
    agents: agent,
  },
  (relations) => ({
    auditLogs: {
      user: relations.one.users({
        from: relations.auditLogs.userId,
        to: relations.users.id,
      }),
    },
    usageLogs: {
      user: relations.one.users({
        from: relations.usageLogs.userId,
        to: relations.users.id,
      }),
      agent: relations.one.agents({
        from: relations.usageLogs.agentId,
        to: relations.agents.id,
      }),
    },
    agents: {
      usageLogs: relations.many.usageLogs(),
    },
    users: {
      auditLogs: relations.many.auditLogs(),
      usageLogs: relations.many.usageLogs(),
    },
  }),
);

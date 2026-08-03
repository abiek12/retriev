import { defineRelations } from "drizzle-orm";
import { usersTable } from "../auth";
import { auditLogsTable } from "./audit-logs";
import { usageLogsTable } from "./usage-logs";
import { agentsTable } from "../agents";

export const usageRelations = defineRelations(
  {
    users: usersTable,
    auditLogs: auditLogsTable,
    usageLogs: usageLogsTable,
    agents: agentsTable,
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

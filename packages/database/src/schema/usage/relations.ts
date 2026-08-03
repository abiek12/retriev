import { defineRelations } from "drizzle-orm";
import { usersTable } from "../auth";
import { auditLogsTable } from "./audit-logs";
import { usageLogsTable } from "./usage-logs";

export const usageRelations = defineRelations(
  {
    users: usersTable,
    auditLogs: auditLogsTable,
    usageLogs: usageLogsTable,
  },
  (relations) => ({
    auditLogs: {
      users: relations.one.users({
        from: relations.auditLogs.userId,
        to: relations.users.id,
      }),
    },
    usageLogs: {
      users: relations.one.users({
        from: relations.usageLogs.userId,
        to: relations.users.id,
      }),
    },
    users: {
      auditLogs: relations.many.auditLogs(),
      usageLogs: relations.many.usageLogs(),
    },
  }),
);

import { defineRelations } from "drizzle-orm";
import { usersTable } from "../auth";
import { auditLogsTable } from "./audit-logs";

export const usageRelations = defineRelations(
  {
    users: usersTable,
    auditLogs: auditLogsTable,
  },
  (relations) => ({
    auditLogs: {
      users: relations.one.users({
        from: relations.auditLogs.userId,
        to: relations.users.id,
      }),
    },
    users: {
      auditLogs: relations.many.auditLogs(),
    },
  }),
);

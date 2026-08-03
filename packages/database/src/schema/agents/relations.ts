import { defineRelations } from "drizzle-orm";
import { usersTable } from "../auth";
import { agentsTable } from "./agents";

export const agentsRelations = defineRelations(
  {
    users: usersTable,
    agents: agentsTable,
  },
  (relations) => ({
    agents: {
      owner: relations.one.users({
        from: relations.agents.userId,
        to: relations.users.id,
      }),
    },
    users: {
      agents: relations.many.agents(),
    },
  }),
);

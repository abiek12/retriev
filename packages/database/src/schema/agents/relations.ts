import { defineRelations } from "drizzle-orm";
import { usersTable } from "../auth";
import { agentsTable } from "./agents";
import { userApiKeysTable } from "./user-api-keys";

export const agentsRelations = defineRelations(
  {
    users: usersTable,
    agents: agentsTable,
    userApiTokens: userApiKeysTable,
  },
  (relations) => ({
    agents: {
      owner: relations.one.users({
        from: relations.agents.userId,
        to: relations.users.id,
      }),
    },
    userApiTokens: {
      owner: relations.one.users({
        from: relations.userApiTokens.userId,
        to: relations.users.id,
      }),
    },
    users: {
      agents: relations.many.agents(),
      userApiTokens: relations.many.userApiTokens(),
    },
  }),
);

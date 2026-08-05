import { defineRelations } from "drizzle-orm";
import { user } from "../auth";
import { agent } from "./agents";
import { userApiKey } from "./user-api-keys";

export const agentsRelations = defineRelations(
  {
    users: user,
    agents: agent,
    userApiKeys: userApiKey,
  },
  (relations) => ({
    agents: {
      owner: relations.one.users({
        from: relations.agents.userId,
        to: relations.users.id,
      }),
    },
    userApiKeys: {
      owner: relations.one.users({
        from: relations.userApiKeys.userId,
        to: relations.users.id,
      }),
    },
    users: {
      agents: relations.many.agents(),
      userApiKeys: relations.many.userApiKeys(),
    },
  }),
);

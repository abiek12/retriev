import { defineRelations } from "drizzle-orm";
import { user } from "./users";
import { session } from "./session";
import { account } from "./account";
import { verification } from "./verification";

export const authRelations = defineRelations(
  {
    users: user,
    sessions: session,
    accounts: account,
    verification,
  },
  (relations) => ({
    sessions: {
      user: relations.one.users({
        from: relations.sessions.userId,
        to: relations.users.id,
      }),
    },

    accounts: {
      user: relations.one.users({
        from: relations.accounts.userId,
        to: relations.users.id,
      }),
    },

    users: {
      sessions: relations.many.sessions(),
      accounts: relations.many.accounts(),
    },
  }),
);

import { defineRelations } from "drizzle-orm";
import { usersTable } from "./users";
import { sessionTable } from "./session";
import { accountTable } from "./account";
import { verificationTable } from "./verification";

export const authRelations = defineRelations(
  {
    users: usersTable,
    sessions: sessionTable,
    accounts: accountTable,
    verification: verificationTable,
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

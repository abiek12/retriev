import { index, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "../common";
import { agent } from "../agents";
import { knowledgeBase } from "./knowledge-bases";

export const agentKnowledgeBase = pgTable(
  "agent_knowledge_bases",
  {
    agentId: uuid("agent_id")
      .notNull()
      .references(() => agent.id, {
        onDelete: "cascade",
      }),
    knowledgeBaseId: uuid("knowledge_base_id")
      .notNull()
      .references(() => knowledgeBase.id, {
        onDelete: "cascade",
      }),
    ...auditColumns,
  },
  (table) => [
    primaryKey({ columns: [table.agentId, table.knowledgeBaseId] }),
    index("agent_knowledge_bases_knowledge_base_id_idx").on(
      table.knowledgeBaseId,
    ),
  ],
);

import { defineRelations } from "drizzle-orm";
import { knowledgeBasesTable } from "./knowledge-bases";
import { agentsTable } from "../agents";
import { fileSourcesTable } from "./file-sources";
import { textSourcesTable } from "./text-sources";

export const knowledgeBasesRelations = defineRelations(
  {
    knowledgeBases: knowledgeBasesTable,
    agents: agentsTable,
    fileSources: fileSourcesTable,
    textSources: textSourcesTable,
  },
  (relations) => ({
    knowledgeBases: {
      agent: relations.one.agents({
        from: relations.knowledgeBases.agentId,
        to: relations.agents.id,
      }),
    },
    fileSources: {
      knowledgeBase: relations.one.knowledgeBases({
        from: relations.fileSources.knowledgeBaseId,
        to: relations.knowledgeBases.id,
      }),
    },
    textSources: {
      knowledgeBase: relations.one.knowledgeBases({
        from: relations.textSources.knowledgeBaseId,
        to: relations.knowledgeBases.id,
      }),
    },
    agents: {
      knowledgeBases: relations.many.knowledgeBases(),
    },
  }),
);

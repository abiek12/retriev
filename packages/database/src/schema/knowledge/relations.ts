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
      fileSource: relations.one.fileSources({
        from: relations.knowledgeBases.id,
        to: relations.fileSources.knowledgeBaseId,
      }),
      textSource: relations.one.textSources({
        from: relations.knowledgeBases.id,
        to: relations.textSources.knowledgeBaseId,
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

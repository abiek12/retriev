import { defineRelations } from "drizzle-orm";
import { knowledgeBase } from "./knowledge-bases";
import { agent } from "../agents";
import { fileSource } from "./file-sources";
import { textSource } from "./text-sources";

export const knowledgeBasesRelations = defineRelations(
  {
    knowledgeBases: knowledgeBase,
    agents: agent,
    fileSources: fileSource,
    textSources: textSource,
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

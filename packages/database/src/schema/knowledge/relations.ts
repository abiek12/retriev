import { defineRelations } from "drizzle-orm";
import { knowledgeBase } from "./knowledge-bases";
import { agent } from "../agents";
import { fileSource } from "./file-sources";
import { textSource } from "./text-sources";
import { user } from "../auth";
import { agentKnowledgeBase } from "./agent_knowledge_bases";

export const knowledgeBasesRelations = defineRelations(
  {
    knowledgeBases: knowledgeBase,
    agents: agent,
    fileSources: fileSource,
    textSources: textSource,
    users: user,
    agentKnowledgeBases: agentKnowledgeBase,
  },
  (relations) => ({
    knowledgeBases: {
      owner: relations.one.users({
        from: relations.knowledgeBases.userId,
        to: relations.users.id,
      }),
      fileSource: relations.one.fileSources({
        from: relations.knowledgeBases.id,
        to: relations.fileSources.knowledgeBaseId,
      }),
      textSource: relations.one.textSources({
        from: relations.knowledgeBases.id,
        to: relations.textSources.knowledgeBaseId,
      }),
      agentAssignments: relations.many.agentKnowledgeBases(),
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
      knowledgeBaseAssignments: relations.many.agentKnowledgeBases(),
    },
    users: {
      knowledgeBases: relations.many.knowledgeBases(),
    },
    agentKnowledgeBases: {
      agent: relations.one.agents({
        from: relations.agentKnowledgeBases.agentId,
        to: relations.agents.id,
      }),
      knowledgeBase: relations.one.knowledgeBases({
        from: relations.agentKnowledgeBases.knowledgeBaseId,
        to: relations.knowledgeBases.id,
      }),
    },
  }),
);

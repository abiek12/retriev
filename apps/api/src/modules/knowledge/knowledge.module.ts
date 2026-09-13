import { createInfrastructure } from "../../config/infrastructure";
import { db } from "../../infrastructure/database";
import KnowledgeController from "./knowledge.controller";
import KnowledgeRepository from "./knowledge.repository";
import KnowledgeService from "./knowledge.service";

const { embeddingProvider, vectorStoreProvider } = createInfrastructure();
const knowledgeRepository = new KnowledgeRepository(db);

const knowledgeService = new KnowledgeService(
  knowledgeRepository,
  embeddingProvider,
  vectorStoreProvider,
);

export const knowledgeController = new KnowledgeController(knowledgeService);

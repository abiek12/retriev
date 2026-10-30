import { db } from "../../infrastructure/database";
import KnowledgeController from "./knowledge.controller";
import KnowledgeRepository from "./knowledge.repository";
import KnowledgeService from "./knowledge.service";

const knowledgeRepository = new KnowledgeRepository(db);

const knowledgeService = new KnowledgeService(knowledgeRepository);

export const knowledgeController = new KnowledgeController(knowledgeService);

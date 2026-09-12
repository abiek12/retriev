import { createInfrastructure } from "../../config/infrastructure";
import { db } from "../../infrastructure/database";
import DocumentController from "./document.controller";
import DocumentRepository from "./document.repository";
import DocumentService from "./document.service";

const { embeddingProvider, vectorStoreProvider } = createInfrastructure();
const documentRepository = new DocumentRepository(db);

const documentService = new DocumentService(
  documentRepository,
  embeddingProvider,
  vectorStoreProvider,
);

export const documentController = new DocumentController(documentService);

import { createInfrastructure } from "../config/infrastructure";
import DocumentController from "./document.controller";
import DocumentService from "./document.service";

const { embeddingProvider, vectorStoreProvider } = createInfrastructure();

const documentService = new DocumentService(
  embeddingProvider,
  vectorStoreProvider,
);

export const documentController = new DocumentController(documentService);

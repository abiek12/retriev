import { embeddingProvider, vectorStoreProvider } from "../app";
import DocumentController from "./document.controller";
import DocumentService from "./document.service";

const documentService = new DocumentService(
  embeddingProvider,
  vectorStoreProvider,
);

export const documentController = new DocumentController(documentService);

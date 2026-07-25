import DocumentController from "./document.controller";
import DocumentService from "./document.service";

const documentService = new DocumentService();

const documentController = new DocumentController(documentService);

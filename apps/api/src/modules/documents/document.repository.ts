import { BaseRepository } from "../../core/repositories";
import type { IDocumentRepository } from "./document.repository.interface";

class DocumentRepository
  extends BaseRepository
  implements IDocumentRepository
{}

export default DocumentRepository;

import { BaseRepository } from "../../core/repositories";
import type { IKnowledgeRepository } from "./types";

class KnowledgeRepository
  extends BaseRepository
  implements IKnowledgeRepository {}

export default KnowledgeRepository;

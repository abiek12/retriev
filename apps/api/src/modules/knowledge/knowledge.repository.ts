import { knowledgeBase, textSource } from "@repo/database";
import { BaseRepository } from "../../core/repositories";
import type {
  IKnowledgeRepository,
  Knowledge,
  NewTextKnowledge,
} from "./types";

class KnowledgeRepository
  extends BaseRepository
  implements IKnowledgeRepository
{
  createText = async (
    userId: string,
    payload: NewTextKnowledge,
  ): Promise<Knowledge> => {
    return this.database.transaction(async (tx) => {
      const [newKnowledgeBase] = await tx
        .insert(knowledgeBase)
        .values({
          userId,
          title: payload.title,
          description: payload.description,
          type: "text",
        })
        .returning();

      if (!newKnowledgeBase) {
        throw new Error("Failed to create text knowledge base");
      }

      await tx.insert(textSource).values({
        content: payload.content,
        knowledgeBaseId: newKnowledgeBase.id,
      });

      return newKnowledgeBase;
    });
  };
}

export default KnowledgeRepository;

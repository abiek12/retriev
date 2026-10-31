import { fileSource, knowledgeBase, textSource } from "@repo/database";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Knowledge = InferSelectModel<typeof knowledgeBase>;
type NewKnowledge = InferInsertModel<typeof knowledgeBase>;
type NewTextSource = InferInsertModel<typeof textSource>;
type TextSource = InferSelectModel<typeof textSource>;
type FileSource = InferSelectModel<typeof fileSource>;

export type NewTextKnowledge = NewKnowledge & Pick<NewTextSource, "content">;

export type UpdateKnowledge = Partial<
  Pick<NewKnowledge, "title" | "description">
>;

export type KnowledgeListResult = {
  records: Knowledge[];
  total: number;
};

export type KnowledgeDetails =
  | {
      type: "text";
      knowledge: Knowledge;
      source: TextSource;
    }
  | {
      type: "file";
      knowledge: Knowledge;
      source: FileSource;
    };

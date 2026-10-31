import { fileSource, knowledgeBase, textSource } from "@repo/database";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Knowledge = InferSelectModel<typeof knowledgeBase>;
type NewKnowledge = InferInsertModel<typeof knowledgeBase>;
type NewTextSource = InferInsertModel<typeof textSource>;
type TextSource = InferSelectModel<typeof textSource>;
type FileSource = InferSelectModel<typeof fileSource>;

export type NewTextKnowledge = Pick<
  NewKnowledge,
  "userId" | "title" | "description"
> &
  Pick<NewTextSource, "content">;

export type UpdateKnowledge = Partial<
  Pick<NewKnowledge, "title" | "description">
>;

export type KnowledgeListResult = {
  records: Knowledge[];
  total: number;
};

export type KnowledgeDetails = {
  knowledge: Knowledge;
  textSource: TextSource | null;
  fileSource: FileSource | null;
};

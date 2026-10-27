import { knowledgeBase, textSource } from "@repo/database";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Knowledge = InferSelectModel<typeof knowledgeBase>;
type NewKnowledge = InferInsertModel<typeof knowledgeBase>;
type NewTextSource = InferInsertModel<typeof textSource>;

export type NewTextKnowledge = Pick<NewKnowledge, "title" | "description"> &
  Pick<NewTextSource, "content">;
export type UpdateKnowledge = Partial<InferInsertModel<typeof knowledgeBase>>;

export type KnowledgeListResult = {
  records: Knowledge[];
  total: number;
};

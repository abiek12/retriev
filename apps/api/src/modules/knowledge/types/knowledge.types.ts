import { knowledgeBase, textSource } from "@repo/database";
import { InferSelectModel } from "drizzle-orm";

export type Knowledge = InferSelectModel<typeof knowledgeBase>;
export type NewTextSource = InferSelectModel<typeof textSource>;

export type NewTextKnowledge = Pick<Knowledge, "title" | "description"> &
  Pick<NewTextSource, "content">;
export type UpdateKnowledge = Partial<InferSelectModel<typeof knowledgeBase>>;

export type KnowledgeListResult = {
  records: Knowledge[];
  total: number;
};

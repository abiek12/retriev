import type { Context } from "hono";
import type { IndexKnowledgeSourceRequest } from "@repo/shared/contracts";
import type { IKnowledgeService } from "./types";

class KnowledgeController {
  constructor(private knowledgeService: IKnowledgeService) {}

  indexFile = async (c: Context) => {
    const filePath = `${import.meta.dir}/../../test.pdf`;
    const type = "file";

    await this.knowledgeService.indexSource({ type, filePath });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };

  indexText = async (c: Context) => {
    const body: IndexKnowledgeSourceRequest = await c.req.json();
    await this.knowledgeService.indexSource(body);

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };
}

export default KnowledgeController;

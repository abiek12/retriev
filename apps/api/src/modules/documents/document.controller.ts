import type { Context } from "hono";
import type { IndexDocumentRequest } from "@repo/shared/contracts";
import type { IDocumentService } from "./document.service.interface";

class DocumentController {
  constructor(private documentService: IDocumentService) {}

  indexFile = async (c: Context) => {
    const filePath = `${import.meta.dir}/../../test.pdf`;
    const type = "file";

    await this.documentService.index({ type, filePath });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };

  indexText = async (c: Context) => {
    const body: IndexDocumentRequest = await c.req.json();
    await this.documentService.index(body);

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };
}

export default DocumentController;

import type { Context } from "hono";
import documentService from "./document.service";
import { IndexDocumentDtoType } from "./dto/index-document.dto";
import DocumentService from "./document.service";

class DocumentController {
  constructor(private documentService: DocumentService) {}

  indexFile = async (c: Context) => {
    const filePath = `${import.meta.dir}/../test.pdf`;
    const type = "file";

    await this.documentService.index({ type, filePath });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };

  indexText = async (c: Context) => {
    let body: IndexDocumentDtoType = await c.req.json();
    body.type = "text";

    await this.documentService.index(body);

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  };
}

export default DocumentController;

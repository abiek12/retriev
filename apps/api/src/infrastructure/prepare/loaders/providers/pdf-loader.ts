import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { IFileLoader } from "../prepare-loader.interface.ts";

class PdfLoader implements IFileLoader {
  async load(filePath: string): Promise<any> {
    const loader = new PDFLoader(filePath, { splitPages: false });
    const doc = await loader.load();

    return doc[0].pageContent;
  }
}

export default PdfLoader;

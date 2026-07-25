import { FileTypes } from "../../utils/enums";
import { IFileLoader } from "./prepare-loader.interface.ts";
import PDFLoader from "./providers/pdf-loader";
import TextLoader from "./providers/text-loader";

class filePrepareFactory {
  static createFileLoader(type: FileTypes): IFileLoader {
    switch (type) {
      case FileTypes.PDF:
        return new PDFLoader();
      case FileTypes.TEXT:
        return new TextLoader();
      default:
        throw new Error("Invalid file type!");
    }
  }
}

export default filePrepareFactory;

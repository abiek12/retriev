import { FileType } from "../../../common/enums/file-type.enum";
import { IFileLoader } from "./types/loader.interface";
import { PdfLoader } from "./providers/pdf-loader.provider";
import { TextLoader } from "./providers/text-loader.provider";

export class filePrepareFactory {
  static createFileLoader(type: FileType): IFileLoader {
    switch (type) {
      case FileType.PDF:
        return new PdfLoader();
      case FileType.TEXT:
        return new TextLoader();
      default:
        throw new Error("Invalid file type!");
    }
  }
}

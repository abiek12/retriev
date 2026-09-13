import { IFileLoader } from "../types/loader.interface.js";

export class TextLoader implements IFileLoader {
  load(filePath: string): any {
    return ["text content"];
  }
}

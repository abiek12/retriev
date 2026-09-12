import { IFileLoader } from "../prepare-loader.interface.ts";

class TextLoader implements IFileLoader {
  load(filePath: string): any {
    return ["text content"];
  }
}

export default TextLoader;

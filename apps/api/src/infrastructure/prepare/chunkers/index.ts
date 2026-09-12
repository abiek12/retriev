import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export class ChunkFile {
  constructor(chunkSize: number, chunkOverlap: number) {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    });
  }

  private splitter;

  public async textSplitter(content: string) {
    return await this.splitter.splitText(content);
  }
}

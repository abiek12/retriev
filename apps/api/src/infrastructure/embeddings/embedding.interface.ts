export interface IEmbeddingsProvider {
  embedChunk(text: string): Promise<number[]>;
  embedChunks(text: string[]): Promise<any[]>;
}

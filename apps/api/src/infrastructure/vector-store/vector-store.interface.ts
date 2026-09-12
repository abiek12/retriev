export interface IVectorStore {
  addDocuments(chunks: any[]): Promise<void>;
  similaritySearch(query: number[], topK: number): Promise<any>;
}

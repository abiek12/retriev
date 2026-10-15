import { IVectorStore } from "../types/vector-store.interface";

export class MongoVectorStore implements IVectorStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any -- Legacy placeholder; replace when MongoDB support is implemented.
  async addDocuments(chunks: any[]): Promise<void> {
    console.log("Document added!");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any -- Legacy placeholder; replace when MongoDB support is implemented.
  async similaritySearch(query: number[]): Promise<any> {
    console.log("Document got!");
    return new Promise(() => {
      return ["1"];
    });
  }
}

import { IVectorStore } from "../vector-store.interface";

class MongoVectorStore implements IVectorStore {

  async addDocuments(chunks: any[]): Promise<void> {
    console.log("Document added!")
  }

  async similaritySearch(query: number[]): Promise<any> {
    console.log("Document got!");
    return new Promise(() => {
      return ['1']
    })
  };
};

export default MongoVectorStore;

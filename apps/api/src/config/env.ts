export const env = {
  // embedding models
  openApiKey: process.env.OPENAI_API_KEY!,
  embeddingProvider: process.env.EMBEDDING_PROVIDER!,
  embeddingModel: process.env.OPENAI_EMBEDDING_MODEL!,

  // vector stores
  pineconeIndex: process.env.PINECONE_INDEX!,
  pineconeApiKey: process.env.PINECONE_API_KEY!,

  // tools
  tavilyApiKey: process.env.TAVILY_API_KEY!,

  // llm
  groqApiKey: process.env.GROQ_API_KEY!,
};

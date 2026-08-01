import z from "zod";
import { logger } from "../utils/logger";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  OPENAI_API_KEY: z.string().min(1),
  EMBEDDING_PROVIDER: z.string().min(1),
  OPENAI_EMBEDDING_MODEL: z.string().min(1),

  PINECONE_API_KEY: z.string().min(1),
  PINECONE_INDEX: z.string().min(1),

  TAVILY_API_KEY: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
});

const parsedEnv = envSchema.parse(process.env);
if (!parsedEnv) {
  logger.error("Invalid environment variables");
  throw new Error("Invalid environment variables");
}

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

  databaseUrl: process.env.DATABASE_URL!,
};

export type Env = typeof env;

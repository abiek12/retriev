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

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  CLIENT_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error(
    {
      issues: parsedEnv.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    },
    "Invalid environment variables",
  );

  throw new Error("Application startup failed: invalid environment variables");
}

const values = parsedEnv.data;

export const env = {
  // database
  databaseUrl: values.DATABASE_URL,

  // embedding models
  openAiApiKey: values.OPENAI_API_KEY,
  embeddingProvider: values.EMBEDDING_PROVIDER,
  embeddingModel: values.OPENAI_EMBEDDING_MODEL,

  // vector stores
  pineconeIndex: values.PINECONE_INDEX,
  pineconeApiKey: values.PINECONE_API_KEY,

  // tools
  tavilyApiKey: values.TAVILY_API_KEY,

  // llm
  groqApiKey: values.GROQ_API_KEY,

  // social providers
  googleClientId: values.GOOGLE_CLIENT_ID,
  googleClientSecret: values.GOOGLE_CLIENT_SECRET,
  githubClientId: values.GITHUB_CLIENT_ID,
  githubClientSecret: values.GITHUB_CLIENT_SECRET,

  // client url
  clientUrl: values.CLIENT_URL,
};

export type Env = typeof env;

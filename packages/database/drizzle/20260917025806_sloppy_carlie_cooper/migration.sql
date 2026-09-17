ALTER TYPE "provider" ADD VALUE 'groq';--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "system_prompt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "model" SET DATA TYPE varchar(150) USING "model"::varchar(150);--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "model" SET DEFAULT 'openai/gpt-oss-120b';--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "model" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "provider" SET DEFAULT 'groq'::"provider";--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "temperature" SET DEFAULT '0.7';--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "temperature" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "max_tokens" SET DEFAULT 2048;--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "max_tokens" SET NOT NULL;

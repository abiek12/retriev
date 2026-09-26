CREATE TYPE "llm_api_key_type" AS ENUM('chat', 'embedding');--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "title" varchar DEFAULT 'platform-key(chat)' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "type" "llm_api_key_type" DEFAULT 'chat'::"llm_api_key_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "is_platform" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
CREATE INDEX "agents_user_id_idx" ON "agents" ("user_id");--> statement-breakpoint
CREATE INDEX "user_api_keys_user_id_idx" ON "user_api_keys" ("user_id");
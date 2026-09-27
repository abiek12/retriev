ALTER TYPE "llm_api_key_type" RENAME TO "api_key_capability";--> statement-breakpoint
ALTER TABLE "user_api_keys" RENAME COLUMN "type" TO "capability";--> statement-breakpoint
ALTER INDEX "user_api_keys_user_id_idx" RENAME TO "api_keys_user_provider_unique";--> statement-breakpoint
DROP INDEX "api_keys_user_provider_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_user_provider_unique" ON "user_api_keys" ("user_id","provider");--> statement-breakpoint
CREATE INDEX "api_keys_user_capability_idx" ON "user_api_keys" ("user_id","capability");
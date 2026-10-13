DROP INDEX "api_keys_user_provider_unique";--> statement-breakpoint
DROP INDEX "api_keys_user_capability_idx";--> statement-breakpoint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "user_api_keys"
    WHERE "user_id" IS NOT NULL AND "capability" IN ('chat', 'both')
    GROUP BY "user_id"
    HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot enforce one text API key per user: existing duplicate text-capable keys must be resolved first';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM "user_api_keys"
    WHERE "user_id" IS NOT NULL AND "capability" IN ('embedding', 'both')
    GROUP BY "user_id"
    HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot enforce one embedding API key per user: existing duplicate embedding-capable keys must be resolved first';
  END IF;
END $$;--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "support_text" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "support_embedding" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "user_api_keys"
SET
  "support_text" = "capability" IN ('chat', 'both'),
  "support_embedding" = "capability" IN ('embedding', 'both');--> statement-breakpoint
ALTER TABLE "user_api_keys" DROP COLUMN "capability";--> statement-breakpoint
CREATE INDEX "api_keys_user_id_idx" ON "user_api_keys" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_user_text_unique" ON "user_api_keys" ("user_id") WHERE "user_id" is not null and "support_text";--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_user_embedding_unique" ON "user_api_keys" ("user_id") WHERE "user_id" is not null and "support_embedding";--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD CONSTRAINT "api_keys_at_least_one_capability_check" CHECK ("support_text" or "support_embedding");--> statement-breakpoint
DROP TYPE "api_key_capability";

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "user_api_keys"
    WHERE "support_text" AND "support_embedding"
  ) THEN
    RAISE EXCEPTION 'Cannot migrate an API key with both capabilities: assign separate text and embedding models first';
  END IF;

  IF EXISTS (
    SELECT 1 FROM "user_api_keys"
    WHERE "support_embedding"
  ) THEN
    RAISE EXCEPTION 'Cannot migrate an embedding API key without its model: assign a model first';
  END IF;

  IF EXISTS (
    SELECT 1 FROM "user_api_keys"
    WHERE "is_platform" AND ("provider" <> 'groq' OR NOT "support_text")
  ) THEN
    RAISE EXCEPTION 'Cannot infer a model for a non-Groq platform API key';
  END IF;

  IF EXISTS (
    SELECT 1 FROM "user_api_keys"
    WHERE "user_id" IS NULL AND NOT "is_platform"
  ) THEN
    RAISE EXCEPTION 'Cannot infer a model for an API key without an owner';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM "user_api_keys" AS k
    WHERE k."user_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM "agents" AS a WHERE a."user_id" = k."user_id"
      )
  ) THEN
    RAISE EXCEPTION 'Cannot infer a text model for a user API key without an agent';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM "user_api_keys" AS k
    JOIN "agents" AS a ON a."user_id" = k."user_id"
    WHERE k."user_id" IS NOT NULL
    GROUP BY k."user_id"
    HAVING COUNT(DISTINCT a."text_model") > 1
  ) THEN
    RAISE EXCEPTION 'Cannot infer one text model from agents with different models';
  END IF;
END $$;--> statement-breakpoint
CREATE TYPE "api_key_type" AS ENUM('text', 'embedding');--> statement-breakpoint
ALTER TYPE "provider" ADD VALUE 'openrouter';--> statement-breakpoint
ALTER TABLE "user_api_keys" DROP CONSTRAINT "api_keys_at_least_one_capability_check";--> statement-breakpoint
DROP INDEX "api_keys_user_text_unique";--> statement-breakpoint
DROP INDEX "api_keys_user_embedding_unique";--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "type" "api_key_type";--> statement-breakpoint
ALTER TABLE "user_api_keys" ADD COLUMN "model" varchar(150);--> statement-breakpoint
UPDATE "user_api_keys" AS k
SET "type" = CASE WHEN k."support_text" THEN 'text'::"api_key_type" ELSE 'embedding'::"api_key_type" END,
    "model" = CASE
      WHEN k."is_platform" THEN 'llama-3.1-8b-instant'
      ELSE (
        SELECT a."text_model"
        FROM "agents" AS a
        WHERE a."user_id" = k."user_id"
        ORDER BY a."updated_at" DESC, a."id" DESC
        LIMIT 1
      )
    END;--> statement-breakpoint
ALTER TABLE "user_api_keys" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" ALTER COLUMN "model" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_api_keys" DROP COLUMN "support_text";--> statement-breakpoint
ALTER TABLE "user_api_keys" DROP COLUMN "support_embedding";--> statement-breakpoint
ALTER TABLE "agents" DROP COLUMN "text_model";--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_user_type_unique" ON "user_api_keys" ("user_id","type") WHERE "user_id" is not null;

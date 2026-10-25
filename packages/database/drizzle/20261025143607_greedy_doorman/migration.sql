ALTER TABLE "knowledge_bases" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "status" SET DATA TYPE text USING "status"::text;--> statement-breakpoint
UPDATE "knowledge_bases"
SET "status" = CASE WHEN "type" = 'file' THEN 'uploading' ELSE 'queued' END
WHERE "status" IN ('active', 'inactive');--> statement-breakpoint
DROP TYPE "knowledge_base_status";--> statement-breakpoint
CREATE TYPE "knowledge_base_status" AS ENUM('uploading', 'queued', 'processing', 'ready', 'failed');--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "status" SET DATA TYPE "knowledge_base_status" USING "status"::"knowledge_base_status";--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "status" SET DEFAULT 'queued'::"knowledge_base_status";

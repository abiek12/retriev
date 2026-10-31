ALTER TABLE "knowledge_bases" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "type" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "knowledge_base_type";--> statement-breakpoint
CREATE TYPE "knowledge_base_type" AS ENUM('text', 'file');--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "type" SET DATA TYPE "knowledge_base_type" USING "type"::"knowledge_base_type";--> statement-breakpoint
ALTER TABLE "knowledge_bases" ALTER COLUMN "type" SET DEFAULT 'text'::"knowledge_base_type";
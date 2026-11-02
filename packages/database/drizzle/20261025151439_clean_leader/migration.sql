ALTER TABLE "knowledge_bases" ADD COLUMN "error_message" text;--> statement-breakpoint
ALTER TABLE "file_sources" ADD COLUMN "source_url" text;--> statement-breakpoint
ALTER TABLE "file_sources" ALTER COLUMN "file_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "file_sources" ALTER COLUMN "mime_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "file_sources" ALTER COLUMN "size_bytes" DROP NOT NULL;
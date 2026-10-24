CREATE TABLE "agent_knowledge_bases" (
	"agent_id" uuid,
	"knowledge_base_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agent_knowledge_bases_pkey" PRIMARY KEY("agent_id","knowledge_base_id")
);
--> statement-breakpoint
ALTER TABLE "knowledge_bases" DROP CONSTRAINT "knowledge_bases_agent_id_agents_id_fkey";--> statement-breakpoint
ALTER TABLE "knowledge_bases" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "knowledge_bases" DROP COLUMN "agent_id";--> statement-breakpoint
CREATE INDEX "knowledge_bases_user_id_idx" ON "knowledge_bases" ("user_id");--> statement-breakpoint
CREATE INDEX "agent_knowledge_bases_knowledge_base_id_idx" ON "agent_knowledge_bases" ("knowledge_base_id");--> statement-breakpoint
ALTER TABLE "knowledge_bases" ADD CONSTRAINT "knowledge_bases_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "agent_knowledge_bases" ADD CONSTRAINT "agent_knowledge_bases_agent_id_agents_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "agent_knowledge_bases" ADD CONSTRAINT "agent_knowledge_bases_knowledge_base_id_knowledge_bases_id_fkey" FOREIGN KEY ("knowledge_base_id") REFERENCES "knowledge_bases"("id") ON DELETE CASCADE;
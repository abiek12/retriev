CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" varchar(255) NOT NULL UNIQUE,
	"user_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"status" "user_status" DEFAULT 'active'::"user_status" NOT NULL,
	"role" "role" DEFAULT 'user'::"role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

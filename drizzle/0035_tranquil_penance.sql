CREATE TABLE "about" (
	"id" text NOT NULL,
	"position" text,
	"bio" text,
	"fb" text,
	"twitter" text,
	"linkedIn" text,
	"instagram" text
);
--> statement-breakpoint
ALTER TABLE "about" ADD CONSTRAINT "about_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
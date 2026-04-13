CREATE TABLE "about" (
	"id" text PRIMARY KEY NOT NULL,
	"position" text,
	"bio" text,
	"fb" text,
	"twitter" text,
	"linkedIn" text,
	"instagram" text,
	"owner_id" uuid
);
--> statement-breakpoint
ALTER TABLE "about" ADD CONSTRAINT "about_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
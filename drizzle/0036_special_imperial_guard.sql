ALTER TABLE "about" DROP CONSTRAINT "about_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "authors_id" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "authors_id" SET DEFAULT '{}'::uuid[];--> statement-breakpoint
ALTER TABLE "about" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "ownerId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD CONSTRAINT "about_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "about" RENAME COLUMN "ownerId" TO "owner_id";--> statement-breakpoint
ALTER TABLE "about" DROP CONSTRAINT "about_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "about" ADD CONSTRAINT "about_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "events" ALTER COLUMN "link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "meeting_id" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "password" text;
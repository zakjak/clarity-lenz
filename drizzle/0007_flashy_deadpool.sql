ALTER TABLE "events" ADD COLUMN "event_start" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_end" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "event_datetime";
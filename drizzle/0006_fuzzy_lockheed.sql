DROP INDEX "event_date_idx";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_datetime" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "event_date";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "start_time";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "end_time";
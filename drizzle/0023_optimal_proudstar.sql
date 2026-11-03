CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"owner_id" uuid,
	"title" varchar(300),
	"description" text,
	"price" integer,
	"duration" integer,
	"createdAt" timestamp DEFAULT now(),
	"expiredAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
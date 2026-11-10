ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "comment_votes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "comment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "readlist" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "events_register" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "articles" CASCADE;--> statement-breakpoint
DROP TABLE "comment_votes" CASCADE;--> statement-breakpoint
DROP TABLE "comment" CASCADE;--> statement-breakpoint
DROP TABLE "readlist" CASCADE;--> statement-breakpoint
DROP TABLE "services" CASCADE;--> statement-breakpoint
DROP TABLE "events" CASCADE;--> statement-breakpoint
DROP TABLE "events_register" CASCADE;--> statement-breakpoint
DROP TABLE "videos" CASCADE;--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME TO "verification";--> statement-breakpoint
ALTER TABLE "verification" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "about" DROP CONSTRAINT "about_owner_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "verification" DROP CONSTRAINT "authenticator_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "identifier" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "value" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "about" ADD CONSTRAINT "about_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "credentialID";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "providerAccountId";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "credentialPublicKey";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "counter";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "credentialDeviceType";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "credentialBackedUp";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "transports";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
DROP TYPE "public"."booking_status";
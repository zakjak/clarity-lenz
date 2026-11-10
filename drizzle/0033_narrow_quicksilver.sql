CREATE TABLE "password_reset_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL
);

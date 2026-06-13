ALTER TABLE "password_reset_tokens" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ALTER COLUMN "id" DROP DEFAULT;
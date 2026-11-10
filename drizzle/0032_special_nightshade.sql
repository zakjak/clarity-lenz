CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(300),
	"image" text NOT NULL,
	"image_title" text,
	"category" varchar(100),
	"date" timestamp DEFAULT now() NOT NULL,
	"is_draft" boolean,
	"story" text NOT NULL,
	"tags" text[] DEFAULT '{}'::text[],
	"images" text[] DEFAULT '{}'::text[],
	"images_title" text[] DEFAULT '{}'::text[],
	"authors_id" uuid[] DEFAULT '{}'::uuid[],
	"views" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "comment_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment_id" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"vote" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "comment_votes_comment_id_user_id_unique" UNIQUE("comment_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text,
	"post_id" integer,
	"owner_id" text,
	"parent_id" integer,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "readlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" uuid,
	"articleId" integer
);
--> statement-breakpoint
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
CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(300) NOT NULL,
	"timezone" varchar(300) NOT NULL,
	"description" text,
	"image" text NOT NULL,
	"link" text,
	"platform" text,
	"meeting_id" text,
	"password" text,
	"event_start" timestamp with time zone NOT NULL,
	"event_end" timestamp with time zone NOT NULL,
	"owner_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events_register" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_register_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid,
	"eventId" integer
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "videos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"video_url" text NOT NULL,
	"title" varchar(300),
	"description" text,
	"platform" varchar(300),
	"owner_id" text,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_authors_id_users_id_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_votes" ADD CONSTRAINT "comment_votes_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_votes" ADD CONSTRAINT "comment_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_articles_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comments_parent_id_fkey_cascade" FOREIGN KEY ("parent_id") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readlist" ADD CONSTRAINT "readlist_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readlist" ADD CONSTRAINT "readlist_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events_register" ADD CONSTRAINT "events_register_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events_register" ADD CONSTRAINT "events_register_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "search_index" ON "articles" USING gin ((
          setweight(to_tsvector('english', "title"), 'A') ||
          setweight(to_tsvector('english', "story"), 'B') ||
          setweight(to_tsvector('english', "category"), 'C') ||
          setweight(to_tsvector('english', "tags"), 'D')
      ));--> statement-breakpoint
CREATE INDEX "search_videos_index" ON "videos" USING gin ((
          setweight(to_tsvector('english', "description"), 'A') ||
          setweight(to_tsvector('english', "title"), 'B') ||
          setweight(to_tsvector('english', "platform"), 'C')
      ));
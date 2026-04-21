CREATE TABLE "videos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "videos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"video_url" text NOT NULL,
	"title" varchar(300),
	"description" text,
	"platform" varchar(300)
);
--> statement-breakpoint
CREATE INDEX "search_videos_index" ON "videos" USING gin ((
          setweight(to_tsvector('english', "description"), 'A') ||
          setweight(to_tsvector('english', "title"), 'B') ||
          setweight(to_tsvector('english', "platform"), 'C') ||
      ));
DROP INDEX "search_videos_index";--> statement-breakpoint
CREATE INDEX "search_videos_index" ON "videos" USING gin ((
          setweight(to_tsvector('english', "description"), 'A') ||
          setweight(to_tsvector('english', "title"), 'B') ||
          setweight(to_tsvector('english', "platform"), 'C')
      ));
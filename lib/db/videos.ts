import { sql } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const videos = table(
  "videos",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    videoUrl: t.text("video_url").notNull(),
    title: t.varchar("title", { length: 300 }),
    description: t.text("description"),
    platform: t.varchar("platform", { length: 300 }),
  },
  (table) => [
    t.index("search_videos_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.description}), 'A') ||
          setweight(to_tsvector('english', ${table.title}), 'B') ||
          setweight(to_tsvector('english', ${table.platform}), 'C') ||
      )`,
    ),
  ],
);

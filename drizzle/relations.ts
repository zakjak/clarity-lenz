import { relations } from "drizzle-orm/relations";
import { user, videos } from "./schema";

export const videosRelations = relations(videos, ({one}) => ({
	user: one(user, {
		fields: [videos.ownerId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	videos: many(videos),
}));
import { pgTable, foreignKey, text, integer, unique, boolean, timestamp, serial, uuid, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	isAdmin: boolean("is_admin").default(false),
	image: text(),
	isOwner: boolean("is_owner").default(false),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const comment = pgTable("comment", {
	id: serial().primaryKey().notNull(),
	comment: text(),
	postId: integer("post_id"),
	ownerId: text("owner_id"),
	parentId: integer("parent_id"),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [articles.id],
			name: "comment_post_id_articles_id_fk"
		}),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [user.id],
			name: "comment_owner_id_user_id_fk"
		}),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "comments_parent_id_fkey_cascade"
		}).onDelete("cascade"),
]);

export const readlist = pgTable("readlist", {
	id: serial().primaryKey().notNull(),
	ownerId: uuid("owner_id"),
	articleId: integer(),
});

export const commentVotes = pgTable("comment_votes", {
	id: serial().primaryKey().notNull(),
	commentId: integer("comment_id").notNull(),
	userId: uuid("user_id").notNull(),
	vote: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [comment.id],
			name: "comment_votes_comment_id_comment_id_fk"
		}),
	unique("comment_votes_comment_id_user_id_unique").on(table.commentId, table.userId),
]);

export const about = pgTable("about", {
	id: text().primaryKey().notNull(),
	position: text(),
	bio: text(),
	fb: text(),
	twitter: text(),
	linkedIn: text(),
	instagram: text(),
	ownerId: uuid("owner_id"),
});

export const articles = pgTable("articles", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "articles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 300 }),
	image: text().notNull(),
	imageTitle: text("image_title"),
	category: varchar({ length: 100 }),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
	isDraft: boolean("is_draft"),
	story: text().notNull(),
	tags: text().array().default([""]),
	images: text().array().default([""]),
	imagesTitle: text("images_title").array().default([""]),
	authorsId: uuid("authors_id").array().default([""]),
	views: integer().default(0),
});

export const eventsRegister = pgTable("events_register", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "events_register_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: uuid("user_id"),
	eventId: integer(),
});

export const events = pgTable("events", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "events_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 300 }).notNull(),
	description: text(),
	image: text().notNull(),
	link: text(),
	platform: text(),
	meetingId: text("meeting_id"),
	password: text(),
	eventStart: timestamp("event_start", { withTimezone: true, mode: 'string' }).notNull(),
	eventEnd: timestamp("event_end", { withTimezone: true, mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	timezone: varchar({ length: 300 }).notNull(),
});

export const videos = pgTable("videos", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "videos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	videoUrl: text("video_url").notNull(),
	title: varchar({ length: 300 }),
	description: text(),
	platform: varchar({ length: 300 }),
});

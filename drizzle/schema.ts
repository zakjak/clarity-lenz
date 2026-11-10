import { pgTable, integer, varchar, text, timestamp, boolean, uuid, unique, serial, index, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const bookingStatus = pgEnum("booking_status", ['pending', 'confirmed', 'cancelled'])


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

export const commentVotes = pgTable("comment_votes", {
	id: serial().primaryKey().notNull(),
	commentId: integer("comment_id").notNull(),
	userId: uuid("user_id").notNull(),
	vote: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("comment_votes_comment_id_user_id_unique").on(table.commentId, table.userId),
]);

export const comment = pgTable("comment", {
	id: serial().primaryKey().notNull(),
	comment: text(),
	postId: integer("post_id"),
	ownerId: text("owner_id"),
	parentId: integer("parent_id"),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const readlist = pgTable("readlist", {
	id: serial().primaryKey().notNull(),
	ownerId: uuid("owner_id"),
	articleId: integer(),
});

export const services = pgTable("services", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	ownerId: uuid("owner_id"),
	title: varchar({ length: 300 }),
	description: text(),
	price: integer(),
	duration: integer(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	expiredAt: timestamp({ mode: 'string' }),
});

export const events = pgTable("events", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "events_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 300 }).notNull(),
	timezone: varchar({ length: 300 }).notNull(),
	description: text(),
	image: text().notNull(),
	link: text(),
	platform: text(),
	meetingId: text("meeting_id"),
	password: text(),
	eventStart: timestamp("event_start", { withTimezone: true, mode: 'string' }).notNull(),
	eventEnd: timestamp("event_end", { withTimezone: true, mode: 'string' }).notNull(),
	ownerId: text("owner_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const eventsRegister = pgTable("events_register", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "events_register_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: uuid("user_id"),
	eventId: integer(),
});

export const videos = pgTable("videos", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "videos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	videoUrl: text("video_url").notNull(),
	title: varchar({ length: 300 }),
	description: text(),
	platform: varchar({ length: 300 }),
	ownerId: text("owner_id"),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
	id: text().primaryKey().notNull(),
	email: text().notNull(),
	token: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
});

export const account = pgTable("account", {
	userId: text("user_id").notNull(),
	providerId: text("provider_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	scope: text(),
	idToken: text("id_token"),
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("account_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "account_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const about = pgTable("about", {
	id: text().notNull(),
	position: text(),
	bio: text(),
	fb: text(),
	twitter: text(),
	linkedIn: text(),
	instagram: text(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "about_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verification_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const session = pgTable("session", {
	token: text().notNull(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
}, (table) => [
	index("session_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "session_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	isAdmin: boolean("is_admin").default(false),
	isOwner: boolean("is_owner").default(false),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	password: text(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

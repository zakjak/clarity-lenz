import { relations } from "drizzle-orm/relations";
import { user, account, authenticator, session, articles, comment, commentVotes } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	comments: many(comment),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const commentRelations = relations(comment, ({one, many}) => ({
	article: one(articles, {
		fields: [comment.postId],
		references: [articles.id]
	}),
	user: one(user, {
		fields: [comment.ownerId],
		references: [user.id]
	}),
	comment: one(comment, {
		fields: [comment.parentId],
		references: [comment.id],
		relationName: "comment_parentId_comment_id"
	}),
	comments: many(comment, {
		relationName: "comment_parentId_comment_id"
	}),
	commentVotes: many(commentVotes),
}));

export const articlesRelations = relations(articles, ({many}) => ({
	comments: many(comment),
}));

export const commentVotesRelations = relations(commentVotes, ({one}) => ({
	comment: one(comment, {
		fields: [commentVotes.commentId],
		references: [comment.id]
	}),
}));
import { relations } from "drizzle-orm/relations";
import { articles, comment, users, commentVotes, account, session } from "./schema";

export const commentRelations = relations(comment, ({one, many}) => ({
	article: one(articles, {
		fields: [comment.postId],
		references: [articles.id]
	}),
	user: one(users, {
		fields: [comment.ownerId],
		references: [users.id]
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

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comment),
	accounts: many(account),
	sessions: many(session),
}));

export const commentVotesRelations = relations(commentVotes, ({one}) => ({
	comment: one(comment, {
		fields: [commentVotes.commentId],
		references: [comment.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));
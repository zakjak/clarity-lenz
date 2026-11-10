import { relations } from "drizzle-orm/relations";
import { users, account, about, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(account),
	abouts: many(about),
	sessions: many(session),
}));

export const aboutRelations = relations(about, ({one}) => ({
	user: one(users, {
		fields: [about.id],
		references: [users.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));
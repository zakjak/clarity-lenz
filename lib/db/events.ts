import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const events = table("events", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar("title", { length: 300 }).notNull(),
  timezone: t.varchar("timezone", { length: 300 }).notNull(),
  description: t.text("description"),
  image: t.text("image").notNull(),
  link: t.text("link"),
  platform: t.text("platform"),
  meetingId: t.text("meeting_id"),
  password: t.text("password"),
  eventStart: t.timestamp("event_start", { withTimezone: true }).notNull(),
  eventEnd: t.timestamp("event_end", { withTimezone: true }).notNull(),
  ownerId: t.text("owner_id").references(() => users.id),
  createdAt: t
    .timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const register = table("events_register", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: t.uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  eventId: t.integer("eventId").references(() => events.id, {
    onDelete: "cascade",
  }),
});

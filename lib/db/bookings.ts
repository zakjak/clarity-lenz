import {
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./schema";

export const bookingStatus = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookings = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  owner: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 300 }),
  description: text("description"),
  price: integer("price"),
  duration: integer("duration"),
  createdAt: timestamp().defaultNow(),
  expiredAt: timestamp(),
});

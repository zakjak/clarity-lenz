import {
  PgTable,
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { users } from "./schema";

export const bookingStatus = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

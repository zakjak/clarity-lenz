import { db } from "@/lib";
import { events } from "@/lib/db/events";
import { lt } from "drizzle-orm";

export const deleteExpiredEvents = async () => {
  const now = new Date();

  await db.delete(events).where(lt(events.eventEnd, now));
};

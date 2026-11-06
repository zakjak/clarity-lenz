import { db } from "@/lib";
import { events } from "@/lib/db/events";
import { gt } from "drizzle-orm";

export const deleteExpiredEvents = async () => {
  const now = new Date();

  const cdtDateTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now);

  await db.delete(events).where(gt(events.eventEnd, cdtDateTime));
};

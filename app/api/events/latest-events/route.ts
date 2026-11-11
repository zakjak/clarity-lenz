import { db } from "@/lib";
import { events } from "@/db/events";
import { desc, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

  const latestArticles = await db
    .select({
      id: events.id,
      eventStart: events.eventStart,
      eventEnd: events.eventEnd,
      title: events.title,
      image: events.image,
      description: events.description,
      platform: events.platform,
      timezone: events.timezone,
    })
    .from(events)
    .where(gt(events.eventEnd, cdtDateTime))
    .limit(3)
    .orderBy(desc(events.createdAt));

  return NextResponse.json(latestArticles);
}

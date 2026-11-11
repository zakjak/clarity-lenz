import { db } from "@/lib";
import { events } from "@/db/events";
import { desc, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const now = new Date().toISOString();

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
    .where(gt(events.eventEnd, now))
    .limit(3)
    .orderBy(desc(events.createdAt));

  return NextResponse.json(latestArticles);
}

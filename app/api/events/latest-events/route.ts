import { db } from "@/lib";
import { events } from "@/lib/db/events";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const latestArticles = await db
    .select({
      id: events.id,
      eventStart: events.eventStart,
      eventEnd: events.eventEnd,
      title: events.title,
      image: events.image,
      description: events.description,
      platform: events.platform,
    })
    .from(events)
    .limit(3)
    .orderBy(desc(events.createdAt));

  return NextResponse.json(latestArticles);
}

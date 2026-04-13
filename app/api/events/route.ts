import { db } from "@/lib";
import { events } from "@/lib/db/events";
import { count, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;

    const calculatePageNumber = (page - 1) * 10;
    const countRows = await db.select({ count: count() }).from(events);

    const pageNumber = Math.ceil(countRows[0].count / 10);

    const response = await db
      .select({
        id: events.id,
        title: events.title,
        image: events.image,
        eventStart: events.eventStart,
        eventEnd: events.eventEnd,
      })
      .from(events)
      // .where(lt(events.eventEnd, events.eventStart))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({ response, pageNumber });
  } catch (err) {
    console.log("Error fetching articles:", err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

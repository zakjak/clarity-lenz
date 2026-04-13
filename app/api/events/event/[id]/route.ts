import { db } from "@/lib";
import { events } from "@/lib/db/events";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const eventId = Number(id);

  if (isNaN(eventId)) {
    return NextResponse.json("Invalid article ID");
  }

  try {
    const event = await db
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
      .orderBy(desc(events.createdAt))
      .where(eq(events.id, eventId));

    if (!event.length) return NextResponse.json({ error: "Event not found" });

    return NextResponse.json(event);
  } catch (err) {
    console.log("Error fetching event", err);
    return NextResponse.json({ error: "Failed fetching event" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  const numericId = Number(id);

  try {
    await db.delete(events).where(eq(events.id, numericId));

    return NextResponse.json("Successfully deleted article");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { db } from "@/lib";
import { events } from "@/db/events";
import { gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const now = new Date().toISOString();

    await db.delete(events).where(gt(events.eventEnd, now));
    return Response.json({ success: true });
  } catch (err) {
    console.error("Event cleanup failed:", err);
    return NextResponse.json(
      { error: "Failed to clean up expired events" },
      { status: 500 },
    );
  }
}

import { services } from "@/drizzle/schema";
import { db } from "@/lib";
import { gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
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

  try {
    const bookings = await db
      .select()
      .from(services)
      .where(gt(services.expiredAt, cdtDateTime));

    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json(`Server Error ${err}`, { status: 500 });
  }
}

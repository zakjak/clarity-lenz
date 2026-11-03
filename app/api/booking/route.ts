import { services } from "@/drizzle/schema";
import { db } from "@/lib";
import { gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const bookings = await db
      .select()
      .from(services)
      .where(gte(services.expiredAt, new Date().toISOString()));
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json(`Server Error ${err}`, { status: 500 });
  }
}

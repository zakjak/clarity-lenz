import { services } from "@/drizzle/schema";
import { db } from "@/lib";
import { and, eq, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const { title, description, price, expiredAt, duration, name } =
    await req.json();

  const booking = await db
    .select()
    .from(services)
    .where(
      and(
        eq(services.ownerId, id),
        lte(services.expiredAt, new Date().toISOString()),
      ),
    );

  if (booking.length > 0) {
    return NextResponse.json(false);
  }

  await db.insert(services).values({
    title: title,
    description: description,
    price: price,
    expiredAt: expiredAt,
    duration: duration,
    ownerId: id,
    name: name,
  });
  return NextResponse.json(true);
}

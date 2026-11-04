import { services } from "@/drizzle/schema";
import { db } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const { title, description, price, expiredAt, duration, name } =
    await req.json();

  try {
    const booking = await db
      .insert(services)
      .values({
        title: title,
        description: description,
        price: price,
        expiredAt: expiredAt,
        duration: duration,
        ownerId: id,
        name: name,
      })
      .returning();

    if (booking.length > 0) {
      return NextResponse.json(true);
    }
    return NextResponse.json(`Couldn't save ther evemt, please try again`);
  } catch (err) {
    return NextResponse.json(`Error occured ${err}`);
  }
}

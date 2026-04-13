import { db } from "@/lib";
import { about, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  reqest: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    const aboutUser = await db
      .select()
      .from(about)
      .where(eq(about.ownerId, id));
    return NextResponse.json({ user, aboutUser });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const {
    profileImage,
    username,
    position,
    bio,
    twitter,
    fb,
    linkedIn,
    instagram,
  } = body;

  try {
    const userData = await db.select().from(about).where(eq(about.ownerId, id));

    if (userData?.length === 0) {
      const aboutUserData = await db
        .insert(about)
        .values({
          position: position,
          bio: bio,
          fb: fb,
          twitter: twitter,
          linkedIn: linkedIn,
          instagram: instagram,
          ownerId: id,
        })
        .returning();

      return NextResponse.json(aboutUserData);
    } else {
      const aboutUserData = await db
        .update(about)
        .set({
          position: position,
          bio: bio,
          fb: fb,
          twitter: twitter,
          linkedIn: linkedIn,
          instagram: instagram,
          ownerId: id,
        })
        .where(eq(about.ownerId, id))
        .returning();

      return NextResponse.json(aboutUserData);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server Error", { status: 500 });
  }
}

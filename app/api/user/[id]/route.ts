import { db } from "@/lib";
import { about, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const aboutUser = await db
      .select()
      .from(about)
      .where(eq(about.ownerId, id));

    return NextResponse.json(aboutUser);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
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
    email,
  } = body;

  const aboutUser = {
    position,
    twitter,
    bio,
    fb,
    linkedIn,
  };

  try {
    if (profileImage) {
      const userProfile = await db
        .update(users)
        .set({ image: profileImage })
        .where(eq(users.id, id));
      return NextResponse.json(userProfile);
    }

    if (username || email) {
      const name = await db
        .update(users)
        .set({ name: username, email })
        .where(eq(users.id, id))
        .returning();
      return NextResponse.json(name);
    }

    if (aboutUser) {
      const userData = await db
        .select()
        .from(about)
        .where(eq(about.ownerId, id));

      if (userData.length === 0) {
        const aboutUserData = await db
          .insert(about)
          .values({
            position: aboutUser.position,
            bio: aboutUser.bio,
            fb: aboutUser.fb,
            twitter: aboutUser.twitter,
            linkedIn: aboutUser.linkedIn,
            ownerId: id,
          })
          .returning();

        return NextResponse.json(aboutUserData);
      } else {
        const aboutUserData = await db
          .update(about)
          .set({
            position: aboutUser.position,
            bio: aboutUser.bio,
            fb: aboutUser.fb,
            twitter: aboutUser.twitter,
            linkedIn: aboutUser.linkedIn,
            ownerId: id,
          })
          .where(eq(about.ownerId, id))
          .returning();

        return NextResponse.json(aboutUserData);
      }
    }
    return NextResponse.json("Unsucceefull");
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server Error", { status: 500 });
  }
}

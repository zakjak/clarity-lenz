import { db } from "@/lib";
import { comments } from "@/lib/db/articles";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { comment, postId, ownerId, parentId } = body;

  try {
    const response = await db
      .insert(comments)
      .values({
        comment,
        postId,
        ownerId,
        parentId,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const { comment, parentId } = body;

  try {
    const response = await db
      .update(comments)
      .set({ comment: comment })
      .where(eq(comments.id, parentId))
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Serer error", { status: 500 });
  }
}

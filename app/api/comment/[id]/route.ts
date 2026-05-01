import { db } from "@/lib";
import { comments } from "@/lib/db/articles";
import { count, eq, exists } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  const numericId = Number(id);

  try {
    const parentComment = await db
      .select({ count: count() })
      .from(comments)
      .where(eq(comments.parentId, numericId));

    const exists = (parentComment[0]?.count ?? 0) > 0;

    if (exists) {
      await db.delete(comments).where(eq(comments.parentId, numericId));
      await db.delete(comments).where(eq(comments.id, numericId));
    } else {
      await db.delete(comments).where(eq(comments.id, numericId));
    }

    return NextResponse.json("Successfully deleted comment");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Try again, Failed to delete" });
  }
}

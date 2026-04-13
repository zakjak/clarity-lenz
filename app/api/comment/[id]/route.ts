import { db } from "@/lib";
import { comments } from "@/lib/db/articles";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  const numericId = Number(id);

  try {
    await db.transaction(async (tx) => {
      await tx.delete(comments).where(eq(comments.id, numericId));
      await tx.delete(comments).where(eq(comments.parentId, numericId));
    });

    return NextResponse.json("Successfully deleted comment");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Try again, Failed to delete" });
  }
}

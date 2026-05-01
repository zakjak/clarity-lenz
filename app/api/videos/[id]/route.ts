import { db } from "@/lib";
import { videos } from "@/lib/db/videos";
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
    await db.delete(videos).where(eq(videos.id, numericId));

    return NextResponse.json("Successfully deleted article");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

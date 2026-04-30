import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  try {
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json("Successfully deleted user");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Try again, Failed to delete" });
  }
}

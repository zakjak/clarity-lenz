import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib";
import { users } from "@/db/schema";
import { readList } from "@/db/articles";
import { headers } from "next/headers";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, id));
      await tx.delete(readList).where(eq(readList.ownerId, id));
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}

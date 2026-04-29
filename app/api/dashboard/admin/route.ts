import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const res = await req.json();

  try {
    const response = await db
      .update(users)
      .set({ isAdmin: res.admin })
      .where(eq(users.id, res.userId))
      .returning({ isAdmin: users.isAdmin });

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

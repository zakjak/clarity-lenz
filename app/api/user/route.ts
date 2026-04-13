import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const usersAdmin = await db
      .select()
      .from(users)
      .where(eq(users.isAdmin, true));

    return NextResponse.json(usersAdmin);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}

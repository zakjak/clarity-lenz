import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;

  try {
    const [totalUsers, totalCoAuthors, totalAdminUsers] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.isOwner, true)),
      db.select({ count: count() }).from(users).where(eq(users.isAdmin, true)),
    ]);

    return NextResponse.json({
      totalUsers,
      totalCoAuthors,
      totalAdminUsers,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

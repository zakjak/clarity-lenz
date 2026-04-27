import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;

  try {
    const [totalUsers, totalCoAuthors, totalAdminUsers] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.isOwner, true)),
      db.select({ count: count() }).from(users).where(eq(users.isAdmin, true)),
    ]);

    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(sql`${users.name}`))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      totalUsers,
      totalCoAuthors,
      totalAdminUsers,
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

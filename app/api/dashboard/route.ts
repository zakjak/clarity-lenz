import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  console.log(page);
  try {
    const calculatePageNumber = (page - 1) * 10;

    const countRows = await db.select({ count: count() }).from(users);
    const pageNumber = Math.ceil(countRows[0].count / 1);

    const [totalUsers, totalCoAuthors, totalAdminUsers] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.isOwner, true)),
      db.select({ count: count() }).from(users).where(eq(users.isAdmin, true)),
    ]);

    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(sql`${users.name}`))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({
      totalUsers,
      totalCoAuthors,
      totalAdminUsers,
      users: allUsers,
      pageNumber,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

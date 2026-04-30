import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { count, desc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;

  try {
    const calculatePageNumber = (page - 1) * 10;

    const countRows = await db.select({ count: count() }).from(users);
    const pageNumber = Math.ceil(countRows[0].count / 1);

    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(sql`${users.name}`))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({ users: allUsers, pageNumber });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

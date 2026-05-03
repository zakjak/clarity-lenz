import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { count, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const search = String(searchParams.get("q"));
  const query = search.replaceAll("+", " ").trim();

  try {
    const page = Number(searchParams.get("page")) || 1;

    const calculatePageNumber = (page - 1) * 10;

    const countRows = await db
      .select({ count: count() })
      .from(users)
      .where(
        or(
          sql`${users.email} @@ plainto_tsquery('english', ${query})`,
          sql`${users.name} @@ plainto_tsquery('english', ${query})`,
        ),
      );

    const pageNumber = Math.ceil(countRows[0].count / 10);

    const searchUsers = await db
      .select()
      .from(users)
      .where(
        or(
          sql`${users.email} @@ plainto_tsquery('english', ${query})`,
          sql`${users.name} @@ plainto_tsquery('english', ${query})`,
        ),
      )
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({ searchUsers, pageNumber, countRows });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server failed. Try again!!!");
  }
}

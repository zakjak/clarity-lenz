import { db } from "@/lib";
import { articles } from "@/lib/db/articles";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;
    const q = String(searchParams.get("q"));
    const query = q.replaceAll("+", " ");

    const calculatePageNumber = (page - 1) * 10;

    const countRows = await db
      .select({ count: count() })
      .from(articles)
      .where(
        and(
          sql`(
        setweight(to_tsvector('english', ${articles.title}), 'A') ||
        setweight(to_tsvector('english', ${articles.story}), 'B')) ||
        setweight(to_tsvector('english', ${articles.category}), 'C')
        @@ plainto_tsquery('english', ${query}
      )`,
          eq(articles.isDraft, false),
        ),
      );
    const pageNumber = Math.ceil(countRows[0].count / 10);

    const search = await db
      .select()
      .from(articles)
      .where(
        and(
          sql`(
        setweight(to_tsvector('english', ${articles.title}), 'A') ||
        setweight(to_tsvector('english', ${articles.story}), 'B') ||
        setweight(to_tsvector('english', ${articles.category}), 'C')) 
        @@ plainto_tsquery('english', ${query}
      )`,
          eq(articles.isDraft, false),
        ),
      )
      .limit(10)
      .offset(calculatePageNumber)
      .orderBy(desc(articles.date));

    return NextResponse.json({ search, pageNumber, countRows });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server failed. Try again!!!");
  }
}

import { db } from "@/lib";
import { articles } from "@/lib/db/articles";
import { arrayContains, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;
    const calculatePageNumber = (page - 1) * 10;

    const createdArticles = await db
      .select()
      .from(articles)
      .where(arrayContains(articles?.authors, [id]))
      .orderBy(desc(articles.date))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json(createdArticles);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

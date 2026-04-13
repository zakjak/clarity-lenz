import { db } from "@/lib";
import { articles } from "@/lib/db/articles";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const latestArticles = await db
    .select({
      id: articles.id,
      image: articles.image,
      imageTitle: articles.imageTitle,
      date: articles.date,
      title: articles.title,
      category: articles.category,
    })
    .from(articles)
    .where(eq(articles.isDraft, false))
    .limit(6)
    .orderBy(desc(articles.date));

  return NextResponse.json(latestArticles);
}

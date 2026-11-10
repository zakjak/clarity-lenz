import { db } from "@/lib";
import { articles } from "@/db/articles";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const latestArticles = await db
      .select({
        id: articles.id,
        image: articles.image,
        imageTitle: articles.imageTitle,
        date: articles.date,
        title: articles.title,
        category: articles.category,
        story: articles.story,
      })
      .from(articles)
      .where(eq(articles.isDraft, false))
      .limit(6)
      .orderBy(desc(articles.date));

    return NextResponse.json(latestArticles);
  } catch (error) {
    return NextResponse.json(error);
  }
}

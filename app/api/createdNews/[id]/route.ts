import { db } from "@/lib";
import { articles } from "@/lib/db/articles";
import { videos } from "@/lib/db/videos";
import { and, arrayContains, desc, eq } from "drizzle-orm";
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
    const type = String(searchParams.get("type")) || "articles";
    const calculatePageNumber = (page - 1) * 10;

    if (type === "articles") {
      const createdArticles = await db
        .select()
        .from(articles)
        .where(
          and(
            arrayContains(articles.authors, [id]),
            eq(articles.isDraft, false),
          ),
        )
        .orderBy(desc(articles.date))
        .limit(10)
        .offset(calculatePageNumber);
      return NextResponse.json(createdArticles);
    } else {
      const createdVideos = await db
        .select()
        .from(videos)
        .where(eq(videos.ownerId, id))
        .orderBy(desc(videos.date))
        .limit(10)
        .offset(calculatePageNumber);
      return NextResponse.json(createdVideos);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

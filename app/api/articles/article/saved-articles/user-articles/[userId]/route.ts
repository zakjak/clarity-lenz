import { db } from "@/lib";
import { articles, readList } from "@/lib/db/articles";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const param = await params;
  const { userId } = param;
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;
    const calculatePageNumber = (page - 1) * 10;

    const userSavedArticles = await db
      .select()
      .from(articles)
      .innerJoin(readList, eq(readList.articleId, articles.id))
      .where(eq(readList.ownerId, userId))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json(userSavedArticles);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Error fetchong saved article" },
      { status: 404 },
    );
  }
}

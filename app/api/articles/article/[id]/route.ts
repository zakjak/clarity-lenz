import { db } from "@/lib";
import { articles, comments } from "@/lib/db/articles";
import { users } from "@/lib/db/schema";
import { and, asc, count, desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = new URL(request.url);

  const { id } = await params;

  const articleId = Number(id);

  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  if (isNaN(articleId)) {
    return NextResponse.json("Invalid article ID");
  }

  try {
    const singleArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));

    if (!singleArticle.length)
      return NextResponse.json({ error: "Article not found" });

    const authors = await db
      .select()
      .from(users)
      .where(inArray(users.id, singleArticle[0].authors as string[]));

    const articleComments = await db
      .select()
      .from(comments)
      .where(and(eq(comments.postId, articleId), isNull(comments.parentId)))
      .leftJoin(users, eq(comments.ownerId, users.id))
      .orderBy(desc(comments.date))
      .limit(limit)
      .offset(offset);

    const commentsNumber = await db
      .select({ count: count() })
      .from(comments)
      .where(and(eq(comments.postId, articleId), isNull(comments.parentId)));

    const lastComment = await db
      .select()
      .from(comments)
      .where(and(eq(comments.postId, articleId), isNull(comments.parentId)))
      .orderBy(asc(sql`${comments.id}`))
      .limit(1);

    const article = [singleArticle[0], authors];

    return NextResponse.json({
      article,
      articleComments,
      commentCount: commentsNumber[0].count,
      lastComment,
    });
  } catch (err) {
    console.log("Error fetching articles:", err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const numericId = Number(id);

  try {
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, numericId));
    return NextResponse.json({ message: "View count incremented" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  const numericId = Number(id);

  try {
    await db.delete(comments).where(eq(comments.postId, numericId));
    await db.delete(articles).where(eq(articles.id, numericId));

    return NextResponse.json("Successfully deleted article");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

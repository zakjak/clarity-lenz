import { articles } from "@/drizzle/schema";
import { db } from "@/lib";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    title,
    image,
    imageTitle,
    images,
    imagesTitle,
    story,
    authors,
    isDraft,
    category,
    tags,
  } = body;

  try {
    const response = await db
      .insert(articles)
      .values({
        title,
        image,
        imageTitle,
        category,
        story,
        tags,
        images,
        isDraft,
        authorsId: authors,
        imagesTitle,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error, try again");
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const {
    title,
    image,
    imageTitle,
    images,
    imagesTitle,
    story,
    authors,
    isDraft,
    category,
    tags,
    articleId,
  } = body;

  try {
    const response = await db
      .update(articles)
      .set({
        title,
        image,
        images,
        imagesTitle,
        imageTitle,
        story,
        authorsId: authors,
        isDraft,
        category,
        tags,
      })
      .where(eq(articles.id, articleId))
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Serer error", { status: 500 });
  }
}

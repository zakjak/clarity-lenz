import { db } from "@/lib";
import { articles } from "@/lib/db/articles";
import { and, arrayContains, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = new URL(request.url);

  const { id } = await params;

  try {
    const page = Number(searchParams.get("page")) || 1;
    const calculatePageNumber = (page - 1) * 10;

    const draft = await db
      .select()
      .from(articles)
      .where(
        and(arrayContains(articles.authors, [id]), eq(articles.isDraft, true)),
      )
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json(draft);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

import { db } from "@/lib";
import { readList } from "@/lib/db/articles";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const param = await params;
  const { id } = param;

  try {
    const savedArticle = await db
      .select()
      .from(readList)
      .where(eq(readList.ownerId, id));

    return NextResponse.json(savedArticle);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await req.json();

  const numericId = Number(id);

  const result = await db
    .select({ count: readList.id })
    .from(readList)
    .where(eq(readList.articleId, numericId));

  const exists = (result[0]?.count ?? 0) > 0;

  if (!exists) {
    const response = await db
      .insert(readList)
      .values({ ownerId: res.ownerId, articleId: numericId })
      .returning({ ownerId: readList.ownerId });

    return NextResponse.json(response);
  } else {
    const response = await db
      .delete(readList)
      .where(eq(readList.ownerId, res.ownerId));
    console.log(response);
    return NextResponse.json(response);
  }
}

import { articles } from "@/drizzle/schema";
import { db } from "@/lib";
import { and, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; category: string }> },
) {
  const { category, id } = await params;

  const numericId = Number(id);

  try {
    const response = await db
      .select()
      .from(articles)
      .where(and(eq(articles.category, category), ne(articles.id, numericId)))
      .limit(3);
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

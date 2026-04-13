import { db } from "@/lib";
import { commentVotes } from "@/lib/db/articles";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const commentId = Number(id);

  try {
    const res = await db
      .select()
      .from(commentVotes)
      .where(eq(commentVotes.commentId, commentId));

    const [counts] = await db
      .select({
        likes: sql<number>`SUM(CASE WHEN ${commentVotes.vote} = 1 THEN 1 ELSE 0 END)`,
        dislikes: sql<number>`SUM(CASE WHEN ${commentVotes.vote} = -1 THEN 1 ELSE 0 END)`,
      })
      .from(commentVotes)
      .where(eq(commentVotes.commentId, commentId));

    return NextResponse.json({
      voteComment: res[0],
      likes: counts.likes ?? 0,
      dislikes: counts.dislikes ?? 0,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId, type } = await req.json();

  const { id } = await params;

  const commentId = Number(id);

  const existingVote = await db
    .select()
    .from(commentVotes)
    .where(
      and(
        eq(commentVotes.commentId, commentId),
        eq(commentVotes.userId, userId),
      ),
    );

  if (existingVote.length > 0) {
    const vote = existingVote[0];
    if (vote.vote === type) {
      await db
        .delete(commentVotes)
        .where(eq(commentVotes.id, existingVote[0].id));
      return NextResponse.json("removed", { status: 200 });
    }

    await db
      .update(commentVotes)
      .set({ vote: type })
      .where(eq(commentVotes.userId, userId));
    return NextResponse.json("updated", { status: 200 });
  }

  await db.insert(commentVotes).values({
    commentId,
    userId,
    vote: type,
  });

  return NextResponse.json("inserted", { status: 200 });
}

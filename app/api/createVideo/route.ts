import { db } from "@/lib";
import { videos } from "@/lib/db/videos";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, videoUrl, description, platform } = body;

  try {
    const response = await db
      .insert(videos)
      .values({
        title,
        videoUrl,
        description,
        platform,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error, try again");
  }
}

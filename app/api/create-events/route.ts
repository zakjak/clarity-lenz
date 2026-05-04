import { db } from "@/lib";
import { NextResponse } from "next/server";
import { combineDateAndTime, uploadToCloudflare } from "../utils/helpers";
import { events } from "@/lib/db/events";

export async function POST(req: Request) {
  const formData = await req.formData();

  const image = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const platform = formData.get("platform") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const password = formData.get("password") as string;
  const meetingId = formData.get("meetingId") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const eventDate = formData.get("eventDate") as string;
  const timezone = formData.get("timezone") as string;
  const ownerId = formData.get("ownerId") as string;

  try {
    if (image && image instanceof File) {
      const profileImage = await uploadToCloudflare(image);

      const eventStart = combineDateAndTime(new Date(eventDate), startTime);

      const eventEnd = combineDateAndTime(new Date(eventDate), endTime);

      if (profileImage) {
        const response = await db
          .insert(events)
          .values({
            title,
            image: profileImage?.result?.variants[0],
            description,
            link,
            password,
            meetingId,
            eventStart,
            eventEnd,
            platform,
            timezone,
            ownerId,
          })
          .returning();
        return NextResponse.json(response);
      } else {
        return NextResponse.json("System Error, Try uploading a file again");
      }
    } else {
      return NextResponse.json("This is not a file");
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json("Serer error", { status: 500 });
  }
}

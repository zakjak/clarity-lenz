import { db } from "@/lib";
import { events, register } from "@/lib/db/events";
import { htmlEmail } from "@/lib/utils/send-event";
import { sendMail } from "@/lib/utils/send-mail";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "User is required" }, { status: 400 });
  }

  try {
    const savedEvent = await db
      .select()
      .from(register)
      .where(eq(register.userId, id));

    return NextResponse.json(savedEvent);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching events" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await req.json();

  const numericId = Number(id);

  try {
    const response = await db
      .insert(register)
      .values({ userId: res.userId, eventId: numericId })
      .returning({ userId: register.userId });

    const savedEvent = await db
      .select()
      .from(events)
      .where(eq(events.id, numericId));

    // const sentUser = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.id, res.userId));

    // const sendEmail = EventEmail({
    //   title: savedEvent[0].title,
    //   description: savedEvent[0].description as string,
    //   formattedStart: savedEvent[0].eventStart,
    //   formattedEnd: savedEvent[0]?.eventEnd,
    //   zoom_link: savedEvent[0]?.link as string,
    //   image_url: savedEvent[0]?.image as string,
    //   meeting_id: savedEvent[0]?.meetingId as string,
    //   password: savedEvent[0]?.password as string,
    // });

    const sendEmailTo = await htmlEmail({
      title: savedEvent[0].title,
      description: savedEvent[0].description as string,
      formattedStart: savedEvent[0].eventStart,
      formattedEnd: savedEvent[0]?.eventEnd,
      zoom_link: savedEvent[0]?.link as string,
      image_url: savedEvent[0]?.image as string,
      meeting_id: savedEvent[0]?.meetingId as string,
      password: savedEvent[0]?.password as string,
      platform: savedEvent[0]?.platform as string,
    });

    console.log();

    await sendMail({
      email: "Clarity Lenz <<sponsor@thevybenews.com>",
      subject: `Registeration for ${savedEvent[0].title}`,
      //   text: sendText,
      html: sendEmailTo,
      sendTo: res.email,
    });

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error, try again");
  }
}

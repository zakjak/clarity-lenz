import EmailTemplate from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createElement } from "react";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(req: Request): Promise<NextResponse> {
  const { time, title, description, duration, email, date, price } =
    await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Clarity Lenz <info@claritylenz.com>",
      to: [`${email}`],
      subject: `Scheduled meeting ${title}`,
      react: createElement(EmailTemplate, {
        title,
        description,
        time,
        duration,
        zoom_link: process.env.ZOOM_LINK!,
        date,
        password: process.env.PASSWORD!,
        price,
      }),
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

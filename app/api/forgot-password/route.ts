import { db } from "@/lib";
import { generateResetToken } from "@/lib/auth/reset-token";
import { passwordResetTokens, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const email = body.email?.toLowerCase();

  if (!email) {
    return NextResponse.json({ message: "Email required", status: 400 });
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!existingUser) {
      return NextResponse.json({
        message: "If an account exists, a reset link was sent.",
      });
    }

    const { rawToken, hashedToken } = await generateResetToken();

    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

    await db.insert(passwordResetTokens).values({
      email,
      token: hashedToken,
      expiresAt,
    });

    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${rawToken}&email=${email}`;

    console.log(email);

    const { data, error } = await resend.emails.send({
      from: "ClarityLenz <info@claritylenz.com>",
      to: [email],
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>

        <p>Click below to reset your password:</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>Expires in 15 minutes.</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log(data);

    return NextResponse.json({
      message: "If an account exists, a reset link was sent.",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

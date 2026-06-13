import bcrypt from "bcryptjs";
import { db } from "@/lib";
import { NextResponse } from "next/server";
import { passwordResetTokens, users } from "@/lib/db/schema";
import { and, eq, gt } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { token, email, password } = body;

    if (!token || !email || !password) {
      return NextResponse.json(
        {
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const resetEntries = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.email, email),
          gt(passwordResetTokens.expiresAt, new Date()),
        ),
      );

    let validEntry = null;

    for (const entry of resetEntries) {
      const isMatch = await bcrypt.compare(token, entry.token);

      if (isMatch) {
        validEntry = entry;
        break;
      }
    }

    if (!validEntry) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));

    return NextResponse.json({
      message: "Password reset successful!!! You can now Sign in",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { db } from "@/lib";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const isExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (isExists.length) {
      return NextResponse.json("User already exists, please sign in.");
    }

    const user = await db
      .insert(users)
      .values({ name, email, password: hashPassword })
      .returning();

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server Error", { status: 500 });
  }
}

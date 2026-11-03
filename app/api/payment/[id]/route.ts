import { db } from "@/lib";
import { bookings } from "@/lib/db/bookings";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// https://api.stripe.com

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const body = await req.json();

  const { amount } = body;

  try {
    // const [existingBooking] = await db
    //   .select()
    //   .from(bookings)
    //   .where(eq(bookings.owner, id));

    // if (!existingBooking) {
    //   return NextResponse.json(
    //     { error: "You already have an active booking." },
    //     { status: 409 },
    //   );
    // }

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}

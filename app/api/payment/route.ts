import { NextResponse } from "next/server";
import Stripe from "stripe";

// https://api.stripe.com

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const body = await req.json();

  const { amount } = body;

  console.log();

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}

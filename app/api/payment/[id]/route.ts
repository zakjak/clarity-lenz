import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();

  const { amount } = body;

  try {
    // const session = await stripeClient.checkout.sessions.create({
    //   ui_mode: "embedded_page",
    //   line_items: [
    //     {
    //       price: "{{PRICE_ID}}",
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   return_url: `${process.env.API_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    // });
    // return NextResponse.json({ clientSecret: session.client_secret });
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

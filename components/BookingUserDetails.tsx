"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useBookingStore } from "@/hooks/useBooking";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

console.log(process.env.STRIPE_PUBLISHABLE_KEY!);

const BookingUserDetails = () => {
  const amount = useBookingStore((state) => state.price);

  return (
    <div className="mt-6">
      <h1 className="text-sm text-cyan-950 font-semibold my-3">3. Payment</h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount as number),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount as number} />
      </Elements>
    </div>
  );
};

export default BookingUserDetails;

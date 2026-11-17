"use client";

import { Elements, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useBookingStore } from "@/hooks/useBooking";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./CheckoutPage";
import { useCallback } from "react";
import { authClient } from "@/lib/auth-client";

const BookingUserDetails = () => {
  const { data: session } = authClient.useSession();
  const amount = useBookingStore((state) => state.price);

  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

  const fetchClientSecret = useCallback(() => {
    return fetch(`/api/payment/${session?.user?.id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div className="mt-6">
      <h1 className="text-sm text-cyan-950 dark:text-zinc-100 font-semibold my-3">
        3. Payment
      </h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options} />
      {/* <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount as number),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount as number} />
      </Elements> */}
    </div>
  );
};

export default BookingUserDetails;

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useBookingStore } from "@/hooks/useBooking";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./CheckoutPage";

const formSchema = z.object({
  name: z.string().min(1, "Username can't be empty"),
  cardNumber: z.string(),
  expiry: z.string(),
  cvc: z.string(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const BookingUserDetails = () => {
  const amount = useBookingStore((state) => state.price);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
    <div className="mt-6">
      <h1 className="text-sm text-cyan-950 font-semibold my-3">3. Payment</h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
};

export default BookingUserDetails;

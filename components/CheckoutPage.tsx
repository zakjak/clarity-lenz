"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import {
  useBookingStore,
  useDateStore,
  useSelectTimeStore,
  useTimezoneStore,
} from "@/hooks/useBooking";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const { data: session } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSelectedTime, setIsSelectedTime] = useState(false);
  const booking = useBookingStore();
  const timezoneChange = useTimezoneStore((state) => state.addAll);
  const timezone = useTimezoneStore((state) => state.timezone);
  const selectedDay = useDateStore((state) => state.expiredAt);
  const time = useSelectTimeStore((state) => state.time);
  const expiredAt = useDateStore((state) => state.expiredAt);

  useEffect(() => {
    fetch(`/api/payment/${session?.user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      });
    timezoneChange(time, expiredAt as string);
  }, [amount, session?.user?.id, expiredAt, timezone, time, timezoneChange]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe && !elements && !selectedDay) {
      return;
    }

    const bookedSession = await fetch(`/api/booking/${session?.user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: booking.title,
        description: booking.description,
        price: booking.price,
        expiredAt: timezone,
        duration: booking.duration,
        name: session?.user?.name,
      }),
    }).then((data) => data.json());

    const sentMail = await fetch(`/api/booking/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: booking.title,
        description: booking.description,
        price: booking.price,
        date: timezone.split(" ")[0],
        duration: booking.duration,
        email: session?.user?.email,
        time: timezone.split(" ")[1],
      }),
    }).then((data) => data.json());

    setIsSelectedTime(false);

    if (sentMail && bookedSession && session?.user) {
      if (!elements || !stripe) {
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message!);
        setLoading(false);
        return;
      }
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${process.env.API_URL}/payment-success?amount=${amount}`,
        },
      });
      if (error) {
        setErrorMessage(error.message!);
        setLoading(false);
        return;
      }

      setLoading(false);
    } else if (session?.user) {
      setLoading(false);
      setErrorMessage("User must be logged in");
    } else {
      setLoading(false);
      setErrorMessage("Your previous booking has not elapsed.");
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center mt-4">
        <p className="font-black text-lg">
          Please Select Consultation method to see Payment options
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <Button
        disabled={!stripe || loading || isSelectedTime}
        className="w-full mt-4 bg-blue-800 text-md py-6 disabled:opacity-50 disabled:animate-pulse cursor-pointer"
      >
        {!loading ? `Pay $${amount}` : "Processing"}
      </Button>
    </form>
  );
};

export default CheckoutPage;

import EventComponent from "@/components/EventComponent";
import { notFound } from "next/navigation";
import React from "react";

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: number }>;
}) => {
  const eventId = (await params)?.eventId;

  if (!eventId) {
    return notFound();
  }

  return (
    <div>
      <EventComponent id={eventId} />
    </div>
  );
};

export default EventPage;

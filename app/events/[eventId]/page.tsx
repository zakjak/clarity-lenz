import EventComponent from "@/components/EventComponent";
import React from "react";

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: number }>;
}) => {
  const { eventId } = await params;

  return (
    <div>
      <EventComponent id={eventId} />
    </div>
  );
};

export default EventPage;

"use client";
import { EventProp } from "@/lib/types/users";
import LatestEventComponent from "./LatestEventComponent";

const LatestEvents = ({ events }: { events: EventProp[] }) => {
  return (
    <div className="flex-col gap-4 grid md:grid-cols-2 lg:grid-cols-3">
      {events?.map((event: EventProp) => (
        <LatestEventComponent key={event?.id} event={event} />
      ))}
    </div>
  );
};

export default LatestEvents;

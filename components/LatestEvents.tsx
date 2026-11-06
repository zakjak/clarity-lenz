"use client";
import { EventProp } from "@/lib/types/users";
import LatestEventComponent from "./LatestEventComponent";

const LatestEvents = ({ events }: { events: EventProp[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {events?.map((event: EventProp) => (
        <LatestEventComponent key={event?.id} event={event} />
      ))}
    </div>
  );
};

export default LatestEvents;

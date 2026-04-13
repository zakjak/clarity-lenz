"use client";
import { EventProp } from "@/lib/types/users";
import TopCategoryEvent from "./TopCategoryEvent";

const LatestEvents = ({ events }: { events: EventProp[] }) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
      {events?.map((event: EventProp) => (
        <TopCategoryEvent key={event?.id} event={event} />
      ))}
    </div>
  );
};

export default LatestEvents;

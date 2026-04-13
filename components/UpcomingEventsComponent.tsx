"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import LatestEvents from "./LatestEvents";
import { useLatestEvents } from "@/hooks/useLastestEvents";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";

const UpcomingEventsComponent = () => {
  const { data: events, isLoading } = useLatestEvents();

  if (isLoading) return <LatestArticlesSkeleton />;

  return (
    <div className="mt-10">
      {events?.length >= 1 && (
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-semibold">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="link" className="cursor-pointer">
              View All
            </Button>
          </Link>
        </div>
      )}

      <LatestEvents events={events} />
    </div>
  );
};

export default UpcomingEventsComponent;

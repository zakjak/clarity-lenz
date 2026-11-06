"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import LatestEvents from "./LatestEvents";
import { useLatestEvents } from "@/hooks/useLastestEvents";
import { FaArrowRight } from "react-icons/fa6";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";

const UpcomingEventsComponent = () => {
  const { data: events, isLoading } = useLatestEvents();

  if (isLoading) return <LatestArticlesSkeleton />;

  return (
    <div className="">
      {events && events?.length >= 1 && (
        <div className="flex items-center justify-between">
          <h2 className="font-semibold my-6 md:my-0">Upcoming Events</h2>
          <Link href="/events">
            <Button
              variant="link"
              className="cursor-pointer text-[#632CE5] dark:text-white text-xs"
            >
              View All <FaArrowRight />
            </Button>
          </Link>
        </div>
      )}

      <LatestEvents events={events} />
    </div>
  );
};

export default UpcomingEventsComponent;

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
        <div className="flex items-center justify-between mt-8 mb-4">
          <div className="flex items-center relative">
            <h2 className="font-semibold text-2xl pl-4">Upcoming Events</h2>
            <div className="w-1 h-full bg-[#5a20e0] absolute left-0 top-0" />
          </div>

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

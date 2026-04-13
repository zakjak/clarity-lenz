"use client";
import { useEvents } from "@/hooks/useEvents";
import { EventProp } from "@/lib/types/users";
import React, { useState } from "react";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";
import TopCategoryEvent from "./TopCategoryEvent";

const AllEvents = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;
  const [open, setOpen] = useState(false);

  const { data: allEvents, isLoading } = useEvents(pageNumber);

  const events: EventProp[] = allEvents?.response;

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-240 md:w-160 w-[70%] mx-auto">
        {events?.map((event) => (
          <TopCategoryEvent key={event.id} event={event} setOpen={setOpen} />
        ))}
      </div>
      <div className="mt-8">
        {allEvents?.pageNumber > 1 && (
          <PaginationComponent pageNumber={allEvents?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllEvents;
